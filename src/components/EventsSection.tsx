"use client";
import React, { useState } from "react";
import RecentEvents from "@/components/events/RecentEvents";
import UpcomingEvents from "@/components/events/UpcomingEvents";

const EventsSection = () => {
  const [selected, setSelected] = useState("upcoming");

  return (
    <div
      className="
      flex flex-col items-center 
      gap-6 mt-[200px]
      bg-[radial-gradient(circle,_var(--darkBlue)_0%,_white_42%)]
    "
    >
      <div className="flex w-fit rounded-full bg-gradient-to-r from-white to-white mt-[80px]">
        <button
          onClick={() =>
            selected === "recent"
              ? setSelected("upcoming")
              : setSelected("recent")
          }
          className={`
            px-6 py-2 
            rounded-full 
            transition-all duration-600 
            font-medium 
            ${
              selected === "upcoming"
                ? "bg-[var(--darkBlue)] text-white"
                : "text-black bg-white"
            }
          `}
        >
          Upcoming Events
        </button>
        <button
          onClick={() =>
            selected === "upcoming"
              ? setSelected("recent")
              : setSelected("upcoming")
          }
          className={`
            px-6 py-2 
            rounded-full 
            transition-all duration-600 
            font-medium 
            ${
              selected === "recent"
                ? "bg-[var(--darkBlue)] text-white"
                : "text-black bg-white"
            }`}
        >
          Recent Events
        </button>
      </div>

      {/* Conditional Rendering */}
      <div className="w-full">
        {selected === "upcoming" ? <UpcomingEvents /> : <RecentEvents />}
      </div>
    </div>
  );
};

export default EventsSection;
