"use server";
import { getPayload } from "payload";
import config from "@payload-config";
import type { BulletinCategory } from "@/lib/bulletinCategories";

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

    return result.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      issueNumber: doc.issueNumber,
      publishDate: doc.publishDate,
      description: doc.description,
      category: doc.category ?? undefined,
      readTime: doc.readTime ?? undefined,
      bulletinCover: doc.bulletinCover
        ? {
            url: doc.bulletinCover.url,
            alt: doc.bulletinCover.alt || doc.title,
          }
        : undefined,
      bulletinPDF: doc.bulletinPDF
        ? {
            url: doc.bulletinPDF.url,
            alt: doc.bulletinPDF.alt || doc.title,
          }
        : undefined,
    }));
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
