"use client";

import { useState } from "react";
import { GoSearch } from "react-icons/go";

// Categories aren't a field on the Events collection yet, so these pills are
// visual-only for now - clicking one just highlights it, it doesn't filter.
const CATEGORIES = ["All", "Competition", "Workshop", "Social"] as const;

type EventsFilterBarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const EventsFilterBar = ({ searchQuery, onSearchChange }: EventsFilterBarProps) => {
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>("All");

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
      <div className="relative w-full lg:flex-1">
        <GoSearch className="text-ink/40 pointer-events-none absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2 lg:h-5 lg:w-5" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search..."
          aria-label="Search events by title, location, or description"
          className="text-ink shadow-input-group placeholder:text-ink/40 focus:ring-ring/40 w-full rounded-full bg-white py-3 pr-5 pl-12 text-[13px] outline-none focus:ring-2 lg:py-3.5 lg:pl-14 lg:text-[15px]"
        />
      </div>

      <div className="shadow-input-group flex w-full items-center gap-2 rounded-[28px] bg-white p-1.5 lg:w-auto lg:p-2">
        <span className="text-primary shrink-0 px-2 py-1.5 text-[12px] font-semibold lg:px-3 lg:py-2 lg:text-[14px]">
          Sort By Category
        </span>
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 lg:flex-none">
          {CATEGORIES.map((category) => {
            const isActive = category === selectedCategory;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`duration-fast shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-[12px] whitespace-nowrap transition-colors lg:px-4 lg:py-2 lg:text-[13px] ${
                  isActive
                    ? "from-primary to-primary-light bg-gradient-to-l text-white"
                    : "bg-surface-faint text-ink/50 hover:bg-surface-muted hover:text-primary"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventsFilterBar;
