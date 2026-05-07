"use client";

import React from "react";

interface HeroCarouselProps {
  images: string[];
  current: number;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ images, current }) => {
  const fallback = "/assets/home/bull-cow-bg.webp";
  const safeImages = images.length > 0 ? images : [fallback];

  return (
    <>
      <div className="absolute inset-0">
        {safeImages.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 z-[-2] bg-cover bg-[center_80%] bg-no-repeat transition-opacity duration-700 ease-in-out lg:bg-[center_3%] ${current === i ? "opacity-100" : "opacity-0"}`}
            style={{ backgroundImage: `url('${img}')` }}
          />
        ))}

        <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-black/5 via-black/3 to-black/10" />
      </div>
    </>
  );
};

export default HeroCarousel;
