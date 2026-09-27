"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { resolveMedia } from "@/lib/payload/media";

export const getSponsors = async () => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "sponsors",
    depth: 1,
  });

  return result.docs.map((doc) => {
    const logo = resolveMedia(doc.logo);

    return {
      id: doc.id,
      name: doc.name,
      logo: logo?.url || "",
      logoWidth: logo?.width ?? null,
      logoHeight: logo?.height ?? null,
    };
  });
};
