"use client";
import React from "react";

interface Article {
    issue: number;
    title: string;
    image: string;
}

const articles: Article[] = [
    {
      issue: 76,
      title: "A House of Cards: The History of Fletcher Building",
      image: "/images/fletcher-building.jpg",
    },
    {
      issue: 78,
      title: "Measuring Up? New Zealand’s Standardised Testing Debate",
      image: "/images/testing-debate.jpg",
    },
    {
      issue: 76,
      title: "A House of Cards: The History of Fletcher Building",
      image: "/images/fletcher-building.jpg",
    },
  ];
  

const FeaturedArticles = () => {
    return (
        <div className="bg-[#fff] rounded-[2rem] p-4 max-w-[80%] sm:max-w-md mx-auto mt-40 mb-10">
        <h2 className="text-center text-lg font-semibold text-[#145CA9] my-2">
          Featured Articles
        </h2>
  
        <div className="space-y-3 my-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="relative rounded-xl overflow-hidden h-25"
            >
              <img
                src={article.image}
                alt={article.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center px-3">
                <p className="text-xs text-white pb-2">Issue #{article.issue}</p>
                <p className="text-sm font-semibold text-white leading-tight">
                  {article.title}
                </p>
              </div>
              <div className="absolute bottom-2 right-2 text-white text-xl">
                <img src="/assets/Read.png" alt="read icon" />
              </div>
            </div>
          ))}
        </div>
  
        <div className="mt-4 flex justify-center">
            <button className="w-[80%] bg-[#145CA9] text-white font-semibold rounded-full my-1 py-2 text-center">
                View All
            </button>
        </div>


      </div>
    );
};
  
  export default FeaturedArticles;