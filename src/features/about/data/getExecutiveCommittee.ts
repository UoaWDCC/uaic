"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import type { ExecutiveCommitteeData } from "@/features/about/types";

export const getExecutiveCommittee = async (): Promise<ExecutiveCommitteeData> => {
  const payload = await getPayload({ config });
  const [subteams, committee] = await Promise.all([
    payload.find({
      collection: "executive-subteams",
      depth: 0,
      pagination: false,
      sort: "displayOrder",
    }),
    payload.find({
      collection: "executive-committee",
      depth: 1,
      pagination: false,
      sort: "displayOrder",
    }),
  ]);

  const compareNames = (a: string, b: string) => a.localeCompare(b, "en-NZ");
  const sortedTeams = [...subteams.docs].sort(
    (a, b) =>
      (a.displayOrder ?? 0) - (b.displayOrder ?? 0) ||
      compareNames(a.name, b.name) ||
      a.id.localeCompare(b.id),
  );

  return {
    teams: sortedTeams.map((team) => {
      const members = committee.docs
        .filter((member) => {
          const teamId = typeof member.team === "object" ? member.team?.id : member.team;
          return teamId === team.id;
        })
        .sort(
          (a, b) =>
            (a.displayOrder ?? 0) - (b.displayOrder ?? 0) ||
            compareNames(a.name, b.name) ||
            a.id.localeCompare(b.id),
        );

      return {
        id: team.id,
        name: team.name,
        sectionTitle: team.sectionTitle,
        filterLabel: team.filterLabel.trim(),
        members: members.map((member) => ({
          id: member.id,
          name: member.name,
          title: member.title,
          degree: member.degree,
          imageSrc: typeof member.image === "object" ? member.image?.url || "" : "",
          linkedinUrl: member.linkedinUrl?.trim() || undefined,
        })),
      };
    }),
  };
};
