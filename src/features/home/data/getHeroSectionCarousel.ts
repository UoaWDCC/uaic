"use server";

import { getPayload } from "payload";
import config from "@payload-config";

export interface HeroSectionCarouselSlide {
  id: string;
  index: number;
  name: string;
  imageUrl: string;
}

export const getHeroSectionCarousel = async (): Promise<HeroSectionCarouselSlide[]> => {
  const payload = await getPayload({ config });

  try {
    const result = await payload.find({
      collection: "hero-section-carousel",
      sort: "index",
      depth: 1,
      limit: 50,
    });

    return result.docs
      .map((doc) => {
        const image = doc.image as any;

        return {
          id: doc.id,
          index: doc.index,
          name: doc.name,
          imageUrl: image?.url || "",
        };
      })
      .filter((slide) => slide.imageUrl.length > 0);
  } catch (error) {
    console.error("Error fetching hero section carousel slides:", error);
    return [];
  }
};
