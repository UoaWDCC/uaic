import type { CollectionConfig, CollectionSlug  } from "payload";

export const Member: CollectionConfig = {
  slug: 'member',
  admin: {
    useAsTitle: 'member',
  },
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
      type: 'select',
      label: 'Role (Member, Exec, Leadership)',
      options: [
        { label: 'Member', value: 'member'},
        { label: 'Executive', value: 'exec'},
        { label: 'Leadership', value: 'leadership'}
      ],
      required: true
    },
    {
      name: 'executiveInformation',
      type: 'relationship',
      label: 'Executive Information',
      relationTo: 'executive' as CollectionSlug,
      required: false,
      admin: {
        condition: (data) => data?.role === 'exec',
      }

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
    },
  ],
  access: {
    read: () => true,
  }
} 