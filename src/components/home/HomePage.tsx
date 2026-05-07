"use client";

import React, { useEffect, useState } from "react";
import MemberSignupButton from "../MemberSignupButton";
import HeroCarousel from "./HeroCarousel";
import HeroSlideIndicator from "./HeroSlideIndicator";
import useSwipe from "./useSwipe";

const HomePage = () => {
  // Hardcoded local hero images for now. Later this can be replaced with Payload data.
  const images = [
    "/assets/home/heropic1.jpg",
    "/assets/home/heropic2.jpg",
    "/assets/home/heropic3.jpg",
  ];
  const [current, setCurrent] = useState(0);
  const totalSlides = images.length;

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % totalSlides), 5000);
    return () => clearInterval(t);
  }, [totalSlides]);

  const swipeHandlers = useSwipe({
    minSwipe: 50,
    onSwipeLeft: () => setCurrent((c) => (c + 1) % totalSlides),
    onSwipeRight: () => setCurrent((c) => (c - 1 + totalSlides) % totalSlides),
  });

  return (
    <>
      <div
        className="relative -mt-[132px] min-h-[610px] w-full overflow-x-hidden lg:-mt-[131.75px] lg:min-h-[676px]"
        {...swipeHandlers}
      >
        <HeroCarousel images={images} current={current} />

        <div className="relative mx-auto mt-[130px] flex w-full flex-col items-center gap-[20px] text-center lg:mt-[150px] lg:ml-[100px] lg:w-[1200px] lg:items-start lg:gap-[35px] lg:text-left">
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

            {/* Button inline, not absolute */}
            <div className="mx-auto h-[50px] w-[240px] lg:mx-0 lg:w-[320px]">
              <MemberSignupButton />
            </div>
          </div>

          <HeroSlideIndicator
            className="mt-14 w-full px-6 lg:mt-28 lg:px-0"
            current={current}
            total={totalSlides}
            onSelect={setCurrent}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
