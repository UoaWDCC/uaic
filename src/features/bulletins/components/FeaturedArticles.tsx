"use client";
import React from "react";
import { LuExternalLink } from "react-icons/lu";
import { GoBook } from "react-icons/go";
import Image from "next/image";

interface Article {
  issue: number;
  title: string;
  image: string;
}

const articles: Article[] = [
  {
    issue: 76,
    title: "A House of Cards: The History of Fletcher Building",
    image: "/assets/bulletins/article2.webp",
  },
  {
    issue: 78,
    title: "Measuring Up? New Zealand’s Standardised Testing Debate",
    image: "/assets/bulletins/article1.webp",
  },
  {
    issue: 77,
    title: "A House of Cards: The History of Fletcher Building",
    image: "/assets/bulletins/article2.webp",
  },
];

const FeaturedArticles = () => {
  return (
    <div className="mx-auto mt-40 mb-10 max-w-[70%] rounded-[2rem] bg-[var(--background)] p-4 shadow-lg sm:max-w-md lg:max-w-[1000px] lg:shadow-none">
      {/* Mobile View */}
      <div className="block lg:hidden">
        <h2 className="text-primary my-2 text-center text-lg font-semibold">Featured Articles</h2>

        <div className="my-4 space-y-3">
          {articles.map((article) => (
            <div
              key={article.issue}
              className="duration-base relative h-25 overflow-hidden rounded-xl transition-transform hover:scale-105"
            >
              <Image
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover"
              />
              <div className="bg-opacity-40 hover:bg-opacity-60 duration-base absolute inset-0 flex flex-col justify-center px-3 transition-colors">
                <p className="pb-2 text-xs text-white">Issue #{article.issue}</p>
                <p className="text-sm leading-tight font-semibold text-white">{article.title}</p>
              </div>
              <div className="absolute right-2 bottom-2 text-xl text-white">
                <GoBook size={25} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <button className="hover:bg-opacity-90 bg-primary duration-base my-1 w-[80%] rounded-full py-2 text-center font-semibold text-white transition-all hover:scale-105 hover:shadow-md">
            View All
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex lg:gap-6">
        {/* Sidebar */}
        <div className="flex w-1/3 flex-col items-start rounded-[2rem] bg-[var(--background)] p-6 shadow-lg">
          <h2 className="text-primary mt-15 text-3xl font-semibold">Featured</h2>
          <h2 className="text-primary mb-6 text-3xl font-semibold">Articles</h2>
          <p className="text-primary mb-6 text-sm">Want to see more?</p>
          <button className="hover:bg-opacity-90 bg-primary duration-base rounded-full px-6 py-2 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg">
            View All
          </button>
        </div>

        {/* Article Previews */}
        <div className="flex w-2/3 flex-col gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className={`bg-surface-faint flex h-30 gap-x-4 overflow-hidden ${
                index === 1 ? "flex-row-reverse" : ""
              } duration-base transition-transform hover:scale-105`}
            >
              {/* Article Image and Text */}
              <div className="relative flex-[2]">
                <Image
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full rounded-xl object-cover"
                />
                <div className="bg-opacity-40 hover:bg-opacity-60 duration-base absolute inset-0 flex flex-col justify-center rounded-xl px-4 transition-colors">
                  <div className="w-[90%]">
                    <p className="pb-2 text-sm text-white lg:text-base">Issue #{article.issue}</p>
                    <p className="text-base leading-tight font-semibold text-white lg:text-lg">
                      {article.title}
                    </p>
                  </div>
                  <div className="absolute right-2 bottom-2 text-xl text-white">
                    <GoBook size={25} />
                  </div>
                </div>
              </div>

              {/* Read More Button */}
              <div className="hover:bg-opacity-80 bg-primary duration-base relative flex aspect-square w-28 items-center justify-center rounded-xl p-2 text-base font-semibold text-white transition-colors lg:text-lg">
                <span>Read More</span>
                <LuExternalLink className="absolute right-2 bottom-2 h-6 w-6" size={25} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticles;
