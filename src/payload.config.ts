import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { s3Storage } from "@payloadcms/storage-s3";
import FAQ from "./collections/FAQ";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { InvestmentCommitteeImages } from "./collections/InvestmentCommitteeImages";
import { Bulletins } from "./collections/Bulletins";
import { Member } from "./collections/Member";
import { Events } from "./collections/Events";
import { Executive } from "./collections/Executive";
import { ExecutiveCommittee } from "./collections/ExecutiveCommittee";
import { Portfolio } from "./collections/Portfolio";
import { LandingPageImages } from "./collections/LandingPageImages";
import { HeroSectionCarousel } from "./collections/HeroSectionCarousel";
import { Sponsors } from "./collections/Sponsors";

function convertToCSV(rows: any[]) {
  if (!rows || rows.length === 0) return "";

  const headers = Object.keys(rows[0]);
  const csvRows = [];

  csvRows.push(headers.join(","));

  for (const row of rows) {
    const values = headers.map((h) => JSON.stringify(row[h] ?? ""));
    csvRows.push(values.join(",")); // <-- fixed here
  }

  return csvRows.join("\n");
}

export default buildConfig({
  editor: lexicalEditor(),

  collections: [
    FAQ,
    Users,
    Media,
    InvestmentCommitteeImages,
    LandingPageImages,
    HeroSectionCarousel,
    Bulletins,
    Member,
    Executive,
    ExecutiveCommittee,
    Events,
    Portfolio,
    Sponsors,
  ],

  endpoints: [
    {
      path: "/export-members",
      method: "get",
      handler: async (req, res) => {
        const { docs } = await req.payload.find({ collection: "member" });
        const csvData = convertToCSV(docs);

        res.set({
          "Content-Type": "text/csv",
          "Content-Disposition": 'attachment; filename="members.csv"',
        });
        res.send(csvData);
      },
    },
  ],

  secret: process.env.PAYLOAD_SECRET || "",

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),

  upload: {
    limits: {
      fileSize: 20 * 1024 * 1024, // Had to increase to 20MiB as it was hardcapping my beautiful pdf uploads
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
