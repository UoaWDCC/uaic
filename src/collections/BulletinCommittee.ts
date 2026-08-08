import type { CollectionConfig } from "payload";

export const BulletinCommittee: CollectionConfig = {
  slug: "bulletin-committee",
  labels: {
    singular: "Bulletin Committee Member",
    plural: "Bulletin Committee Members",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role"],
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
      name: "role",
      type: "select",
      required: true,
      options: [
        { label: "Editor-in-Chief", value: "Editor-in-Chief" },
        { label: "Sub-Editor", value: "Sub-Editor" },
        { label: "Senior Writer", value: "Senior Writer" },
        { label: "Writer", value: "Writer" },
      ],
    },
  ],
};
