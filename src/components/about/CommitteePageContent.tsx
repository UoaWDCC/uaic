"use client";

import { useMemo, useState } from "react";
import CommitteeCardList from "@/components/about/CommitteeCardList";
import CommitteeFilterBar from "@/components/about/CommitteeFilterBar";
import CommitteeHeader from "@/components/about/CommitteeHeader";

import type { ExecutiveCommitteeData } from "@/features/about/types";

type CommitteePageContentProps = {
  executiveCommittee: ExecutiveCommitteeData;
};

const CommitteePageContent = ({ executiveCommittee }: CommitteePageContentProps) => {
  const { teams } = executiveCommittee;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = useMemo(() => {
    const labels = new Map<string, string>();
    for (const team of teams) {
      const label = team.filterLabel.trim();
      const value = label.toLowerCase();
      if (label && !labels.has(value)) labels.set(value, label);
    }
    return Array.from(labels, ([value, label]) => ({ value, label }));
  }, [teams]);
  const activeCategory = categories.some(({ value }) => value === selectedCategory)
    ? selectedCategory
    : null;

  const filteredTeams = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return teams.flatMap((team) => {
      if (activeCategory !== null && team.filterLabel.trim().toLowerCase() !== activeCategory) {
        return [];
      }

      if (!query) return [team];

      const teamMatches = [team.name, team.sectionTitle, team.filterLabel].some((name) =>
        name.toLowerCase().includes(query),
      );
      if (teamMatches) return [team];

      const members = team.members.filter((member) =>
        [member.name, member.title, member.degree].join(" ").toLowerCase().includes(query),
      );

      return members.length > 0 ? [{ ...team, members }] : [];
    });
  }, [teams, searchQuery, activeCategory]);

  return (
    <div className="w-full bg-[#F4F8FE]">
      <CommitteeHeader />

      <div className="flex w-full flex-col px-6 pt-10 pb-12 lg:px-16 lg:pt-8 lg:pb-20">
        <CommitteeFilterBar
          categories={categories}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={activeCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div id="ExecutiveCommittee" className="mt-6 scroll-mt-35 lg:mt-8">
          {filteredTeams.length > 0 ? (
            <CommitteeCardList teams={filteredTeams} />
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
