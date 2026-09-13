"use client";

import React from "react";
import { GoBook } from "react-icons/go";
import Link from "next/link";

type ArticleListItemProps = {
  issueNumber: number;
  date: number[];
  link: string;
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ArticleListItem: React.FC<ArticleListItemProps> = ({ issueNumber, date, link }) => {
  return (
    <Link href={link} target="_blank">
      <div className="text-darkBlue hover:bg-lightBlue l grid h-[37px] max-h-[37px] min-h-[37px] w-full cursor-pointer grid-cols-[2fr_3fr_0.5fr] items-center overflow-hidden rounded-xl bg-white px-6 transition-colors duration-200 lg:h-[97px] lg:max-h-[97px] lg:min-h-[97px] lg:rounded-4xl lg:px-10">
        <h2 className="text-sm font-bold lg:text-2xl">Issue #{issueNumber}</h2>
        <p className="text-sm lg:text-xl">{`${date[0]} ${monthNames[date[1] - 1]} ${date[2]}`}</p>
        <GoBook className="max-h-full object-contain" size={25} />
      </div>
    </Link>
  );
};

export default ArticleListItem;
