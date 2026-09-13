"use client";

import { GoSearch } from "react-icons/go";

type CommitteeFilterBarProps = {
  categories: { value: string; label: string }[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
};

const CommitteeFilterBar = ({
  categories,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: CommitteeFilterBarProps) => {
  const categoryClassName = (category: string | null) =>
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
          aria-label="Search committee members by name, role, degree, team, section title, or filter label"
          className="w-full rounded-full bg-white py-3 pr-5 pl-12 text-[13px] text-[#0B1A2B] shadow-[0_2px_8px_rgba(11,26,43,0.08)] outline-none placeholder:text-[#0B1A2B]/40 focus:ring-2 focus:ring-[#249AFF]/40 lg:py-3.5 lg:pl-14 lg:text-[15px] [&::-webkit-search-cancel-button]:cursor-pointer"
        />
      </div>

      <div className="flex w-full items-center gap-2 rounded-[28px] bg-white p-1.5 shadow-[0_2px_8px_rgba(11,26,43,0.08)] lg:p-2 xl:w-auto">
        <span className="shrink-0 px-2 py-1.5 text-[12px] font-semibold text-[#145BA7] lg:px-3 lg:py-2 lg:text-[14px]">
          Filter By
        </span>

        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 xl:flex-none">
          <button
            type="button"
            aria-pressed={selectedCategory === null}
            onClick={() => onCategoryChange(null)}
            className={categoryClassName(null)}
          >
            All
          </button>

          {categories.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              aria-pressed={selectedCategory === value}
              onClick={() => onCategoryChange(value)}
              className={categoryClassName(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommitteeFilterBar;
