"use server";
import { getPayload } from "payload";
import config from "@payload-config";
import type { BulletinCategory } from "@/lib/bulletinCategories";
import type { Bulletin as PayloadBulletin } from "../../../../payload-types";
import { resolveMedia } from "@/lib/payload/media";

export interface Bulletin {
  id: string;
  title: string;
  issueNumber: number;
  publishDate: string;
  description?: string;
  category?: BulletinCategory;
  readTime?: number;
  bulletinCover?: {
    url: string;
    alt?: string;
  };
  bulletinPDF?: {
    url: string;
    alt?: string;
  };
}

export const getBulletins = async (): Promise<Bulletin[]> => {
  const payload = await getPayload({ config });

  try {
    const result = await payload.find({
      collection: "bulletin",
      limit: 100,
      sort: ["-issueNumber", "-publishDate"],
      depth: 1,
    });

    return result.docs.map((doc: PayloadBulletin) => {
      const cover = resolveMedia(doc.bulletinCover);
      const pdf = resolveMedia(doc.bulletinPDF);

      return {
        id: doc.id,
        title: doc.title,
        issueNumber: doc.issueNumber,
        publishDate: doc.publishDate,
        description: doc.description ?? undefined,
        category: doc.category ?? undefined,
        readTime: doc.readTime ?? undefined,
        bulletinCover: cover
          ? {
              url: cover.url ?? "",
              alt: cover.alt || doc.title,
            }
          : undefined,
        bulletinPDF: pdf
          ? {
              url: pdf.url ?? "",
              alt: pdf.alt || doc.title,
            }
          : undefined,
      };
    });
  } catch (error) {
    console.error("Error fetching bulletins:", error);
    return [];
  }
};

export const getLatestBulletin = async (): Promise<Bulletin | null> => {
  const bulletins = await getBulletins();
  if (bulletins.length === 0) return null;
  return bulletins[0];
};
