import type { CollectionConfig } from "payload";
import { BULLETIN_CATEGORIES } from "../lib/bulletinCategories";

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
      name: "category",
      type: "select",
      options: BULLETIN_CATEGORIES.map((category) => ({ label: category, value: category })),
      admin: {
        description: "Shown on the article card and used by the category filter on /bulletin",
      },
    },
    {
      name: "readTime",
      type: "number",
      min: 1,
      admin: {
        description: "Estimated read time in minutes, shown on the article card",
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
