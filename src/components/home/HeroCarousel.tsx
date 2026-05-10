"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

interface HeroCarouselProps {
  images: string[];
  current: number;
  onSlideChange: (index: number) => void;
  swiperRef: React.MutableRefObject<SwiperType | null>;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ images, onSlideChange, swiperRef }) => {
  const fallback = "/assets/home/bull-cow-bg.webp";
  const safeImages = images.length > 0 ? images : [fallback];

  return (
    <div className="absolute inset-0 z-0">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-full w-full"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => onSlideChange(swiper.realIndex)}
      >
        {safeImages.map((img, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-full w-full bg-cover bg-[center_80%] bg-no-repeat lg:bg-[center_3%]"
              style={{ backgroundImage: `url('${img}')` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/5 via-black/3 to-black/10" />
    </div>
  );
};

export default HeroCarousel;
