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
            name: 'event',
            type: 'relationship',
            label: 'Event',
            relationTo: 'events' as CollectionSlug,
            hasMany: true,
            required: false
        }
    ],
    access: {
        read: () => true,
    }
}