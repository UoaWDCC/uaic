import { CollectionConfig } from "payload";

export const Sponsors: CollectionConfig = {
  slug: "sponsors",
  labels: {
    singular: "Sponsor",
    plural: "Sponsors",
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
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
