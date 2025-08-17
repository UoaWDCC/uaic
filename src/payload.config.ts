import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { s3Storage } from "@payloadcms/storage-s3";
import FAQ from './collections/FAQ';

export default buildConfig({
  editor: lexicalEditor(),

  collections: [
    FAQ,
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
      },
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
