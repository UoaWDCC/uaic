import type { CollectionConfig, CollectionSlug  } from "payload";

export const Member: CollectionConfig = {
  slug: 'member',
  fields: [
    {
      name: 'member', 
      type: 'text', 
      label: 'Member Name',
      required: true
    },
    {
      name: 'upi',
      type: 'text',
      label: 'UPI',
      required: true
    },
    {
      name: 'studentID',
      type: 'text',
      label: 'Student ID',
      required: true
    },
    {
      name: 'role',
      type: 'text',
      label: 'Role (Member, Exec, Leadership)',
      required: true
    },
    {
      name: 'degree',
      type: 'text',
      label: 'degree',
      required: true
    },
    {
      name: 'events',
      type: 'relationship',
      label: "Events",
      relationTo: 'events' as CollectionSlug,
      hasMany: true,
      required: true
    },
  ],
  access: {
    read: () => true,
  }
} 