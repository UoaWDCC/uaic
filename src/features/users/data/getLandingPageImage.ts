"use server";
import { getPayload } from "payload";
import config from "@payload-config";

export const getLandingPageImage = async (tag: string): Promise<string | null> => {
  const payload = await getPayload({ config });

  try {
    const result = await payload.find({
      collection: "landing-page-images",
      where: {
        tag: {
          equals: tag,
        },
      },
      limit: 1,
      depth: 1,
    });

    console.log("Result of payload.find:", JSON.stringify(result, null, 2)); // Debugging

    if (result.docs.length > 0) {
      const image = result.docs[0].image as any; // Access the image field
      console.log("Image field:", image); // Debugging
      return image?.url || null; // Ensure the URL property is accessed safely
    }

    return null;
  } catch (error) {
    console.error(`Error fetching landing page image for tag "${tag}":`, error);
    return null;
  }
};
