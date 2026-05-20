import type { CollectionConfig } from "payload";

export const HeroSectionCarousel: CollectionConfig = {
  slug: "hero-section-carousel",
  labels: {
    singular: "Hero Section Carousel Slide",
    plural: "Hero Section Carousel Slides",
  },
  admin: {
    useAsTitle: "name",
    description: "Manage the homepage hero carousel slides and their display order.",
  },
  fields: [
    {
      name: "image",
      type: "upload",
      label: "Image",
      relationTo: "media",
      required: true,
      admin: {
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "index",
      type: "number",
      label: "Index",
      required: true,
      unique: true,
      admin: {
        step: 1,
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
      unique: true,
      admin: {
        placeholder: "Homepage Hero Slide 1",
      },
    },
  ],
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
};
