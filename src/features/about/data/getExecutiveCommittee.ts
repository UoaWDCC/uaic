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
    const members = docs
      .filter((doc) => doc.subteam === team)
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
