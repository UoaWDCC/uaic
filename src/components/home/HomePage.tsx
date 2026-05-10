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
    <div className="relative -mt-[132px] min-h-[610px] w-full overflow-x-hidden lg:-mt-[131.75px] lg:min-h-[676px]">
      <HeroCarousel
        images={safeImages}
        current={current}
        onSlideChange={setCurrent}
        swiperRef={swiperRef}
      />
      
      <div className="pointer-events-none relative z-10 mx-auto mt-[130px] flex w-full flex-col items-center gap-[20px] text-center lg:mt-[150px] lg:ml-[100px] lg:w-[1200px] lg:items-start lg:gap-[35px] lg:text-left">
        <h1 className="mx-[30px] text-[30px] leading-[34px] font-[700] tracking-[0px] text-white lg:mx-0 lg:text-[100px] lg:leading-[120px]">
          University Of Auckland
          <br />
          Investment Club
        </h1>

        <div className="flex flex-col gap-14 lg:flex-row lg:gap-50">
          <h3 className="mx-[20px] text-[20px] leading-[24px] font-[350] tracking-[0px] text-white lg:mx-0 lg:pr-[250px] lg:text-[16px] lg:leading-[15px]">
            Founded in 2009 a student-run society. Welcoming members from all academic backgrounds
            and stages at the University of Auckland.
          </h3>

          <div className="pointer-events-auto mx-auto h-[50px] w-[240px] lg:mx-0 lg:w-[320px]">
            <MemberSignupButton />
          </div>
        </div>

        <HeroSlideIndicator
          className="pointer-events-auto mt-14 w-full px-6 lg:mt-28 lg:px-0"
          current={current}
          total={totalSlides}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};

export default HomePage;
