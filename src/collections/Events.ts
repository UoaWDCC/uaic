import type { CollectionConfig, CollectionSlug} from "payload";


export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events'
  },
  admin: {
    useAsTitle: 'event',
  },
  fields: [
    {
      name: 'event', 
      type: 'text', 
      label: 'Event Name',
      required: true
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Start Date & Time',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'yyyy-MM-dd HH:mm',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End Date & Time',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'yyyy-MM-dd HH:mm',
        },
      },
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
    },
    {
      name: 'attendees',
      type: 'relationship',
      label: 'Attendees',
      relationTo: 'member' as CollectionSlug,
      hasMany: true,
    }
  ],
  access: {
    read: () => true,
  },
} 