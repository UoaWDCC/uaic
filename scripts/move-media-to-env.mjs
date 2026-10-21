#!/usr/bin/env node
// Moves a database's uploads into its own environment's folder of the shared
// S3 bucket (#493), e.g. media/poster.png -> prod/media/poster.png for
// uaic-prod. Needed for records uploaded before the per-environment folders,
// and for QA after copying content from prod - otherwise those records still
// point at another environment's files, and deleting one in the admin panel
// deletes that environment's file too.
//
//   pnpm move-media-to-env -- --dry-run
//   pnpm move-media-to-env
//
// The environment comes from the database name in DATABASE_URI (uaic-prod ->
// prod, uaic-qa -> qa, uaic-dev -> dev), so it can't move one database's
// records into another environment's folder. Uses the S3_* variables from .env.
//
// Copies each object (never moves or deletes), then points the record at the
// copy. The old object stays where it is, since another database's records may
// still use it. Safe to re-run: records already in the right folder are skipped.

import "dotenv/config";
import { CopyObjectCommand, HeadObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { MongoClient } from "mongodb";

// Upload collections served from S3 - keep in sync with s3Storage in
// src/payload.config.ts. Each one's folder is named after the collection.
const UPLOAD_COLLECTIONS = ["media", "investment-committee-images"];

// `pnpm move-media-to-env -- --dry-run` passes the `--` through.
const args = process.argv.slice(2).filter((arg) => arg !== "--");
const dryRun = args.includes("--dry-run");

const { DATABASE_URI, S3_BUCKET, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY } = process.env;

if (!DATABASE_URI || !S3_BUCKET) {
  console.error("DATABASE_URI and S3_BUCKET must be set (check your .env file).");
  process.exit(1);
}

const s3 = new S3Client({
  region: S3_REGION,
  credentials: { accessKeyId: S3_ACCESS_KEY_ID ?? "", secretAccessKey: S3_SECRET_ACCESS_KEY ?? "" },
});

const objectKey = (...parts) =>
  parts
    .flatMap((part) => (part ?? "").split("/"))
    .filter(Boolean)
    .join("/");

const exists = (Key) =>
  s3.send(new HeadObjectCommand({ Bucket: S3_BUCKET, Key })).then(
    () => true,
    (err) => {
      if (err?.$metadata?.httpStatusCode === 404) return false;
      throw err;
    },
  );

const client = new MongoClient(DATABASE_URI);

try {
  await client.connect();
  const db = client.db();
  const env = /^uaic-(prod|qa|dev)$/.exec(db.databaseName)?.[1];

  if (!env) {
    console.error(`${db.databaseName} isn't uaic-prod, uaic-qa or uaic-dev - nothing was changed.`);
    process.exit(1);
  }

  console.log(
    `${dryRun ? "Dry run: would move" : "Moving"} uploads in ${db.databaseName} into ${env}/:`,
  );
  let failed = false;

  for (const collection of UPLOAD_COLLECTIONS) {
    const newPrefix = `${env}/${collection}`;
    const docs = await db.collection(collection).find().toArray();
    const toMove = docs.filter((doc) => doc.filename && doc.prefix !== newPrefix);
    let moved = 0;

    for (const doc of toMove) {
      const filenames = [
        doc.filename,
        ...Object.values(doc.sizes ?? {}).map((size) => size?.filename),
      ].filter(Boolean);
      const pairs = filenames.map((filename) => ({
        from: objectKey(doc.prefix, doc._objectKey, filename),
        to: objectKey(newPrefix, doc._objectKey, filename),
      }));

      // Check every file first, so a record is never pointed at a copy that's missing.
      const missing = [];
      for (const { from } of pairs) {
        if (!(await exists(from))) missing.push(from);
      }
      if (missing.length > 0) {
        failed = true;
        console.log(`  FAIL ${collection} ${doc._id}: missing in S3: ${missing.join(", ")}`);
        continue;
      }

      if (!dryRun) {
        for (const { from, to } of pairs) {
          await s3.send(
            new CopyObjectCommand({
              Bucket: S3_BUCKET,
              CopySource: `${S3_BUCKET}/${from.split("/").map(encodeURIComponent).join("/")}`,
              Key: to,
            }),
          );
        }
        await db
          .collection(collection)
          .updateOne({ _id: doc._id }, { $set: { prefix: newPrefix } });
      }
      moved++;
    }

    console.log(
      `  ${collection}: ${moved} of ${toMove.length} ${dryRun ? "would move" : "moved"}, ${docs.length - toMove.length} already in ${newPrefix}`,
    );
  }

  if (failed) {
    console.error("Some records were skipped - check the lines marked FAIL.");
    process.exit(1);
  }
} finally {
  await client.close();
}
