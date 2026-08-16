"use client";

import { useMemo, useRef, useState } from "react";
import { GoChevronLeft, GoChevronRight, GoSearch } from "react-icons/go";
import ArticleCard from "@/components/ArticleCard";
import type { ArticleCardContent } from "@/components/ArticleCard";
import { BULLETIN_CATEGORIES } from "@/lib/bulletinCategories";
import type { Bulletin } from "@/features/bulletins/data/getBulletins";

type AllArticlesProps = {
  bulletins: Bulletin[];
};

const ALL_CATEGORIES = "All";
const FALLBACK_COVER = "/assets/bulletins/placeholder-bulletin-cover.png";
const ARTICLES_PER_PAGE = 8;
// The navbar is fixed, so paging back to the top has to clear its height.
const NAVBAR_OFFSET_PX = 150;
const ELLIPSIS = "…";

const categoryFilters = [ALL_CATEGORIES, ...BULLETIN_CATEGORIES];

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
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const visibleBulletins = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return bulletins.filter((bulletin) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORIES || bulletin.category === selectedCategory;

      if (!matchesCategory) return false;
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
  }, [bulletins, selectedCategory, searchQuery]);

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

        {/* Search + category filters */}
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
              placeholder="Search..."
              aria-label="Search articles"
              className="w-full rounded-full bg-white py-3 pr-5 pl-12 text-[13px] text-[#0B1A2B] shadow-[0_2px_8px_rgba(11,26,43,0.08)] outline-none placeholder:text-[#0B1A2B]/40 focus:ring-2 focus:ring-[#249AFF]/40 lg:py-3.5 lg:pl-14 lg:text-[15px]"
            />
          </div>

          {/* The pill row keeps the search bar's width on small screens — the
              pills scroll sideways inside the bar instead of overflowing it. */}
          <div className="flex w-full items-center gap-2 overflow-x-auto rounded-full bg-white p-1.5 shadow-[0_2px_8px_rgba(11,26,43,0.08)] [scrollbar-width:none] lg:w-auto lg:overflow-visible lg:p-2 [&::-webkit-scrollbar]:hidden">
            <span className="shrink-0 px-2 text-[12px] font-semibold text-[#145BA7] lg:px-3 lg:text-[14px]">
              Sort By Category
            </span>
            {categoryFilters.map((category) => {
              const isActive = category === selectedCategory;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-[12px] transition-colors duration-200 lg:px-4 lg:py-2 lg:text-[13px] ${
                    isActive
                      ? "bg-gradient-to-l from-[#005EAF] to-[#249AFF] text-white"
                      : "bg-[#F1F5FA] text-[#0B1A2B]/50 hover:bg-[#E4EEF9] hover:text-[#145BA7]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
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
                : "No articles match your search."}
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
