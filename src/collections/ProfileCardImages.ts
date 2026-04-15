import type { CollectionConfig } from "payload";

export const ProfileCardImages: CollectionConfig = {
  slug: "profile-card-images",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Image Name",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      label: "Image",
      relationTo: "media",
      required: true,
    },
  ],
};
