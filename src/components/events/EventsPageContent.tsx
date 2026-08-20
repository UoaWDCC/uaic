"use client";

import { useMemo, useState } from "react";
import EventCardList from "@/components/events/EventCardList";
import EventsFilterBar from "@/components/events/EventsFilterBar";
import EventsHeader from "@/components/events/EventsHeader";
import type { Event as PayloadEvent } from "../../../payload-types";

export type EventsTab = "upcoming" | "past";

type EventsPageContentProps = {
  upcomingEvents: PayloadEvent[];
  pastEvents: PayloadEvent[];
};

const matchesQuery = (event: PayloadEvent, query: string) => {
  if (!query) return true;

  return [event.event, event.location, event.description]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .includes(query);
};

const EventsPageContent = ({ upcomingEvents, pastEvents }: EventsPageContentProps) => {
  const [activeTab, setActiveTab] = useState<EventsTab>("upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const events = activeTab === "upcoming" ? upcomingEvents : pastEvents;

    return events.filter((event) => matchesQuery(event, query));
  }, [activeTab, upcomingEvents, pastEvents, searchQuery]);

  return (
    <div className="w-full bg-[#F4F8FE]">
      <EventsHeader
        activeTab={activeTab}
        onToggleTab={() => setActiveTab((tab) => (tab === "upcoming" ? "past" : "upcoming"))}
      />

      <div className="flex w-full flex-col px-6 pt-10 pb-12 lg:px-16 lg:pt-8 lg:pb-20">
        <EventsFilterBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="mt-6 lg:mt-8">
          <EventCardList
            events={visibleEvents}
            isPast={activeTab === "past"}
            emptyMessage={
              activeTab === "upcoming"
                ? "No upcoming events at this time."
                : "No past events to display."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EventsPageContent;
