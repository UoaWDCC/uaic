// src/lib/db.ts
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URI as string;

console.log("Whaddup")

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable in .env");
}

let mongoClient: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // allow global caching in dev
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    mongoClient = new MongoClient(uri);
    global._mongoClientPromise = mongoClient.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  mongoClient = new MongoClient(uri);
  clientPromise = mongoClient.connect();
}

export const client = clientPromise;
