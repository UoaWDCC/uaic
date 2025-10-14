import type { CollectionConfig } from "payload";

export const LandingPageImages: CollectionConfig = {
  slug: 'landing-page-images',
  labels: {
    singular: 'Landing Page Image',
    plural: 'Landing Page Images',
  },
  admin: {
    useAsTitle: 'tag',
    description:
      'Upload and manage up to three landing images — one each for the homepage, events, and bulletin.',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
      required: true,
      admin: {
        style: {
          cursor: 'pointer',
        },
      },
    },
    {
      name: 'tag',
      type: 'select',
      label: 'Tag',
      required: true,
      options: [
        { label: 'Homepage', value: 'homepage' },
        { label: 'Events', value: 'events' },
        { label: 'Bulletin', value: 'bulletin' },
      ],
      unique: true, 
      admin: {
        style: {
          cursor: 'pointer',
        },
      },
    },
  ],
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
};
