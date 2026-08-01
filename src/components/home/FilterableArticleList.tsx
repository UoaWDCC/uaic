"use client";

import { useMemo, useState } from "react";
import Dropdown from "@/components/Dropdown";
import type { Bulletin } from "@/features/bulletins/data/getBulletins";
import ArticleListItem from "./ArticleListItem";

type FilterableArticleListProps = {
  bulletins: Bulletin[];
};

type SortOrder = "Latest" | "Oldest";

const getBulletinYear = (publishDate: string) => {
  return new Date(publishDate).getUTCFullYear();
};

const getBulletinDate = (publishDate: string): number[] => {
  const date = new Date(publishDate);

  return [date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCFullYear()];
};

const FilterableArticleList = ({ bulletins }: FilterableArticleListProps) => {
  const years = useMemo(
    () =>
      Array.from(
        new Set(
          bulletins
            .map((bulletin) => getBulletinYear(bulletin.publishDate))
            .filter((year) => !Number.isNaN(year)),
        ),
      ).sort((firstYear, secondYear) => secondYear - firstYear),
    [bulletins],
  );

  const [selectedYear, setSelectedYear] = useState(years[0]?.toString() ?? "");
  const [sortOrder, setSortOrder] = useState<SortOrder>("Latest");

  const visibleBulletins = useMemo(() => {
    return bulletins
      .filter((bulletin) => getBulletinYear(bulletin.publishDate).toString() === selectedYear)
      .sort((firstBulletin, secondBulletin) => {
        const firstDate = new Date(firstBulletin.publishDate).getTime();
        const secondDate = new Date(secondBulletin.publishDate).getTime();

        return sortOrder === "Latest" ? secondDate - firstDate : firstDate - secondDate;
      });
  }, [bulletins, selectedYear, sortOrder]);

  if (years.length === 0) {
    return <p className="text-darkBlue text-center">No articles are available yet.</p>;
  }

  return (
    <>
      <div className="relative z-10 grid h-[25px] w-[308px] grid-cols-2 gap-[27px] lg:w-[514px]">
        <Dropdown
          options={years.map(String)}
          value={selectedYear}
          onChange={setSelectedYear}
          ariaLabel="Filter articles by year"
        />
        <Dropdown
          options={["Latest", "Oldest"]}
          value={sortOrder}
          onChange={(value) => setSortOrder(value as SortOrder)}
          ariaLabel="Sort articles by date"
        />
      </div>

      <div
        aria-live="polite"
        className="article-scrollbar flex max-h-[280px] w-[308px] flex-col gap-[6px] overflow-y-auto rounded-xl pr-[8px] lg:max-h-[710px] lg:w-[802px] lg:gap-[13px]"
      >
        {visibleBulletins.length > 0 ? (
          visibleBulletins.map((bulletin) => (
            <ArticleListItem
              key={bulletin.id}
              issueNumber={bulletin.issueNumber}
              date={getBulletinDate(bulletin.publishDate)}
              link={bulletin.bulletinPDF?.url || "#"}
            />
          ))
        ) : (
          <p className="text-darkBlue py-8 text-center">
            No articles were published in {selectedYear}.
          </p>
        )}
      </div>
    </>
  );
};

export default FilterableArticleList;
