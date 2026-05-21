"use client";
import Link from "next/link";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";

const NewestArticle = () => {
  const buttonClasses = `
    group inline-flex w-full flex-row items-center justify-start gap-3 whitespace-nowrap py-2.5
    rounded-full bg-gradient-to-l from-[#005eaf] to-[#249AFF]
    pr-4.5 pl-3.5 py-2 text-sm text-white max-sm:pl-4.5 sm:text-xl
    2xl:py-2 2xl:pr-8 2xl:pl-3 2xl:gap-2 2xl:text-[18px]
    transition-colors duration-200
    hover:bg-white hover:bg-none hover:text-[#005eaf]
  `;

  const articles = [
    { title: "The Hidden Cost of Emotional Investing", date: "Nov 3", read: "5 Min" },
    { title: "The Psychology of Market Fluctuations", date: "Nov 10", read: "7 Min" },
    { title: "Overcoming Investment Anxiety", date: "Nov 17", read: "6 Min" },
    { title: "Understanding Behavioral Finance", date: "Nov 24", read: "8 Min" },
  ]; //create an array of objects.

  return (
    <div className="ps-5 pe-5 lg:ps-30 lg:pe-30">
      <p className="text-darkBlue pb-1 text-3xl font-semibold lg:pb-3">Newest Articles</p>
      <div className="grid grid-rows-2 flex-col gap-2 lg:grid-cols-6 lg:gap-10">
        <div className="relative flex flex-col overflow-hidden rounded-2xl ps-2 pb-2 lg:col-span-4 lg:min-h-[520px] lg:ps-5 lg:pe-5 lg:pb-5">
          <Image
            src={"/assets/home/newestArticleSampleImage.jpg"}
            alt={""}
            fill
            className="z-0 hover:scale-105"
          ></Image>
          <div className="z-10 mt-auto w-fit rounded-2xl bg-gradient-to-r from-[#44a6fc] to-sky-600 ps-2 pe-2 text-white hover:bg-gradient-to-r">
            Category Name
          </div>
          <p className="z-10 pt-1 pb-2 text-base text-white lg:text-3xl">
            Market Signals: Long-Term Investing vs Short-Term Prediction Market
          </p>
          <p className="z-10 pb-3 text-xs text-white">May 10 · 5 Min read</p>
        </div>
        <div className="pt-5 lg:col-span-2 lg:pt-0">
          {articles.slice(0, 4).map((articles, index) => (
            <div className="grid grid-cols-3 gap-1 pb-5 lg:gap-5" key={index}>
              <div className="h-13 w-auto rounded-2xl bg-[url('/assets/home/sidebarListSampleImage.jpg')] bg-cover bg-center bg-no-repeat lg:h-23 xl:h-30"></div>

              <div className="col-span-2">
                <p className="pb-1 text-[15px] font-semibold text-black hover:text-[#2d67d2] lg:pb-3 lg:text-2xl">
                  {articles.title}
                </p>
                <p className="text-[9px] text-[#778189] lg:text-base">
                  {articles.date} · {articles.read} Read
                </p>
              </div>
            </div>
          ))}

          <Link href="" className={buttonClasses}>
            <span className="relative flex size-5 items-center justify-center 2xl:size-9">
              <GoArrowUpRight className="absolute size-8 transition-transform duration-200 group-hover:rotate-45 2xl:size-8" />
            </span>
            <span className="text-xs lg:text-lg">View All Articles</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewestArticle;
