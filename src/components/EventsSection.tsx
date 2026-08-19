import React from "react";
import EventCardList from "@/components/events/EventCardList";
import ArrowButton from "./ArrowButton";
import type { Event } from "../../payload-types";

interface EventsSectionProps {
  events: Event[];
  subtitle?: string;
  title?: string;
}

const EventsSection = ({
  events,
  subtitle = "Upcoming",
  title = "Events & Workshops",
}: EventsSectionProps) => {
  return (
    <div className="my-[200px] flex flex-col items-center gap-[36px] px-[16px] lg:px-[120px]">
      <div className="flex w-full flex-col gap-[20px]">
        <hr className="h-[2px] w-full border-0 bg-[#DCE6F2]" />
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col gap-[8px]">
            <h1 className="text-[20px] leading-[20px] font-bold tracking-[0px] text-[#249AFF]">
              {subtitle}
            </h1>
            <h1 className="text-[38px] leading-[34px] font-bold tracking-[0px] text-[#0B1A2B]">
              {title}
            </h1>
          </div>
          <ArrowButton text="View All Events" link="/events" />
        </div>
      </div>

      <EventCardList events={events} />
    </div>
  );
};

export default EventsSection;
