"use server";

import { getPayload } from "payload";
import config from "@payload-config";

export const getSponsors = async () => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "sponsors",
    depth: 1,
  });

  console.log("Sponsors fetched from Payload CMS:", result);

  return result.docs.map((doc: any) => {
    const logo = doc.logo as any;

    return {
      id: doc.id,
      name: doc.name,
      logo: logo?.url || "",
    };
  });
};
