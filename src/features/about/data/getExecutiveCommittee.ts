"use server";

import type { CollectionSlug } from "payload";
import { getPayload } from "payload";
import config from "@payload-config";

const executiveSubteams = [
  "Leadership Team",
  "Bulletin and Investment Committee Chairperson",
  "Secretary & Treasurer",
  "Diversity and Inclusion Team",
  "Education Team",
  "Competitions Team 1",
  "Competitions Team 2",
  "Marketing Team",
  "Social Team",
] as const;

const executiveMemberOrder: Record<string, string[]> = {
  "Leadership Team": ["Danielle Smith", "James Maclean"],
  "Bulletin and Investment Committee Chairperson": ["Riley Bogard-Allan", "Rohit Guthpe"],
  "Secretary & Treasurer": ["Amica Valencia", "Isabella Boswell", "Tom Maclean"],
  "Diversity and Inclusion Team": ["Cassandra Ekanayake", "Kayleigh Pieters", "Lisa Shiozawa"],
  "Education Team": ["Gavin Chi", "Abby Sathyendran", "Reuben Paul", "Samuel Foote"],
  "Competitions Team 1": ["Aimee Ng", "Andrew Griffiths", "Katie Parr"],
  "Competitions Team 2": ["Isabella Ho", "Riley Atkinson"],
  "Marketing Team": ["Isabella Boswell", "Angelina Katseli", "Joshua Dawson", "Rose Tan"],
  "Social Team": ["Matt Powell", "Miles Tapsell", "Sam Gowen", "Shiva Nyayapati"],
};

type ExecutiveCommitteeMember = {
  name: string;
  title: string;
  degree: string;
  imageSrc: string;
};

type ExecutiveCommitteeDoc = {
  name?: string | null;
  title?: string | null;
  degree?: string | null;
  subteam?: string | null;
  image?: {
    url?: string | null;
  } | null;
};

const getImageSrc = (image: unknown) => {
  if (!image || typeof image !== "object") {
    return "";
  }

  const imageRecord = image as { url?: string | null };

  return imageRecord.url || "";
};

export const getExecutiveCommittee = async (): Promise<{
  executiveSubteams: readonly string[];
  teamProfiles: Record<string, ExecutiveCommitteeMember[]>;
}> => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "executive-committee" as CollectionSlug,
    depth: 1,
    pagination: false,
  });

  const docs = result.docs as ExecutiveCommitteeDoc[];

  const teamProfiles = Object.fromEntries(
    executiveSubteams.map((team) => [team, [] as ExecutiveCommitteeMember[]]),
  ) as Record<string, ExecutiveCommitteeMember[]>;

  for (const team of executiveSubteams) {
    const orderedNames = executiveMemberOrder[team] || [];
    const members = docs
      .filter((doc) => doc.subteam === team)
      .sort((left, right) => {
        const leftIndex = orderedNames.indexOf(left.name || "");
        const rightIndex = orderedNames.indexOf(right.name || "");

        if (leftIndex === -1 && rightIndex === -1) {
          return String(left.name || "").localeCompare(String(right.name || ""));
        }

        if (leftIndex === -1) {
          return 1;
        }

        if (rightIndex === -1) {
          return -1;
        }

        return leftIndex - rightIndex;
      })
      .map((doc) => ({
        name: doc.name || "",
        title: doc.title || "",
        degree: doc.degree || "",
        imageSrc: getImageSrc(doc.image),
      }));

    teamProfiles[team] = members;
  }

  return {
    executiveSubteams,
    teamProfiles,
  };
};
