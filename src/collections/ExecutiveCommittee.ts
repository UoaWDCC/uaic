import type { CollectionConfig } from "payload";

export const ExecutiveCommittee: CollectionConfig = {
  slug: "executive-committee",
  labels: {
    singular: "Executive Committee Member",
    plural: "Executive Committee Members",
  },
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "degree",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    {
      name: "subteam",
      type: "select",
      required: true,
      options: [
        { label: "Leadership Team", value: "Leadership Team" },
        {
          label: "Bulletin and Investment Committee Chairperson",
          value: "Bulletin and Investment Committee Chairperson",
        },
        { label: "Secretary & Treasurer", value: "Secretary & Treasurer" },
        { label: "Diversity and Inclusion Team", value: "Diversity and Inclusion Team" },
        { label: "Education Team", value: "Education Team" },
        { label: "Competitions Team 1", value: "Competitions Team 1" },
        { label: "Competitions Team 2", value: "Competitions Team 2" },
        { label: "Marketing Team", value: "Marketing Team" },
        { label: "Social Team", value: "Social Team" },
      ],
    },
  ],
};
