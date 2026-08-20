"use client";

import { useState } from "react";
import ArrowButton from "@/components/ArrowButton";
import PageHeader from "@/components/PageHeader";

const EVENTS_DESCRIPTION =
  "Connect with the team behind New Zealand's sovereign wealth fund and gain firsthand insights into long-term investing, portfolio management, and the role the Fund plays in shaping New Zealand's financial future.";

type EventsTab = "upcoming" | "past";

// Toggle only swaps the header copy for now - it doesn't filter the events
// list yet, that lands once the event card component is ready.
const EventsHeader = () => {
  const [activeTab, setActiveTab] = useState<EventsTab>("upcoming");
  const isUpcoming = activeTab === "upcoming";

  return (
    <section className="w-full bg-[#F4F8FE]">
      <div className="flex w-full flex-col px-6 py-12 lg:px-16 lg:py-20">
        <PageHeader
          kicker={isUpcoming ? "Upcoming" : "Past"}
          title="Events & Workshops"
          description={EVENTS_DESCRIPTION}
          underline
          action={
            <ArrowButton
              text={isUpcoming ? "View Past Events" : "View Upcoming Events"}
              onClick={() => setActiveTab(isUpcoming ? "past" : "upcoming")}
            />
          }
        />
      </div>
    </section>
  );
};

export default EventsHeader;
