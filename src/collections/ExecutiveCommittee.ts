import type { CollectionConfig, TextFieldSingleValidation } from "payload";
import { validateUrl } from "@payloadcms/richtext-lexical";

const validateLinkedinUrl: TextFieldSingleValidation = (value) =>
  !value || validateUrl(value) || "Please enter a valid URL.";

export const ExecutiveCommittee: CollectionConfig = {
  slug: "executive-committee",
  labels: {
    singular: "Executive Committee Member",
    plural: "Executive Committee Members",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "title", "team", "displayOrder"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "degree",
      type: "text",
      required: true,
    },
    {
      name: "linkedinUrl",
      type: "text",
      label: "LinkedIn URL",
      required: false,
      admin: {
        description: "Include https:// at the start, e.g. https://www.linkedin.com/in/your-name/.",
      },
      validate: validateLinkedinUrl,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    {
      name: "team",
      label: "Executive Subteam",
      type: "relationship",
      relationTo: "executive-subteams",
      hasMany: false,
      required: true,
      admin: {
        description: "Select the team created in Executive Subteams.",
      },
    },
    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      required: true,
      defaultValue: 0,
      min: 0,
      admin: {
        description:
          "Order within this member's team. Lower numbers appear first; equal numbers are sorted by name.",
      },
    },
  ],
};
