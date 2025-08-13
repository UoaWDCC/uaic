import { CollectionConfig } from "payload";

export const Portfolio: CollectionConfig = {
  slug: "portfolio", // This is how Payload identifies the collection internally
  labels: {
    singular: "Portfolio Item",
    plural: "Portfolio",
  },
  fields: [
    {
      name: "companyName",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea", // larger text area for descriptions
    },
    {
      name: "investmentDate",
      type: "date",
      required: true,
    },
    {
      name: "ticker",
      type: "text",
    },
    {
      name: "exchange",
      type: "text",
    },
    {
      name: "industry",
      type: "text",
    },
  ],
};

export default Portfolio;
