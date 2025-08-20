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
      type: "textarea", 
      required: true,
    },
    {
      name: "investmentDate",
      type: "date",
      required: true,
    },
    {
      name: "ticker",
      type: "text",
      required: true,
    },
    {
      name: "exchange",
      type: "text",
      required: true,
    },
    {
      name: "industry",
      type: "text",
      required: true,
    },
  ],
};

export default Portfolio;
