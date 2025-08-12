import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { s3Storage } from "@payloadcms/storage-s3";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { InvestmentCommitteeImages } from "./collections/InvestmentCommitteeImages";
import { Member } from "./collections/Member";
import { Events } from "./collections/Events";

export default buildConfig({
  editor: lexicalEditor(),

  collections: [
    Users,
    Media,
    InvestmentCommitteeImages,
    Member, 
    Events

  ],

  secret: process.env.PAYLOAD_SECRET || "",

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),

  upload: {
    limits: {
      fileSize: 5000000,
    },
  },

  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: "media",
        },
        "investment-committee-images": {
        prefix: "investment-committee-images",
        },
      } as any,
      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION,
      },
    }),
  ],
  sharp,
});
