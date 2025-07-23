"use client";
import React from "react";
import { LuExternalLink } from "react-icons/lu";
import { GoBook } from "react-icons/go";

interface Article {
  issue: number;
  title: string;
  image: string;
}

const articles: Article[] = [
  {
    issue: 76,
    title: "A House of Cards: The History of Fletcher Building",
    image: "/assets/article2.png",
  },
  {
    issue: 78,
    title: "Measuring Up? New Zealand’s Standardised Testing Debate",
    image: "/assets/article1.png",
  },
  {
    issue: 77,
    title: "A House of Cards: The History of Fletcher Building",
    image: "/assets/article2.png",
  },
];

const FeaturedArticles = () => {
  return (
    <div className="bg-[var(--background)] shadow-lg lg:shadow-none rounded-[2rem] p-4 max-w-[70%] lg:max-w-[1000px] sm:max-w-md mx-auto mt-40 mb-10">
      
      {/* Mobile View */}
      <div className="block lg:hidden">
        <h2 className="text-center text-lg font-semibold text-[var(--darkBlue)] my-2">
          Featured Articles
        </h2>

        <div className="space-y-3 my-4">
          {articles.map((article) => (
            <div
              key={article.issue}
              className="relative rounded-xl overflow-hidden h-25 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={article.image}
                alt={article.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center px-3 hover:bg-opacity-60 transition-colors duration-300">
                <p className="text-xs text-white pb-2">Issue #{article.issue}</p>
                <p className="text-sm font-semibold text-white leading-tight">
                  {article.title}
                </p>
              </div>
              <div className="absolute bottom-2 right-2 text-white text-xl">
                <GoBook size={25}/>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
            <button className="w-[80%] bg-[var(--darkBlue)] text-white font-semibold rounded-full my-1 py-2 text-center transition-all duration-300 hover:bg-opacity-90 hover:shadow-md hover:scale-105">
            View All
            </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex lg:gap-6">
        
        {/* Sidebar */}
        <div className="w-1/3 bg-[var(--background)] shadow-lg rounded-[2rem] p-6 flex flex-col items-start">
            <h2 className="text-3xl font-semibold text-[var(--darkBlue)] mt-15">Featured</h2>
            <h2 className="text-3xl font-semibold text-[var(--darkBlue)] mb-6">Articles</h2>
            <p className="text-sm text-[var(--darkBlue)] mb-6">Want to see more?</p>
            <button className="bg-[var(--darkBlue)] text-white font-semibold rounded-full py-2 px-6 transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg hover:scale-105">
                View All
            </button>

        </div>

        {/* Article Previews */}
        <div className="w-2/3 flex flex-col gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className={`flex h-30 bg-[var(--lightBlue)] overflow-hidden gap-x-4 ${
                index === 1 ? "flex-row-reverse" : ""
              } hover:scale-105 transition-transform duration-300`}
            >
              {/* Article Image and Text */}
              <div className="relative flex-[2]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="object-cover w-full h-full rounded-xl"
                />
                <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center px-4 rounded-xl hover:bg-opacity-60 transition-colors duration-300">
                  <div className="w-[90%]">
                    <p className="text-sm lg:text-base text-white pb-2">
                      Issue #{article.issue}
                    </p>
                    <p className="text-base lg:text-lg font-semibold text-white leading-tight">
                      {article.title}
                    </p>
                  </div>
                  <div className="absolute bottom-2 right-2 text-white text-xl">
                    <GoBook size={25} />
                  </div>
                </div>
              </div>

              {/* Read More Button */}
              <div className="w-28 aspect-square flex items-center justify-center bg-[var(--darkBlue)] text-white text-base lg:text-lg font-semibold rounded-xl p-2 relative hover:bg-opacity-80 transition-colors duration-300">
                <span>Read More</span>
                <LuExternalLink className="w-6 h-6 absolute bottom-2 right-2" size={25}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticles;
