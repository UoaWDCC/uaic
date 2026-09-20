import { revalidateOnChange } from "../lib/payload/revalidateOnChange";
import { CollectionConfig } from "payload";

const FAQ: CollectionConfig = {
  slug: "FAQ",
  hooks: revalidateOnChange("/FAQ"),
  admin: {
    useAsTitle: "question",
  },
  fields: [
    {
      name: "question",
      type: "text",
      required: true,
    },
    {
      name: "answer",
      type: "textarea",
      required: true,
    },
  ],
};

export default FAQ;
