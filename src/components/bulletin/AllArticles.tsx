"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { GoChevronDown, GoChevronLeft, GoChevronRight, GoSearch } from "react-icons/go";
import ArticleCard from "@/components/ArticleCard";
import type { ArticleCardContent } from "@/components/ArticleCard";
import type { Bulletin } from "@/features/bulletins/data/getBulletins";

type AllArticlesProps = {
  bulletins: Bulletin[];
};

type SortOrder = "Latest" | "Oldest";

const ALL_SEMESTERS = "All semesters";
const ALL_READ_TIMES = "All read times";
const READ_TIME_BUCKETS = ["Quick (<5 min)", "Medium (5–10 min)", "Long (10+ min)"] as const;
const FALLBACK_COVER = "/assets/bulletins/placeholder-bulletin-cover.png";
const ARTICLES_PER_PAGE = 8;
// The navbar is fixed, so paging back to the top has to clear its height.
const NAVBAR_OFFSET_PX = 150;
const ELLIPSIS = "…";

// UoA-style academic semesters: Semester One (Mar–Jun) and Semester Two
// (Jul–Oct) sit within a single calendar year, but Summer School (Nov–Feb)
// straddles two, so it's labelled with both years it touches (e.g.
// "2025/26 SS"). sortKey is monotonically increasing through the academic
// calendar so the semester dropdown can be listed latest-first.
const getSemester = (publishDate: string): { label: string; sortKey: number } | null => {
  const date = new Date(publishDate);
  if (Number.isNaN(date.getTime())) return null;

  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  if (month >= 3 && month <= 6) return { label: `${year} S1`, sortKey: year * 10 + 1 };
  if (month >= 7 && month <= 10) return { label: `${year} S2`, sortKey: year * 10 + 2 };

  const ssStartYear = month >= 11 ? year : year - 1;
  return {
    label: `${ssStartYear}/${String((ssStartYear + 1) % 100).padStart(2, "0")} SS`,
    sortKey: ssStartYear * 10 + 3,
  };
};

const getReadTimeBucket = (readTime?: number): (typeof READ_TIME_BUCKETS)[number] | null => {
  if (!readTime) return null;
  if (readTime < 5) return READ_TIME_BUCKETS[0];
  if (readTime <= 10) return READ_TIME_BUCKETS[1];
  return READ_TIME_BUCKETS[2];
};

// First and last page stay reachable; the middle is a window around the current
// page so a long archive doesn't spill a button per issue across the screen.
const getPageItems = (totalPages: number, currentPage: number): (number | typeof ELLIPSIS)[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: (number | typeof ELLIPSIS)[] = [1];
  const windowStart = Math.max(2, currentPage - 1);
  const windowEnd = Math.min(totalPages - 1, currentPage + 1);

  if (windowStart > 2) items.push(ELLIPSIS);
  for (let page = windowStart; page <= windowEnd; page++) items.push(page);
  if (windowEnd < totalPages - 1) items.push(ELLIPSIS);

  items.push(totalPages);

  return items;
};

// Dates are stored as UTC timestamps, so read them back in UTC to keep the day
// from drifting for readers outside NZ.
const formatPublishDate = (publishDate: string) => {
  const date = new Date(publishDate);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
};

type FilterPillProps = {
  options: string[];
  value: string;
  defaultValue: string;
  onChange: (value: string) => void;
  ariaLabel: string;
};

// One pill inside the filter bar that opens its own options menu on click,
// instead of the bar just listing every option inline. Gradient-highlighted
// once a non-default value is picked, so an active filter stays visible even
// after its menu closes.
const FilterPill = ({ options, value, defaultValue, onChange, ariaLabel }: FilterPillProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isActive = value !== defaultValue;

  // Sized to the longest option this pill can ever show, so picking a
  // shorter/longer value doesn't reflow the rest of the filter bar. "ch"
  // scales with the pill's own font size, so mobile/lg text sizes both work.
  const longestOption = options.reduce(
    (longest, option) => (option.length > longest.length ? option : longest),
    "",
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ minWidth: `${longestOption.length + 3}ch` }}
        className={`flex shrink-0 cursor-pointer items-center justify-between gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] whitespace-nowrap transition-colors duration-200 lg:px-4 lg:py-2 lg:text-[13px] ${
          isActive
            ? "bg-gradient-to-l from-[#005EAF] to-[#249AFF] text-white"
            : "bg-[#F1F5FA] text-[#0B1A2B]/50 hover:bg-[#E4EEF9] hover:text-[#145BA7]"
        }`}
      >
        <span>{value}</span>
        <GoChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${isActive ? "text-white/80" : "text-[#0B1A2B]/40"}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="absolute top-full left-0 z-10 mt-2 max-h-64 min-w-[160px] overflow-y-auto rounded-2xl bg-white p-1.5 shadow-[0_8px_24px_rgba(11,26,43,0.12)]"
        >
          {options.map((option) => {
            const isSelected = option === value;

            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`block w-full cursor-pointer rounded-full px-3.5 py-1.5 text-left text-[12px] whitespace-nowrap transition-colors duration-200 lg:text-[13px] ${
                  isSelected
                    ? "bg-gradient-to-l from-[#005EAF] to-[#249AFF] text-white"
                    : "text-[#0B1A2B]/70 hover:bg-[#F1F5FA] hover:text-[#145BA7]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const toArticleCard = (bulletin: Bulletin): ArticleCardContent => ({
  image: bulletin.bulletinCover?.url || FALLBACK_COVER,
  // Older issues predate the category field, so fall back to the issue number
  // rather than shipping an empty pill.
  category: bulletin.category || `Issue #${bulletin.issueNumber}`,
  title: bulletin.title,
  description: bulletin.description || "",
  date: formatPublishDate(bulletin.publishDate),
  readTime: bulletin.readTime ? `${bulletin.readTime} Min read` : undefined,
  link: bulletin.bulletinPDF?.url || "#",
  openInNewTab: Boolean(bulletin.bulletinPDF?.url),
});

const AllArticles = ({ bulletins }: AllArticlesProps) => {
  const [selectedSemester, setSelectedSemester] = useState(ALL_SEMESTERS);
  const [selectedReadTime, setSelectedReadTime] = useState(ALL_READ_TIMES);
  const [sortOrder, setSortOrder] = useState<SortOrder>("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  // Distinct semesters actually present in the data, latest first.
  const semesters = useMemo(() => {
    const labelBySortKey = new Map<number, string>();

    bulletins.forEach((bulletin) => {
      const semester = getSemester(bulletin.publishDate);
      if (semester) labelBySortKey.set(semester.sortKey, semester.label);
    });

    return Array.from(labelBySortKey.entries())
      .sort(([firstKey], [secondKey]) => secondKey - firstKey)
      .map(([, label]) => label);
  }, [bulletins]);

  const visibleBulletins = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = bulletins.filter((bulletin) => {
      const matchesSemester =
        selectedSemester === ALL_SEMESTERS ||
        getSemester(bulletin.publishDate)?.label === selectedSemester;
      if (!matchesSemester) return false;

      const matchesReadTime =
        selectedReadTime === ALL_READ_TIMES ||
        getReadTimeBucket(bulletin.readTime) === selectedReadTime;
      if (!matchesReadTime) return false;

      if (!query) return true;

      return [
        bulletin.title,
        bulletin.description,
        bulletin.category,
        `Issue #${bulletin.issueNumber}`,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query);
    });

    return filtered.sort((firstBulletin, secondBulletin) => {
      const diff =
        new Date(firstBulletin.publishDate).getTime() -
        new Date(secondBulletin.publishDate).getTime();

      return sortOrder === "Latest" ? -diff : diff;
    });
  }, [bulletins, selectedSemester, selectedReadTime, sortOrder, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(visibleBulletins.length / ARTICLES_PER_PAGE));
  // Clamped rather than trusted: the filters reset the page, but the bulletin
  // list itself can change underneath us.
  const activePage = Math.min(currentPage, totalPages);
  const pageBulletins = visibleBulletins.slice(
    (activePage - 1) * ARTICLES_PER_PAGE,
    activePage * ARTICLES_PER_PAGE,
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));

    const grid = gridRef.current;
    if (!grid) return;

    window.scrollTo({
      top: grid.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET_PX,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-[#F4F8FE]">
      {/* Padding mirrors the navbar (px-6, and px-6 + the logo's ml-10 at lg) so
          the page content lines up with the logo and nav links above it. */}
      <div className="flex w-full flex-col px-6 py-12 lg:px-16 lg:py-20">
        {/* Header — type scale taken from Figma (Figtree 34.27 / 65.11 / 16) */}
        <div className="flex flex-col gap-3 lg:gap-[17px]">
          <p className="text-[22px] leading-none font-bold text-[#249AFF] lg:text-[34.27px]">
            Readup
          </p>
          <h1 className="text-[42px] leading-[0.895] font-bold text-[#0B1A2B] sm:text-[52px] lg:text-[65.11px]">
            All Articles
          </h1>
          <p className="mt-1 max-w-[728px] text-[14px] leading-[1.5625] font-normal text-[#0B1A2B] lg:mt-2 lg:text-[16px]">
            Explore a collection of insights, analysis, and perspectives from the UoA Investment
            Club, covering markets, companies, investment strategies, and the wider world of
            finance.
          </p>
        </div>

        {/* Search + filters */}
        <div className="mt-10 flex flex-col gap-4 lg:mt-24 lg:flex-row lg:items-center lg:gap-6">
          <div className="relative w-full lg:flex-1">
            <GoSearch className="pointer-events-none absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2 text-[#0B1A2B]/40 lg:h-5 lg:w-5" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by title or issue #..."
              aria-label="Search articles by title or issue number"
              className="w-full rounded-full bg-white py-3 pr-5 pl-12 text-[13px] text-[#0B1A2B] shadow-[0_2px_8px_rgba(11,26,43,0.08)] outline-none placeholder:text-[#0B1A2B]/40 focus:ring-2 focus:ring-[#249AFF]/40 lg:py-3.5 lg:pl-14 lg:text-[15px]"
            />
          </div>

          {/* Same "Sort By Category" bar as before — one shadowed surface with
              a label — but each pill is now its own dropdown trigger instead
              of a static, always-visible option. A fixed radius rather than
              rounded-full: rounded-full is relative to height, so once the
              pills wrap onto a second row on narrow screens the corners
              balloon into an oversized blob instead of staying consistent. */}
          <div className="flex w-full items-center gap-2 rounded-[28px] bg-white p-1.5 shadow-[0_2px_8px_rgba(11,26,43,0.08)] lg:w-auto lg:p-2">
            {/* Own div so the label never gets caught up in the pills'
                wrapping — it stays pinned top-left, only the pills row
                wraps beneath it. */}
            <span className="shrink-0 px-2 py-1.5 text-[12px] font-semibold text-[#145BA7] lg:px-3 lg:py-2 lg:text-[14px]">
              Sort By
            </span>
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 lg:flex-none">
              <FilterPill
                options={[ALL_SEMESTERS, ...semesters]}
                value={selectedSemester}
                defaultValue={ALL_SEMESTERS}
                onChange={(value) => {
                  setSelectedSemester(value);
                  setCurrentPage(1);
                }}
                ariaLabel="Filter articles by semester"
              />
              <FilterPill
                options={["Latest", "Oldest"]}
                value={sortOrder}
                defaultValue="Latest"
                onChange={(value) => {
                  setSortOrder(value as SortOrder);
                  setCurrentPage(1);
                }}
                ariaLabel="Sort articles by date"
              />
              <FilterPill
                options={[ALL_READ_TIMES, ...READ_TIME_BUCKETS]}
                value={selectedReadTime}
                defaultValue={ALL_READ_TIMES}
                onChange={(value) => {
                  setSelectedReadTime(value);
                  setCurrentPage(1);
                }}
                ariaLabel="Filter articles by read time"
              />
            </div>
          </div>
        </div>

        {/* Article grid — 1 up on phones, 2 up from tablet, 3 up on extra-wide screens */}
        <div className="mt-6 lg:mt-8" aria-live="polite" ref={gridRef}>
          {pageBulletins.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 2xl:grid-cols-3">
              {pageBulletins.map((bulletin) => (
                <ArticleCard key={bulletin.id} contentToDisplay={toArticleCard(bulletin)} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-[14px] text-[#0B1A2B]/60">
              {bulletins.length === 0
                ? "No articles have been published yet."
                : "No articles match your filters."}
            </p>
          )}
        </div>

        {/* Pagination — same white bar, shadow and active pill as the filter
            row. Shown even on a single page, but not over an empty result. */}
        {pageBulletins.length > 0 && (
          <nav aria-label="Article pagination" className="mt-10 flex justify-center lg:mt-14">
            <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full bg-white p-1.5 shadow-[0_2px_8px_rgba(11,26,43,0.08)] [scrollbar-width:none] lg:gap-2 lg:p-2 [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                aria-label="Previous page"
                disabled={activePage === 1}
                onClick={() => goToPage(activePage - 1)}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#145BA7] transition-colors duration-200 hover:bg-[#F1F5FA] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent lg:h-9 lg:w-9"
              >
                <GoChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>

              {getPageItems(totalPages, activePage).map((item, index) =>
                item === ELLIPSIS ? (
                  <span
                    key={`gap-${index}`}
                    aria-hidden="true"
                    className="shrink-0 px-1 text-[12px] text-[#0B1A2B]/40 lg:text-[13px]"
                  >
                    {ELLIPSIS}
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    aria-label={`Page ${item}`}
                    aria-current={item === activePage ? "page" : undefined}
                    onClick={() => goToPage(item)}
                    className={`flex h-8 min-w-8 shrink-0 cursor-pointer items-center justify-center rounded-full px-2 text-[12px] transition-colors duration-200 lg:h-9 lg:min-w-9 lg:text-[13px] ${
                      item === activePage
                        ? "bg-gradient-to-l from-[#005EAF] to-[#249AFF] font-semibold text-white"
                        : "text-[#0B1A2B]/50 hover:bg-[#F1F5FA] hover:text-[#145BA7]"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}

              <button
                type="button"
                aria-label="Next page"
                disabled={activePage === totalPages}
                onClick={() => goToPage(activePage + 1)}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#145BA7] transition-colors duration-200 hover:bg-[#F1F5FA] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent lg:h-9 lg:w-9"
              >
                <GoChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>
            </div>
          </nav>
        )}
      </div>
    </section>
  );
};

export default AllArticles;
