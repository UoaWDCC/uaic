import type { CollectionConfig } from "payload";

export const Bulletins: CollectionConfig = {
  slug: "bulletin",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "issueNumber",
      type: "number",
      required: true,
      unique: true,
    },
    {
      name: "publishDate",
      type: "date",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "bulletinCover",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Only image files are allowed",
      },
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    {
      name: "bulletinPDF",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],

  upload: {
    disableLocalStorage: true,
  },
};
