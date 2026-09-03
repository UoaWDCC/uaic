"use client";

import { GoArrowRight, GoArrowUpRight } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchArticles } from "@/lib/fetchArticles";
import type { ArticleCardContent } from "@/components/ArticleCard";

type FeaturedArticle = ArticleCardContent;

const FALLBACK_COVER = "/assets/bulletins/placeholder-bulletin-cover.png";
const articlesPerPage = 3;

const ArticleCard = ({ contentToDisplay }: { contentToDisplay: FeaturedArticle }) => {
  return (
    <Link
      href={contentToDisplay.link}
      className="group [container-type:inline-size] block w-full overflow-hidden rounded-[16px] shadow-[0_2.5px_10px_rgba(0,0,0,0.25)]"
    >
      <div className="aspect-[400/161] w-full overflow-hidden">
        <Image
          src={contentToDisplay.image}
          alt="Article Image"
          width={400}
          height={161}
          className="h-full w-full scale-110 object-cover transition-transform duration-300 group-hover:scale-100"
        />
      </div>
      <div className="flex flex-col gap-[2cqw] p-[6cqw]">
        <div className="inline-flex min-h-[6.75cqw] w-fit items-center justify-center rounded-[100px] bg-gradient-to-l from-[#005EAF] to-[#249AFF] px-[3cqw] py-[1cqw]">
          <p className="text-[4cqw] leading-none font-normal text-white">
            {contentToDisplay.category}
          </p>
        </div>
        <div className="flex flex-col gap-[1.5cqw]">
          <h2 className="text-[5cqw] leading-[1.15] font-semibold">{contentToDisplay.title}</h2>
          <p className="max-w-full text-[4cqw] leading-tight font-normal">
            {contentToDisplay.description}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between gap-[4cqw]">
          <div className="flex flex-row gap-[2cqw] text-[4cqw] font-normal opacity-50">
            <p>{contentToDisplay.date}</p>
            <p>•</p>
            <p>{contentToDisplay.readTime}</p>
          </div>
          <GoArrowUpRight className="h-[7.25cqw] w-[7.25cqw] shrink-0 text-[#145BA7] transition-transform duration-300 group-hover:rotate-45" />
        </div>
      </div>
    </Link>
  );
};

const FeaturedArticlesCarousel = () => {
  const [articles, setArticles] = useState<FeaturedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const isFirstPage = activePageIndex === 0;
  const pageGapPx = 24;

  useEffect(() => {
    async function load() {
      const data = await fetchArticles({ sort: "-publishDate", depth: "1" });

      setArticles(
        data.map((b: any) => ({
          image: b.bulletinCover?.url || FALLBACK_COVER,
          category: b.category || `Issue ${b.issueNumber}`,
          title: b.title,
          description: b.description,
          date: new Date(b.publishDate).toLocaleDateString("en-NZ", {
            month: "short",
            day: "numeric",
          }),
          readTime: b.readTime ? `${b.readTime} Min read` : undefined,
          link: `/bulletin/${b.id}`,
        })),
      );

      setLoading(false);
    }

    load();
  }, []);

  const articlePages = Array.from(
    { length: Math.ceil(articles.length / articlesPerPage) },
    (_, pageIndex) =>
      articles.slice(pageIndex * articlesPerPage, (pageIndex + 1) * articlesPerPage),
  );

  const changeArticles = () => {
    setActivePageIndex((currentPageIndex) =>
      currentPageIndex === 0 ? Math.min(1, articlePages.length - 1) : currentPageIndex - 1,
    );
  };

  return (
    <div className="px-[16px] py-[66px] min-[1025px]:p-[82px]">
      <div className="overflow-hidden p-[14px]">
        <div className="flex flex-col gap-[12px]">
          {/* Header */}
          <div className="[container-type:inline-size] flex flex-row items-center justify-between gap-[2cqw]">
            <div className="flex w-full sm:w-auto">
              <p className="text-[max(22px,5cqw)] font-semibold text-[#005EAF] min-[1025px]:text-[max(24px,2.65cqw)]">
                Featured Articles
              </p>
            </div>

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

          {/* Content */}
          <div
            className="flex w-full gap-[24px] transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${activePageIndex * 100}% - ${
                activePageIndex * pageGapPx
              }px))`,
            }}
          >
            {loading && (
              <div className="flex w-full items-center justify-center py-10">
                <p className="text-lg font-medium text-[#005EAF]">Loading featured articles...</p>
              </div>
            )}

            {!loading && articles.length === 0 && (
              <div className="flex w-full items-center justify-center py-10">
                <p className="text-lg font-medium text-[#005EAF]">
                  No featured articles available.
                </p>
              </div>
            )}

            {!loading &&
              articlePages.map((articlePage, pageIndex) => (
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
