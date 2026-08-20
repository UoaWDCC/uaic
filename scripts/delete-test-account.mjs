#!/usr/bin/env node
// Deletes a single account (and everything linked to it) from the shared
// dev database. For removing test accounts created while testing signup/login
// locally — this hits the same Atlas cluster everyone's local dev points at,
// not a per-developer database, so double check the email before confirming.

// npm run delete-test-account -- your-email@aucklanduni.ac.nz

import "dotenv/config";
import { MongoClient } from "mongodb";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const email = process.argv[2];

if (!email) {
  console.error("Usage: node scripts/delete-test-account.mjs <email>");
  process.exit(1);
}

if (!process.env.DATABASE_URI) {
  console.error("DATABASE_URI is not set (check your .env file).");
  process.exit(1);
}

const client = new MongoClient(process.env.DATABASE_URI);

try {
  await client.connect();
  const db = client.db();

  const user = await db.collection("members").findOne({ email });
  if (!user) {
    console.log(`No account found for ${email}`);
    process.exit(0);
  }

  const ids = [user._id, user._id.toString()];
  const [accounts, sessions, verifications, member] = await Promise.all([
    db.collection("account").countDocuments({ userId: { $in: ids } }),
    db.collection("session").countDocuments({ userId: { $in: ids } }),
    db.collection("verification").countDocuments({ identifier: email }),
    db.collection("member").countDocuments({ email }),
  ]);

  console.log(`Found account for ${email}:`);
  console.log(`  user id:                  ${user._id}`);
  console.log(`  name:                     ${user.name || "(none)"}`);
  console.log(`  linked login(s):          ${accounts}`);
  console.log(`  active session(s):        ${sessions}`);
  console.log(`  pending verification(s):  ${verifications}`);
  console.log(`  membership application:   ${member ? "yes" : "no"}`);
  console.log("");
  console.log(
    "This permanently deletes all of the above from the shared uaic-wdcc database. This cannot be undone.",
  );

  const rl = readline.createInterface({ input: stdin, output: stdout });
  const answer = await rl.question('Type "yes" to confirm deletion: ');
  rl.close();

  if (answer.trim().toLowerCase() !== "yes") {
    console.log("Aborted. Nothing was deleted.");
    process.exit(0);
  }

  const [accResult, sessResult, verResult, memberResult, userResult] = await Promise.all([
    db.collection("account").deleteMany({ userId: { $in: ids } }),
    db.collection("session").deleteMany({ userId: { $in: ids } }),
    db.collection("verification").deleteMany({ identifier: email }),
    db.collection("member").deleteMany({ email }),
    db.collection("members").deleteOne({ _id: user._id }),
  ]);

  console.log("Deleted:");
  console.log(`  account:      ${accResult.deletedCount}`);
  console.log(`  session:      ${sessResult.deletedCount}`);
  console.log(`  verification: ${verResult.deletedCount}`);
  console.log(`  member:       ${memberResult.deletedCount}`);
  console.log(`  members:      ${userResult.deletedCount}`);
} finally {
  await client.close();
}
