"use client";

import { useMemo, useState } from "react";
import { GoSearch } from "react-icons/go";
import ArticleCard from "@/components/ArticleCard";
import type { ArticleCardContent } from "@/components/ArticleCard";
import { BULLETIN_CATEGORIES } from "@/lib/bulletinCategories";
import type { Bulletin } from "@/features/bulletins/data/getBulletins";

type AllArticlesProps = {
  bulletins: Bulletin[];
};

const ALL_CATEGORIES = "All";
const FALLBACK_COVER = "/assets/bulletins/placeholder-bulletin-cover.png";

const categoryFilters = [ALL_CATEGORIES, ...BULLETIN_CATEGORIES];

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
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search..."
              aria-label="Search articles"
              className="w-full rounded-full bg-white py-3 pr-5 pl-12 text-[13px] text-[#0B1A2B] shadow-[0_2px_8px_rgba(11,26,43,0.08)] outline-none placeholder:text-[#0B1A2B]/40 focus:ring-2 focus:ring-[#249AFF]/40 lg:py-3.5 lg:pl-14 lg:text-[15px]"
            />
          </div>

          {/* The pill row sits on its own rounded white bar, and scrolls sideways
              on small screens rather than wrapping. */}
          <div className="-mx-6 overflow-x-auto px-6 pb-1 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
            <div className="flex w-max items-center gap-2 rounded-full bg-white p-1.5 shadow-[0_2px_8px_rgba(11,26,43,0.08)] lg:w-auto lg:p-2">
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
                    onClick={() => setSelectedCategory(category)}
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
        </div>

        {/* Article grid — 2 up from mobile, 3 up on extra-wide screens */}
        <div className="mt-6 lg:mt-8" aria-live="polite">
          {visibleBulletins.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 2xl:grid-cols-3">
              {visibleBulletins.map((bulletin) => (
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
      </div>
    </section>
  );
};

export default AllArticles;
