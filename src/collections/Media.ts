import type { CollectionConfig } from "payload";
import { revalidateOnChange } from "../lib/payload/revalidateOnChange";

export const Media: CollectionConfig = {
  slug: "media",
  hooks: revalidateOnChange("/", "layout"),
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],

  upload: {
    disableLocalStorage: true,
  },
};
