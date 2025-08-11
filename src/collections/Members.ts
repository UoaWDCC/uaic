import { CollectionConfig } from "payload";

export const Members: CollectionConfig = {
  slug: 'investment-committee-images',
  labels: {
    singular: 'Investment Committee Image',
    plural: 'Investment Committee Images',
  },
  admin: {
    useAsTitle: 'alt',
    description: 'Image for the Investment Committee section',
  },
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      required: true,
    },
  ],
  access: {
    read: () => true,
  },
};