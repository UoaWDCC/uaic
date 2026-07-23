import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URI as string;
export const client = new MongoClient(uri);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  advanced: {
    database: {
      tablePrefix: "",
    },
    generateId: false,
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
    },
  },
  databaseHooks: {
    user: {
      create: {
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
