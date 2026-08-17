"use client";

import { GoArrowRight } from "react-icons/go";
import { useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import type { ArticleCardContent } from "@/components/ArticleCard";

type FeaturedArticle = ArticleCardContent;

const featuredArticles: FeaturedArticle[] = [
  {
    image: "/assets/bulletins/temparticlecard.png",
    category: "Category Name 1",
    title: "Exploring DCT Investing",
    description:
      "A look into how DCT, why investors use it, and how consistent investing can reduce impact of market fluctuations.  ",
    date: "Nov 24",
    readTime: "4 Min read",
    link: "/joinus",
  },
  {
    image: "/assets/bulletins/temparticlecard.png",
    category: "Category Name 2",
    title: "Exploring DCT Investing 2",
    description:
      "A look into how DCT, why investors use it, and how consistent investing can reduce impact of market fluctuations.",
    date: "Nov 24",
    readTime: "10 Min read",
    link: "/joinus",
  },
  {
    image: "/assets/bulletins/temparticlecard.png",
    category: "Category Name 3",
    title: "Exploring DCT Investing 3",
    description:
      "A look into how DCT, why investors use it, and how consistent investing can reduce impact of market fluctuations. ",
    date: "Nov 24",
    readTime: "4 Min read",
    link: "/about",
  },
  {
    image: "/assets/bulletins/temparticlecard.png",
    category: "Category Name 4",
    title: "Exploring DCT Investing 4",
    description:
      "A look into how DCT, why investors use it, and how consistent investing can reduce impact of market fluctuations. ",
    date: "Nov 24",
    readTime: "14 Min read",
    link: "/bulletin",
  },
  {
    image: "/assets/bulletins/temparticlecard.png",
    category: "Category Name 5",
    title: "Exploring DCT Investing 5",
    description:
      "A look into how DCT, why investors use it, and how consistent investing can reduce impact of market fluctuations. ",
    date: "Nov 24",
    readTime: "4 Min read",
    link: "/bulletin",
  },
  {
    image: "/assets/bulletins/temparticlecard.png",
    category: "Category Name 6",
    title: "Exploring DCT Investing 6",
    description:
      "A look into how DCT, why investors use it, and how consistent investing can reduce impact of market fluctuations. ",
    date: "Nov 24",
    readTime: "54 Min read",
    link: "/bulletin",
  },
];

const articlesPerPage = 3;
const articlePages = Array.from(
  { length: Math.ceil(featuredArticles.length / articlesPerPage) },
  (_, pageIndex) =>
    featuredArticles.slice(pageIndex * articlesPerPage, (pageIndex + 1) * articlesPerPage),
);

const FeaturedArticlesCarousel = () => {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const isFirstPage = activePageIndex === 0;
  const pageGapPx = 24;

  const changeArticles = () => {
    setActivePageIndex((currentPageIndex) =>
      currentPageIndex === 0 ? Math.min(1, articlePages.length - 1) : currentPageIndex - 1,
    );
  };

  return (
    <div className="p-[66px] min-[1025px]:p-[82px]">
      {/* Split previous above and below div to fix article card shadow*/}
      <div className="overflow-hidden p-[14px]">
        <div className="flex flex-col gap-[12px]">
          {/* Header row container */}
          <div className="[container-type:inline-size] flex flex-row items-center justify-between gap-[2cqw]">
            {/* Header Title Container */}
            <div className="flex w-full sm:w-auto">
              <p className="text-[max(22px,5cqw)] font-semibold text-[#005EAF] min-[1025px]:text-[max(24px,2.65cqw)]">
                Featured Articles
              </p>
            </div>

            {/* Header Arrows */}
            <div className="flex flex-row gap-[2cqw] sm:justify-center">
              <button className="cursor-pointer" type="button" onClick={changeArticles}>
                <GoArrowRight
                  className={`h-[max(34px,8cqw)] w-[max(34px,8cqw)] text-[#005EAF] transition-transform duration-500 min-[1025px]:h-[max(40px,4.25cqw)] min-[1025px]:w-[max(40px,4.25cqw)] ${
                    isFirstPage ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Components container */}
          <div
            className="flex w-full gap-[24px] transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${activePageIndex * 100}% - ${
                activePageIndex * pageGapPx
              }px))`,
            }}
          >
            {articlePages.map((articlePage, pageIndex) => (
              <div
                className="grid w-full shrink-0 grid-cols-1 gap-[24px] min-[1025px]:grid-cols-3"
                key={`featured-articles-page-${pageIndex}`}
              >
                {articlePage.map((item, index) => (
                  <ArticleCard
                    key={`${item.category}-${item.link}-${index}`}
                    contentToDisplay={item}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticlesCarousel;
