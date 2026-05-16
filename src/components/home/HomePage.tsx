"use client";

import React, { useState, useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import MemberSignupButton from "../MemberSignupButton";
import HeroCarousel from "./HeroCarousel";
import HeroSlideIndicator from "./HeroSlideIndicator";

interface HomePageProps {
  images: string[];
}

const HomePage: React.FC<HomePageProps> = ({ images }) => {
  const fallbackImage = "/assets/home/bull-cow-bg.webp";
  const safeImages = images.length > 0 ? images : [fallbackImage];
  const [current, setCurrent] = useState(0);
  const totalSlides = safeImages.length;
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSelect = (index: number) => {
    setCurrent(index);
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <div className="relative -mt-[132px] min-h-[610px] w-full overflow-hidden transition-all duration-300 lg:-mt-[131.75px] lg:min-h-[676px] 2xl:min-h-[1280px]">
      <HeroCarousel
        images={safeImages}
        current={current}
        onSlideChange={setCurrent}
        swiperRef={swiperRef}
      />
      <div className="pointer-events-none absolute z-10 mx-auto mt-[130px] flex w-full flex-col items-center gap-[20px] px-[40px] text-center transition-all duration-300 lg:mt-[150px] lg:items-start lg:gap-[35px] lg:px-[100px] lg:text-left 2xl:mt-[180px] 2xl:gap-[70px] 2xl:px-[200px]">
        <h1 className="mx-[30px] text-[30px] leading-[34px] font-[700] tracking-[0px] text-white transition-all duration-300 lg:mx-0 lg:text-[100px] lg:leading-[120px] 2xl:text-[178px] 2xl:leading-[210px]">
          University Of Auckland
          <br />
          Investment Club
        </h1>

        <div className="flex w-full flex-col gap-14 transition-all duration-300 lg:flex-row lg:gap-50">
          <h3 className="mx-[20px] text-[20px] leading-[24px] font-[350] tracking-[0px] text-white transition-all duration-300 lg:mx-0 lg:max-w-lg lg:text-[16px] lg:leading-[100%] 2xl:max-w-4xl 2xl:text-[28px]">
            Founded in 2009 a student-run society. Welcoming members from all academic backgrounds
            and stages at the University of Auckland.
          </h3>

          <div className="pointer-events-auto mx-auto transition-all duration-300 lg:mx-0 lg:ml-auto">
            <MemberSignupButton />
          </div>
        </div>

        <HeroSlideIndicator
          className="pointer-events-auto mt-14 mb-10 w-full transition-all duration-300 lg:mt-28 lg:mb-12 2xl:mt-55 2xl:mb-24"
          current={current}
          total={totalSlides}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};

export default HomePage;
