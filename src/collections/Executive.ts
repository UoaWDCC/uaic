import type { CollectionConfig, CollectionSlug  } from "payload";

export const Executive: CollectionConfig = {
    slug: 'executive',
    fields: [
        {
            name: 'executive',
            type: 'text',
            label: 'Executive',
            required: true
        },
        {
            name: 'member',
            type: 'relationship',
            label: 'Member',
            relationTo: 'member' as CollectionSlug,
            hasMany: true,
            required: false
        }
    ],
    access: {
        read: () => true,
    }
}