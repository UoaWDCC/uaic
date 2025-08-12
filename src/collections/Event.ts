import type { CollectionConfig, CollectionSlug} from "payload";


export const Event: CollectionConfig = {
  slug: 'event',
  labels: {
    singular: 'Event',
    plural: 'Events'
  },
  admin: {

  },
  upload: {
    imageSizes: [
      
    ]
  },
  fields: [
    {
      name: 'event', 
      type: 'text', 
      label: 'Event Name',
      required: true
    },
    {
      name: 'date',
      type: 'text',
      label: 'Date and Time',
      required: true
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      required: true
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      required: true
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
      required: true
    },
    {
      name: 'attendees',
      type: 'relationship',
      label: 'Attendees',
      relationTo: 'member' as CollectionSlug,
      hasMany: true,
      required: true
    }
  ],
  access: {
    read: () => true,
  },
} 