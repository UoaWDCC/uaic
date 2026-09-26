"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

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
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        speed={700}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="h-full w-full"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => onSlideChange(swiper.realIndex)}
      >
        {safeImages.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full">
              <Image
                src={img}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-[center_80%] lg:object-[center_3%]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Gradient overlay */}
      <div className="z-dropdown pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-black/3 to-black/10" />
    </div>
  );
};

export default HeroCarousel;
