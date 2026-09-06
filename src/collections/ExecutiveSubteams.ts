import type { CollectionConfig } from "payload";

export const ExecutiveSubteams: CollectionConfig = {
  slug: "executive-subteams",
  labels: {
    singular: "Executive Subteam",
    plural: "Executive Subteams",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "sectionTitle", "filterLabel", "displayOrder"],
  },
  defaultSort: "displayOrder",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      label: "Team Name",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "Blue category heading, e.g. Operations.",
      },
    },
    {
      name: "sectionTitle",
      label: "Section Title",
      type: "text",
      required: true,
      admin: {
        description: "Heading above the member cards, e.g. Secretaries and Treasurers.",
      },
    },
    {
      name: "filterLabel",
      label: "Filter Label",
      type: "text",
      required: true,
      admin: {
        description:
          "Filter button label. Use the same label for teams that share a button, e.g. Engagement.",
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
        description: "Lower numbers appear higher up.",
      },
    },
  ],
};
