"use client";

import React, { useState, useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import ArrowButton from "@/components/ArrowButton";
import HeroCarousel from "./HeroCarousel";
import HeroSlideIndicator from "./HeroSlideIndicator";
import { useSession } from "@/lib/auth-client";

interface HomePageProps {
  images: string[];
}

const HomePage: React.FC<HomePageProps> = ({ images }) => {
  const fallbackImage = "/assets/home/bull-cow-bg.webp";
  const safeImages = images.length > 0 ? images : [fallbackImage];
  const [current, setCurrent] = useState(0);
  const totalSlides = safeImages.length;
  const swiperRef = useRef<SwiperType | null>(null);
  const { data: session } = useSession();

  const handleSelect = (index: number) => {
    setCurrent(index);
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <div
      id="hero"
      className="duration-base relative -mt-[132px] h-[calc(100svh+132px)] min-h-[610px] w-full overflow-hidden transition-all lg:-mt-[131.75px] lg:h-[calc(100svh+131.75px)] lg:min-h-0"
    >
      <HeroCarousel
        images={safeImages}
        current={current}
        onSlideChange={setCurrent}
        swiperRef={swiperRef}
      />
      <div className="z-dropdown duration-base pointer-events-none absolute mx-auto mt-[235px] flex w-full flex-col items-center gap-[20px] px-[40px] text-center transition-all lg:mt-[235px] lg:items-start lg:gap-[85px] lg:px-[100px] lg:text-left">
        <h1 className="duration-base mx-[30px] text-[30px] leading-[34px] font-[700] tracking-[0px] text-white transition-all lg:mx-0 lg:text-[100px] lg:leading-[120px]">
          University Of Auckland
          <br />
          Investment Club
        </h1>

        <div className="duration-base flex w-full flex-col gap-14 transition-all lg:flex-row lg:gap-50">
          <h3 className="duration-base mx-[20px] text-[20px] leading-[24px] font-[350] tracking-[0px] text-white transition-all lg:mx-0 lg:max-w-lg lg:text-[16px] lg:leading-[100%] 2xl:max-w-4xl 2xl:text-[28px]">
            Founded in 2009 a student-run society. Welcoming members from all academic backgrounds
            and stages at the University of Auckland.
          </h3>

          <div className="duration-base pointer-events-auto mx-auto transition-all lg:mx-0 lg:ml-auto">
            {session ? (
              <ArrowButton text="Go To Dashboard" link="/dashboard" />
            ) : (
              <ArrowButton text="Become A Member" link="/login" />
            )}
          </div>
        </div>

        <HeroSlideIndicator
          className="duration-base pointer-events-auto mt-14 mb-10 w-full transition-all lg:mt-28 lg:mb-12"
          current={current}
          total={totalSlides}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};

export default HomePage;
