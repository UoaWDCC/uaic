#!/usr/bin/env node
// Copies collections from one database on the Atlas cluster to another, keeping
// document ids so relationships between documents survive. Used to split the
// old shared `test` database into uaic-prod / uaic-qa / uaic-dev (#492), and
// later to refresh QA's content from prod.
//
//   pnpm copy-database -- --from test --to uaic-dev --all
//   pnpm copy-database -- --from test --to uaic-prod --content
//   add --dry-run to see what would be copied without writing anything
//
// The connection string needs read access to --from and write access to --to,
// so set COPY_DATABASE_URI to a user that can reach both (the app's scoped
// users can't). It only needs the cluster part - the database names come from
// the flags. Falls back to DATABASE_URI.
//
// Refuses to write into a collection that already has documents, so it can't
// overwrite live data. Drop the target collection first if you really mean it.

import "dotenv/config";
import { MongoClient } from "mongodb";
import { parseArgs } from "node:util";

// CMS content: what an editor manages in the admin panel. Everything else -
// members and their logins, event signups, admin users and Payload's own
// bookkeeping (preferences, locks, jobs, migrations) - stays behind, so a fresh
// prod/QA starts with no personal data.
const CONTENT_COLLECTIONS = [
  "bulletin-committees",
  "bulletins",
  "events",
  "executive-committees",
  "executive-subteams",
  "executives",
  "faqs",
  "globals",
  "hero-section-carousels",
  "investment-committee-images",
  "landing-page-images",
  "media",
  "portfolios",
  "profile-card-images",
  "profilecardimages",
  "sponsors",
];

const { values } = parseArgs({
  // `pnpm copy-database -- --from ...` passes the `--` through; drop it so the
  // flags after it aren't treated as positional arguments.
  args: process.argv.slice(2).filter((arg) => arg !== "--"),
  options: {
    from: { type: "string" },
    to: { type: "string" },
    all: { type: "boolean", default: false },
    content: { type: "boolean", default: false },
    "dry-run": { type: "boolean", default: false },
  },
});

const { from, to, all, content } = values;
const dryRun = values["dry-run"];

if (!from || !to || all === content) {
  console.error(
    "Usage: node scripts/copy-database.mjs --from <db> --to <db> (--all | --content) [--dry-run]",
  );
  process.exit(1);
}

if (from === to) {
  console.error("--from and --to must be different databases.");
  process.exit(1);
}

const uri = process.env.COPY_DATABASE_URI || process.env.DATABASE_URI;

if (!uri) {
  console.error("COPY_DATABASE_URI (or DATABASE_URI) is not set (check your .env file).");
  process.exit(1);
}

const client = new MongoClient(uri);

try {
  await client.connect();
  const source = client.db(from);
  const target = client.db(to);

  const existing = (await source.listCollections({}, { nameOnly: true }).toArray()).map(
    (c) => c.name,
  );
  const names = all ? existing.filter((n) => !n.startsWith("system.")) : CONTENT_COLLECTIONS;

  const missing = names.filter((n) => !existing.includes(n));
  if (missing.length > 0) {
    console.log(`Not in ${from}, skipping: ${missing.join(", ")}`);
  }

  const toCopy = names.filter((n) => existing.includes(n));

  // Check every target first, so a half-finished copy never happens because of
  // a collection that turned out to be non-empty partway through.
  const occupied = [];
  for (const name of toCopy) {
    if ((await target.collection(name).estimatedDocumentCount()) > 0) {
      occupied.push(name);
    }
  }

  if (occupied.length > 0) {
    console.error(`${to} already has documents in: ${occupied.join(", ")}. Nothing was copied.`);
    process.exit(1);
  }

  console.log(
    `${dryRun ? "Would copy" : "Copying"} ${toCopy.length} collection(s) from ${from} to ${to}:`,
  );

  let failed = false;

  for (const name of toCopy) {
    const docs = await source.collection(name).find().toArray();

    if (!dryRun) {
      if (docs.length > 0) {
        await target.collection(name).insertMany(docs, { ordered: true });
      }

      // Copy indexes too, so unique constraints (e.g. one signup per member
      // per event) exist before the app first connects.
      const indexes = (await source.collection(name).indexes()).filter((i) => i.name !== "_id_");
      if (indexes.length > 0) {
        // `v` (index version) and `ns` (namespace) describe the source index and
        // aren't valid options when creating one.
        const specs = indexes.map((index) =>
          Object.fromEntries(
            Object.entries(index).filter(([field]) => field !== "v" && field !== "ns"),
          ),
        );
        await target.collection(name).createIndexes(specs);
      }
    }

    const copied = dryRun ? docs.length : await target.collection(name).countDocuments();
    const ok = copied === docs.length;
    failed ||= !ok;
    console.log(`  ${ok ? "ok  " : "FAIL"} ${name}: ${docs.length} -> ${copied}`);
  }

  if (failed) {
    console.error("Some counts don't match - check the collections marked FAIL.");
    process.exit(1);
  }
} finally {
  await client.close();
}
