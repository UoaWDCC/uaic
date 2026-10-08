import { APIError, betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import {
  EMAIL_DOMAIN_NOT_ALLOWED,
  EMAIL_DOMAIN_NOT_ALLOWED_MESSAGE,
  isAllowedEmail,
} from "./emailDomain";

const uri = process.env.DATABASE_URI as string;
export const client = new MongoClient(uri);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  advanced: {
    database: {
      generateId: false,
    },
  },
  user: {
    modelName: "members",
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      disableImplicitSignUp: true,
    },
  },
  databaseHooks: {
    user: {
      create: {
        // Runs before the member is written, so non-uni accounts are never persisted.
        before: async (user) => {
          if (!isAllowedEmail(user.email)) {
            // The code is required: without it better-auth's OAuth callback rethrows
            // instead of redirecting to errorCallbackURL, so Google sign-ups fail silently.
            throw new APIError("FORBIDDEN", {
              code: EMAIL_DOMAIN_NOT_ALLOWED,
              message: EMAIL_DOMAIN_NOT_ALLOWED_MESSAGE,
            });
          }
          return { data: user };
        },
        after: async (user) => {
          const existing = await db.collection("member").findOne({ email: user.email });

          if (existing) {
            console.log(`[auth] Duplicate member detected for ${user.email} — skipping creation.`);
            return;
          }
        },
      },
    },
  },
});
