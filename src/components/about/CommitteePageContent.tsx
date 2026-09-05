"use client";

import { useMemo, useState } from "react";
import CommitteeCardList from "@/components/about/CommitteeCardList";
import CommitteeFilterBar, {
  getCommitteeCategory,
  type CommitteeCategory,
} from "@/components/about/CommitteeFilterBar";
import CommitteeHeader from "@/components/about/CommitteeHeader";

type ExecutiveCommitteeMember = {
  name: string;
  title: string;
  degree: string;
  imageSrc: string;
};

type CommitteePageContentProps = {
  executiveCommittee: {
    executiveSubteams: readonly string[];
    teamProfiles: Record<string, ExecutiveCommitteeMember[]>;
  };
};

const CommitteePageContent = ({ executiveCommittee }: CommitteePageContentProps) => {
  const { executiveSubteams, teamProfiles } = executiveCommittee;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CommitteeCategory>("All");

  const filteredCommittee = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filteredSubteams: string[] = [];
    const filteredProfiles: Record<string, ExecutiveCommitteeMember[]> = {};

    for (const team of executiveSubteams) {
      if (selectedCategory !== "All" && getCommitteeCategory(team) !== selectedCategory) {
        continue;
      }

      const members = teamProfiles[team] ?? [];

      if (!query) {
        filteredSubteams.push(team);
        filteredProfiles[team] = members;
        continue;
      }

      const teamMatches = team.toLowerCase().includes(query);
      const matchingMembers = teamMatches
        ? members
        : members.filter((member) =>
            [member.name, member.title, member.degree].join(" ").toLowerCase().includes(query),
          );

      if (matchingMembers.length > 0) {
        filteredSubteams.push(team);
        filteredProfiles[team] = matchingMembers;
      }
    }

    return {
      executiveSubteams: filteredSubteams,
      teamProfiles: filteredProfiles,
    };
  }, [executiveSubteams, searchQuery, selectedCategory, teamProfiles]);

  return (
    <div className="w-full bg-[#F4F8FE]">
      <CommitteeHeader />

      <div className="flex w-full flex-col px-6 pt-10 pb-12 lg:px-16 lg:pt-8 lg:pb-20">
        <CommitteeFilterBar
          executiveSubteams={executiveSubteams}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div id="ExecutiveCommittee" className="mt-6 scroll-mt-35 lg:mt-8">
          {filteredCommittee.executiveSubteams.length > 0 ? (
            <CommitteeCardList
              executiveSubteams={filteredCommittee.executiveSubteams}
              teamProfiles={filteredCommittee.teamProfiles}
              expandAll={searchQuery.trim().length > 0}
            />
          ) : (
            <div className="py-10 text-center text-gray-500">
              No committee members match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommitteePageContent;
