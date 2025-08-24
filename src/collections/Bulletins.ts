import type { CollectionConfig } from "payload";

export const Bulletins: CollectionConfig = {
  slug: "bulletin",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "bulletinPDF",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Upload the PDF directly or select from media",
      },
    },
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
      hooks: {
        // this removes all newlines and trims leading/trailing spaces
        // BECAUSE i know they r gonna paste some formatted text from the pdf lol (bc i did too)
        beforeChange: [({ value }) => value?.replace(/\s+/g, " ").trim()],
      },
    },
    {
      name: "bulletinCover",
      type: "upload",
      relationTo: "media",
      required: false,
      admin: {
        description: "Only image files are allowed",
      },
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
  ],
};
