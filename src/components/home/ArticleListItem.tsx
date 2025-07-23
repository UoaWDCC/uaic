"use client";

import React from "react";
import { GoBook } from "react-icons/go";

type ArticleListItemProps = {
  issueNumber: number;
  date: number[];
  link: string;
};

const openArticle = (link: string) => {
  if (link) {
    window.open(link, "_blank");
  }
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

const ArticleListItem: React.FC<ArticleListItemProps> = ({
  issueNumber,
  date,
  link,
}) => {
  return (
    <div
      onClick={() => openArticle(link)}
      className="
    bg-white 
    grid grid-cols-[2fr_3fr_0.5fr] items-center 
    text-darkBlue
    w-full
    hover:bg-lightBlue transition-colors duration-200 cursor-pointer
    
    rounded-xl
    h-[37px] lg:h-[97px]
    min-h-[37px] 
    max-h-[37px] 
    overflow-hidden               
    px-6 l
    
    lg:rounded-4xl 
    lg:px-10
    lg:max-h-[97px] lg:min-h-[97px]  
  "
    >
      <h2
        className="
        font-bold

        text-sm

        lg:text-2xl 
      "
      >
        Issue #{issueNumber}
      </h2>
      <p
        className="
        text-sm

        lg:text-xl
      "
      >
        {`${date[0]} ${monthNames[date[1] - 1]} ${date[2]}`}
      </p>
      <GoBook className="object-contain max-h-full" size={25}/>
    </div>
  );
};

export default ArticleListItem;
