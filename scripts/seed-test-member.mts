// Creates (or reuses) a paid test member in the shared dev database, so the member
// dashboard can be tested without a real Google account or a Stripe payment.
// Does what a real sign-up + payment would:
//   - creates a Better Auth email/password login via auth.api.signUpEmail
//   - fills in that same doc's Payload `member` fields as a paid member (dummy details)
// Credentials are saved to .env as TEST_MEMBER_EMAIL / TEST_MEMBER_PASSWORD.
//
// pnpm seed-test-member                      (defaults to uaic-test@aucklanduni.ac.nz)
// pnpm seed-test-member someone@aucklanduni.ac.nz
//
// Remove it again with: pnpm delete-test-account <email>
//
// TypeScript ESM (.mts, run through tsx) because it imports the real auth instance and
// payload.config.ts - see generate-payload-types.mjs for why plain node can't load those.
import "dotenv/config";
import { randomBytes } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const DEFAULT_EMAIL = "uaic-test@aucklanduni.ac.nz";
const ENV_PATH = ".env";

// pnpm forwards a literal "--" if one is passed, so skip it
const emailArg = process.argv.slice(2).find((arg) => arg !== "--");
const email = (emailArg ?? process.env.TEST_MEMBER_EMAIL ?? DEFAULT_EMAIL).toLowerCase();

if (!process.env.DATABASE_URI) {
  console.error("DATABASE_URI is not set (check your .env file).");
  process.exit(1);
}

/* Adds or replaces KEY=value lines in .env without touching anything else */
function saveToEnv(values: Record<string, string>) {
  let contents = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, "utf8") : "";
  for (const [key, value] of Object.entries(values)) {
    const line = `${key}=${value}`;
    const pattern = new RegExp(`^${key}=.*$`, "m");
    contents = pattern.test(contents)
      ? contents.replace(pattern, line)
      : `${contents.replace(/\n?$/, "\n")}${line}\n`;
  }
  writeFileSync(ENV_PATH, contents);
}

// Imported after dotenv so both modules see the env vars at load time
const { auth, client } = await import("../src/lib/auth");
const { getPayload } = await import("payload");
const { default: config } = await import("../src/payload.config");

let exitCode = 0;
try {
  const db = client.db();
  const existingLogin = await db.collection("members").findOne({ email });
  let password = process.env.TEST_MEMBER_PASSWORD;

  if (existingLogin) {
    console.log(`Login already exists for ${email} - reusing it.`);
    if (!password || process.env.TEST_MEMBER_EMAIL?.toLowerCase() !== email) {
      console.warn(
        "  Its password isn't in .env. Run `pnpm delete-test-account " +
          email +
          "` and re-run this script to reset it.",
      );
    }
  } else {
    password = randomBytes(12).toString("base64url");
    await auth.api.signUpEmail({ body: { email, password, name: "UAIC Test" } });
    saveToEnv({ TEST_MEMBER_EMAIL: email, TEST_MEMBER_PASSWORD: password });
    console.log(`Created login for ${email} (credentials saved to .env).`);
  }

  // Better Auth (modelName "members") and the Payload `member` collection share the same
  // Mongo collection, so the login created above *is* the member doc - fill in its member
  // fields rather than creating a second doc for the same email.
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "member",
    where: { email: { equals: email } },
    limit: 1,
  });

  if (docs[0]?.hasPaid) {
    console.log("Paid member record already exists - leaving it as is.");
  } else if (!docs[0]) {
    throw new Error(`No doc found for ${email} after sign-up`);
  } else {
    await payload.update({
      collection: "member",
      id: docs[0].id,
      overrideAccess: true,
      draft: false,
      data: {
        email,
        firstName: "UAIC",
        lastName: "Test",
        phoneNumber: "0210000000",
        upi: "utst000",
        studentId: "000000000",
        gender: "preferNotToSay",
        universityYear: "year2",
        memberType: "newMember",
        degrees: "Bachelor of Commerce",
        majors: "Finance",
        ethnicity: "preferNotToSay",
        hasPaid: true,
        paymentDate: new Date().toISOString(),
      },
    });
    console.log("Filled in paid member details.");
  }

  console.log(`\nLog in at /login with ${email} (password: TEST_MEMBER_PASSWORD in .env).`);
} catch (err) {
  console.error("Failed to seed test member:", err);
  exitCode = 1;
} finally {
  await client.close();
  // Payload keeps its own DB connection open, so exit explicitly
  process.exit(exitCode);
}
