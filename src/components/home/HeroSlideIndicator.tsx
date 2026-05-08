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
      <div className="relative">
        <div className="absolute top-1/2 right-6 left-6 hidden -translate-y-1/2 border-t border-white sm:block" />

        <div className="relative flex items-center justify-center sm:justify-between">
          <div className="hidden text-sm font-medium text-white/50 sm:block">
            {String(current + 1).padStart(2, "0")}
          </div>

          <div className="flex items-center gap-1">
            {slides.map((i) => (
              <button
                key={i}
                onClick={() => onSelect(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1 w-1 rounded-full transition-transform duration-150 ${
                  current === i ? "scale-150 bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlideIndicator;
