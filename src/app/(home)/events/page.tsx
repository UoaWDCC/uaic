import React from "react";
import EventsPageContent from "@/features/events/components/EventsPageContent";
import { getUpcomingEvents, getRecentEvents } from "@/features/events/data/getEvents";
import { getEventRegistrationStatuses } from "@/features/events/data/getEventRegistrationStatuses";

const page = async () => {
  // Fetch data server-side - the two lists don't depend on each other.
  const [upcomingEvents, pastEvents] = await Promise.all([getUpcomingEvents(), getRecentEvents()]);
  const registrationStatuses = await getEventRegistrationStatuses([
    ...upcomingEvents,
    ...pastEvents,
  ]);

  return (
    <div className="flex w-full flex-col items-center">
      <EventsPageContent
        upcomingEvents={upcomingEvents}
        pastEvents={pastEvents}
        registrationStatuses={registrationStatuses}
      />
    </div>
  );
};

export default page;
