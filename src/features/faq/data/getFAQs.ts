"use server";
import { getPayload } from "payload";
import config from "@payload-config";
import type { FAQ } from "../../../../payload-types";

export const getFAQs = async (): Promise<FAQ[]> => {
  const payload = await getPayload({ config });

  const faqs = await payload.find({
    collection: "FAQ",
    depth: 1,
    pagination: false,
    sort: "createdAt",
  });

  return faqs.docs;
};
