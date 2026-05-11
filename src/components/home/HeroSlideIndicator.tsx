"use client";

import React from "react";

interface HeroSlideIndicatorProps {
  current: number;
  total: number;
  onSelect: (index: number) => void;
  className?: string;
}

const HeroSlideIndicator: React.FC<HeroSlideIndicatorProps> = ({
  current,
  total,
  onSelect,
  className = "",
}) => {
  const slides = Array.from({ length: Math.max(total, 1) }, (_, i) => i);

  return (
    <div className={className}>
      <div className="relative flex items-center justify-center gap-4 lg:justify-between lg:gap-2">
        <div className="hidden text-sm font-medium text-white/50 lg:block 2xl:text-xl">
          {String(current + 1).padStart(2, "0")}
        </div>

        <div className="hidden flex-1 border-t border-white lg:block" />

        <div className="flex items-center gap-1">
          {slides.map((i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1 w-1 rounded-full transition-transform duration-150 2xl:h-1.5 2xl:w-1.5 ${
                current === i ? "scale-150 bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlideIndicator;
