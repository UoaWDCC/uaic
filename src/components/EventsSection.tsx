"use client";
import React, { useState } from "react";
import RecentEvents from "@/components/events/RecentEvents";
import UpcomingEvents from "@/components/events/UpcomingEvents";

interface EventsSectionProps {
  upcomingEvents: any[];
  recentEvents: any[];
}

const EventsSection = ({ upcomingEvents, recentEvents }: EventsSectionProps) => {
  const [selected, setSelected] = useState("upcoming");

  return (
    <div className="mt-[200px] flex flex-col items-center gap-6 bg-[radial-gradient(circle,_var(--darkBlue)_0%,_white_42%)] px-[16px] lg:px-[120px]">
      <div className="mt-[80px] flex w-fit rounded-full bg-gradient-to-r from-white to-white">
        <button
          onClick={() => setSelected("upcoming")}
          className={`rounded-full px-6 py-2 font-medium transition-all duration-600 hover:cursor-pointer ${selected === "upcoming" ? "bg-[var(--darkBlue)] text-white" : "bg-white text-black"} `}
        >
          Upcoming Events
        </button>
        <button
          onClick={() => setSelected("recent")}
          className={`rounded-full px-6 py-2 font-medium transition-all duration-600 hover:cursor-pointer ${selected === "recent" ? "bg-[var(--darkBlue)] text-white" : "bg-white text-black"}`}
        >
          Recent Events
        </button>
      </div>

      {/* Conditional Rendering */}
      <div className="w-full">
        {selected === "upcoming" ? (
          <UpcomingEvents events={upcomingEvents} />
        ) : (
          <RecentEvents events={recentEvents} />
        )}
      </div>
    </div>
  );
};

export default EventsSection;
