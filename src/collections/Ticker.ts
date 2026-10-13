import { GlobalConfig } from "payload";
import { revalidateGlobal } from "../lib/payload/revalidateGlobal";

export const Ticker: GlobalConfig = {
  slug: "ticker",
  hooks: revalidateGlobal("/", "layout"),
  fields: [
    {
      name: "tickers", //an array named tickers
      type: "array",
      required: true,
      fields: [
        //fields contained in each array element
        {
          name: "proName", //field 1
          type: "text",
          required: true,
        },

        {
          name: "title", //field 2
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
