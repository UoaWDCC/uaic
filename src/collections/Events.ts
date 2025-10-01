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
      required: true,
      admin: {
        style: {
          cursor: 'pointer',
        },
      },
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
        style: {
          cursor: 'pointer',
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
        style: {
          cursor: 'pointer',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      required: true,
      admin: {
        style: {
          cursor: 'pointer',
        },
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      required: true,
      admin: {
        style: {
          cursor: 'pointer',
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
      admin: {
        style: {
          cursor: 'pointer',
        },
      },
    },
    {
      name: 'attendees',
      type: 'relationship',
      label: 'Attendees',
      relationTo: 'member' as CollectionSlug,
      hasMany: true,
      admin: {
        style: {
          cursor: 'pointer',
        },
      },
    }
  ],
  access: {
    read: () => true,
  },
}