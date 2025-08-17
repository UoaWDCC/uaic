import { CollectionConfig } from 'payload/types';

const FAQ: CollectionConfig = {
  slug: 'FAQS',
  admin: {
    useAsTitle: 'question',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
  ],
};

export default FAQ;
