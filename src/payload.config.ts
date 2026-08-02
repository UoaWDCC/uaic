import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import type { Field } from "payload";
import { buildConfig } from "payload";
import { s3Storage } from "@payloadcms/storage-s3";
import { importExportPlugin } from "@payloadcms/plugin-import-export";
import { isAdminOrExec, isStaffUser } from "./lib/isAdminOrExec";
import FAQ from "./collections/FAQ";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { InvestmentCommitteeImages } from "./collections/InvestmentCommitteeImages";
import { Bulletins } from "./collections/Bulletins";
import { Member } from "./collections/Member";
import { Events } from "./collections/Events";
import { Executive } from "./collections/Executive";
import { Portfolio } from "./collections/Portfolio";
import { LandingPageImages } from "./collections/LandingPageImages";
import { HeroSectionCarousel } from "./collections/HeroSectionCarousel";
import { Sponsors } from "./collections/Sponsors";

// The plugin's /download stream never calls push() on an empty result, so the
// request hangs forever instead of returning a header-only CSV. When we detect
// zero matches ourselves, we build the header row from the collection's field
// config instead of falling through to the plugin's handler.
const collectFieldNames = (fields: Field[]): string[] =>
  fields.flatMap((field) => {
    if ("fields" in field && Array.isArray(field.fields)) {
      return collectFieldNames(field.fields);
    }
    if ("name" in field && field.name) {
      return [field.name];
    }
    return [];
  });

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
    Events,
    Portfolio,
    Sponsors,
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
    importExportPlugin({
      collections: ["member"],
      overrideExportCollection: (collection) => ({
        ...collection,
        admin: {
          ...collection.admin,
          components: {
            ...collection.admin?.components,
            edit: {
              ...collection.admin?.components?.edit,
              // Scoping `collections` to ["member"] above means the plugin's own
              // wiring (which only patches collections in that list) never reaches
              // the "exports" collection itself, so this button is missing unless
              // we set it here too. We use our own component instead of the
              // plugin's ExportSaveButton because that renders a "Save" button
              // alongside Download — Save just queues a background job, and this
              // project doesn't run the Jobs Queue, so Save silently does nothing.
              SaveButton: "/src/components/admin/ExportDownloadButton#ExportDownloadButton",
            },
          },
        },
        access: {
          ...collection.access,
          create: isAdminOrExec,
          read: isAdminOrExec,
          delete: isAdminOrExec,
        },
        endpoints: collection.endpoints
          ? collection.endpoints.map((endpoint) =>
              endpoint.path === "/download"
                ? {
                    ...endpoint,
                    handler: async (req) => {
                      if (!isStaffUser(req.user)) {
                        return Response.json({ error: "Unauthorized" }, { status: 401 });
                      }

                      const body = typeof req.json === "function" ? await req.json() : undefined;
                      const collectionSlug = body?.data?.collectionSlug;
                      const format = body?.data?.format ?? "csv";

                      if (collectionSlug && format === "csv") {
                        const { totalDocs } = await req.payload.find({
                          collection: collectionSlug,
                          depth: 0,
                          limit: 1,
                          overrideAccess: false,
                          user: req.user,
                          where: body.data.where,
                        });

                        if (totalDocs === 0) {
                          const collectionConfig = req.payload.config.collections.find(
                            ({ slug }) => slug === collectionSlug,
                          );
                          const headers = collectionConfig
                            ? Array.from(
                                new Set([
                                  "id",
                                  ...collectFieldNames(collectionConfig.fields),
                                  "createdAt",
                                  "updatedAt",
                                ]),
                              )
                            : ["id"];

                          return new Response(`${headers.join(",")}\r\n`, {
                            headers: {
                              "Content-Type": "text/csv; charset=utf-8",
                              "Content-Disposition": `attachment; filename="${body.data.name ?? "export"}.csv"`,
                            },
                          });
                        }
                      }

                      // req.json() can only be read once — the plugin's handler
                      // expects to call it itself, so hand back the parsed body.
                      req.json = async () => body;
                      return endpoint.handler(req);
                    },
                  }
                : endpoint,
            )
          : collection.endpoints,
      }),
    }),
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
