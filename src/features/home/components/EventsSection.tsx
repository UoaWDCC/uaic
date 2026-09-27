import React from "react";
import EventCardList from "@/features/events/components/EventCardList";
import ArrowButton from "@/components/ArrowButton";
import type { Event } from "../../../../payload-types";

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
    <div className="px-cozy my-[200px] flex flex-col items-center gap-[36px] lg:px-[120px]">
      <div className="flex w-full flex-col gap-[20px]">
        <hr className="bg-surface-muted h-[2px] w-full border-0" />
        <div className="flex w-full flex-row items-center justify-between">
          <div className="gap-tight flex flex-col">
            <h1 className="text-primary-light text-[20px] leading-[20px] font-bold tracking-[0px]">
              {subtitle}
            </h1>
            <h1 className="text-ink text-[38px] leading-[34px] font-bold tracking-[0px]">
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
