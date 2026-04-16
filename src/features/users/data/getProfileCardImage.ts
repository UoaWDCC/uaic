"use server";
import { getPayload } from "payload";
import config from "@payload-config";

export const getProfileCardImage = async (imageDocId: string): Promise<string | null> => {
  const payload = await getPayload({ config });

  try {
    const result = await payload.find({
      collection: "profile-card-images" as any,
      where: {
        id: {
          equals: imageDocId,
        },
      },
      limit: 1,
      depth: 1,
    });

    if (result.docs.length > 0) {
      const image = result.docs[0].image as any;
      return image?.url || null;
    }

    return null;
  } catch (error) {
    console.error("Error fetching profile card images", error);
    return null;
  }
};
