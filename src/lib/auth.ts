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
    // Reset links last one hour. Better Auth deletes the token when it's used,
    // so each link only works once.
    resetPasswordTokenExpiresIn: 60 * 60,
    sendResetPassword: async ({ user, url }) => {
      // Imported lazily: send-email throws at import time without RESEND_API_KEY,
      // which would otherwise take down login and signup along with resets.
      const { sendEmail } = await import("@/features/email/lib/send-email");

      // Never log `url` - it contains the reset token.
      await sendEmail({
        recipient: user.email,
        subject: "Reset your UAIC password",
        message: `Use this link to reset your UAIC password. It expires in one hour.\n\n${url}\n\nIf you didn't ask to reset your password, you can ignore this email.`,
      });
    },
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
