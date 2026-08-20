import React from "react";
import EventsPageContent from "@/components/events/EventsPageContent";
import { getUpcomingEvents, getRecentEvents } from "@/features/users/data/getEvents";

const page = async () => {
  // Fetch data server-side
  const upcomingEvents = await getUpcomingEvents();
  const pastEvents = await getRecentEvents();

  return (
    <div className="flex w-full flex-col items-center">
      <EventsPageContent upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
    </div>
  );
};

export default page;
