"use client";

import React, { useRef, useEffect, useState } from "react";
import { Bulletin, getBulletins } from "@/features/bulletins/data/getBulletins";
import Button from "../Button";
import BulletinCard from "./BulletinCard";

const CARD_WIDTH = 320; // px
const CARD_GAP = 16; // px
const CLONE_COUNT = 3; // More clones for smoother infinite illusion
const JUMP_DELAY = 250; // ms - how long to wait before instant jump

const BulletinSlider = () => {
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [currentIndex, setCurrentIndex] = useState(CLONE_COUNT);
  const [isJumping, setIsJumping] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getBulletins({ number: 10 }).then((data) => {
      setBulletins(data);
      setCurrentIndex(CLONE_COUNT); // Start at first real card (after clones)
    });
  }, []);

  // Prepare the cards with clones
  const cards = [
    ...bulletins.slice(-CLONE_COUNT), // clones from end
    ...bulletins,
    ...bulletins.slice(0, CLONE_COUNT), // clones from start
  ];

  // Center the current card
  useEffect(() => {
    if (!sliderRef.current || cards.length === 0) return;
    const slider = sliderRef.current;
    const containerWidth = slider.offsetWidth;
    const scrollTo =
      (CARD_WIDTH + CARD_GAP) * currentIndex -
      (containerWidth / 2 - CARD_WIDTH / 2);
    slider.scrollTo({
      left: scrollTo,
      behavior: isJumping ? "auto" : "smooth",
    });
    setIsJumping(false);
  }, [currentIndex, cards.length, isJumping]);

  // Handle infinite illusion with delay before instant jump
  useEffect(() => {
    if (cards.length === 0) return;
    let timeout: NodeJS.Timeout | null = null;
    // If at the left clones, jump to the real cards at the end after a delay
    if (currentIndex < CLONE_COUNT) {
      timeout = setTimeout(() => {
        setIsJumping(true);
        setCurrentIndex(bulletins.length + (currentIndex % bulletins.length));
      }, JUMP_DELAY);
    }
    // If at the right clones, jump to the real cards at the start after a delay
    else if (currentIndex >= bulletins.length + CLONE_COUNT) {
      timeout = setTimeout(() => {
        setIsJumping(true);
        setCurrentIndex(
          CLONE_COUNT + (currentIndex - (bulletins.length + CLONE_COUNT))
        );
      }, JUMP_DELAY);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentIndex, bulletins.length, cards.length]);

  const goLeft = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const goRight = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // The real index in the bulletins array
  const realIndex =
    (currentIndex - CLONE_COUNT + bulletins.length) % bulletins.length;

  return (
    <div className="flex flex-col relative w-full rounded-3xl overflow-hidden bg-white items-center gap-[14px]">
      <h1 className="text-darkBlue text-xl font-bold lg:text-2xl mt-6">
        Featured Articles
      </h1>

      {/* Slider */}
      <div className="relative w-full flex items-center">
        <div
          ref={sliderRef}
          className="flex flex-row gap-4 overflow-x-scroll pb-6 scroll-smooth min-w-0 w-full"
          style={{ scrollBehavior: "smooth" }}
        >
          {cards.map((b, i) => (
            <div
              key={b.id ? `${b.id}-${i}` : i}
              className={`min-w-[320px] transition-transform duration-300 ${
                i === currentIndex ? "scale-105 z-10" : "scale-100 opacity-70"
              } ${i % 2 === 1 ? "pt-6" : ""}`}
            >
              <BulletinCard
                issueNumber={b.issueNumber}
                title={b.title}
                description={b.description || ""}
                imageSrc={b.bulletinCover?.url || ""}
                pdfUrl={b.bulletinPDF?.url || "#"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-6 mt-2">
        <button
          className="bg-white rounded-full shadow p-2 hover:bg-gray-100"
          onClick={goLeft}
          aria-label="Scroll left"
          type="button"
        >
          <span aria-hidden>←</span>
        </button>
        <div className="flex flex-col gap-1.5">
          <Button link={bulletins[realIndex]?.bulletinPDF.url || "#"}>
            Read More
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              const el = document.getElementById("all-articles");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            View All
          </Button>
        </div>
        <button
          className="bg-white rounded-full shadow p-2 hover:bg-gray-100"
          onClick={goRight}
          aria-label="Scroll right"
          type="button"
        >
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
};

export default BulletinSlider;
