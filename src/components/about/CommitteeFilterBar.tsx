"use client";

import { GoSearch } from "react-icons/go";

const SUBTEAM_CATEGORIES = {
  "Leadership Team": "Leadership",
  "Bulletin and Investment Committee Chairperson": "B&I",
  "Secretary & Treasurer": "Operations",
  "Diversity and Inclusion Team": "D&I",
  "Education Team": "Education",
  "Competitions Team 1": "Comp",
  "Competitions Team 2": "Comp",
  "Marketing Team": "Engagement",
  "Social Team": "Engagement",
} as const;

type MappedCommitteeCategory = (typeof SUBTEAM_CATEGORIES)[keyof typeof SUBTEAM_CATEGORIES];

export type CommitteeCategory = "All" | MappedCommitteeCategory;

export const getCommitteeCategory = (subteam: string): MappedCommitteeCategory | undefined =>
  SUBTEAM_CATEGORIES[subteam as keyof typeof SUBTEAM_CATEGORIES];

type CommitteeFilterBarProps = {
  executiveSubteams: readonly string[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: CommitteeCategory;
  onCategoryChange: (category: CommitteeCategory) => void;
};

const CommitteeFilterBar = ({
  executiveSubteams,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: CommitteeFilterBarProps) => {
  const categories = Array.from(
    new Set(
      executiveSubteams
        .map(getCommitteeCategory)
        .filter((category): category is MappedCommitteeCategory => Boolean(category)),
    ),
  );

  const categoryClassName = (category: CommitteeCategory) =>
    `shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-[12px] whitespace-nowrap transition-colors duration-200 lg:px-4 lg:py-2 lg:text-[13px] ${
      selectedCategory === category
        ? "bg-gradient-to-l from-[#005EAF] to-[#249AFF] text-white"
        : "bg-[#F1F5FA] text-[#0B1A2B]/50 hover:bg-[#E4EEF9] hover:text-[#145BA7]"
    }`;

  return (
    <div className="flex w-full flex-col gap-4 xl:flex-row xl:items-center xl:gap-6">
      <div className="relative w-full xl:flex-1">
        <GoSearch className="pointer-events-none absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2 text-[#0B1A2B]/40 lg:h-5 lg:w-5" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search..."
          aria-label="Search committee members by name, role, degree, or team"
          className="w-full rounded-full bg-white py-3 pr-5 pl-12 text-[13px] text-[#0B1A2B] shadow-[0_2px_8px_rgba(11,26,43,0.08)] outline-none placeholder:text-[#0B1A2B]/40 focus:ring-2 focus:ring-[#249AFF]/40 lg:py-3.5 lg:pl-14 lg:text-[15px] [&::-webkit-search-cancel-button]:cursor-pointer"
        />
      </div>

      <div className="flex w-full items-center gap-2 rounded-[28px] bg-white p-1.5 shadow-[0_2px_8px_rgba(11,26,43,0.08)] lg:p-2 xl:w-auto">
        <span className="shrink-0 px-2 py-1.5 text-[12px] font-semibold text-[#145BA7] lg:px-3 lg:py-2 lg:text-[14px]">
          Sort By
        </span>

        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 xl:flex-none">
          <button
            type="button"
            aria-pressed={selectedCategory === "All"}
            onClick={() => onCategoryChange("All")}
            className={categoryClassName("All")}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={selectedCategory === category}
              onClick={() => onCategoryChange(category)}
              className={categoryClassName(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommitteeFilterBar;
