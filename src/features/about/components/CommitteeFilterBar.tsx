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
    `shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-[12px] whitespace-nowrap transition-colors duration-fast lg:px-4 lg:py-2 lg:text-[13px] ${
      selectedCategory === category
        ? "bg-gradient-to-l from-primary to-primary-light text-white"
        : "bg-surface-faint text-ink/50 hover:bg-surface-muted hover:text-primary"
    }`;

  return (
    <div className="flex w-full flex-col gap-4 xl:flex-row xl:items-center xl:gap-6">
      <div className="relative w-full xl:flex-1">
        <GoSearch className="text-ink/40 pointer-events-none absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2 lg:h-5 lg:w-5" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search..."
          aria-label="Search committee members by name, role, degree, team, section title, or filter label"
          className="text-ink shadow-input-group placeholder:text-ink/40 focus:ring-ring/40 w-full rounded-full bg-white py-3 pr-5 pl-12 text-[13px] outline-none focus:ring-2 lg:py-3.5 lg:pl-14 lg:text-[15px] [&::-webkit-search-cancel-button]:cursor-pointer"
        />
      </div>

      <div className="shadow-input-group flex w-full items-center gap-2 rounded-[28px] bg-white p-1.5 lg:p-2 xl:w-auto">
        <span className="text-primary shrink-0 px-2 py-1.5 text-[12px] font-semibold lg:px-3 lg:py-2 lg:text-[14px]">
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
