import type { CollectionConfig } from "payload";

export const Event: CollectionConfig = {
  slug: 'event',
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
      type: 'text',
      label: 'Image',
      required: true
    },
    {
      name: 'attendees (from Member Collection)',
      type: 'text',
      label: '',
      required: true
    }
  ]
}