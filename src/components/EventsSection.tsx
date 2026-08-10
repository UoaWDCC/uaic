import React from "react";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import ArrowButton from "./ArrowButton";

interface EventsSectionProps {
  upcomingEvents: any[];
}

const EventsSection = ({ upcomingEvents }: EventsSectionProps) => {
  return (
    <div className="mt-[200px] flex flex-col items-center gap-[36px] px-[16px] lg:px-[120px]">
      <div className="flex w-full flex-col gap-[20px]">
        <hr className="h-[2px] w-full border-0 bg-[#DCE6F2]" />
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col gap-[8px]">
            <h1 className="text-[20px] leading-[20px] font-bold tracking-[0px] text-[#249AFF]">
              Upcoming
            </h1>
            <h1 className="text-[38px] leading-[34px] font-bold tracking-[0px] text-[#0B1A2B]">
              Events &amp; Workshops
            </h1>
          </div>
          <ArrowButton text="View All Events" link="/events" />
        </div>
      </div>

      <UpcomingEvents events={upcomingEvents} />
    </div>
  );
};

export default EventsSection;
