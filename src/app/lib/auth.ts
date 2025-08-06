import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { client } from "./db"; // your mongodb client
import { MongoClient } from "mongodb";

// const dbPromise = client.then((mongoClient) => mongoClient.db());

const uri = process.env.DATABASE_URI as string;
const client = new MongoClient(uri)
const db = client.db();
console.log("test");

export const auth = betterAuth({
    database: mongodbAdapter(db), 
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
});