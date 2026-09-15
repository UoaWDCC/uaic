"use server";
import { getPayload } from "payload";
import config from "@payload-config";
import { resolveMedia } from "@/lib/payload/media";

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

    if (result.docs.length > 0) {
      return resolveMedia(result.docs[0].image)?.url ?? null;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching landing page image for tag "${tag}":`, error);
    return null;
  }
};
