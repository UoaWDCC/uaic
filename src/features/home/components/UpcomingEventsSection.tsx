import EventsSection from "@/features/home/components/EventsSection";
import { getUpcomingEvents } from "@/features/events/data/getEvents";
import { getEventRegistrationStatuses } from "@/features/events/data/getEventRegistrationStatuses";

const UpcomingEventsSection = async () => {
  const upcomingEvents = await getUpcomingEvents();
  const registrationStatuses = await getEventRegistrationStatuses(upcomingEvents);

  return <EventsSection events={upcomingEvents} registrationStatuses={registrationStatuses} />;
};

export default UpcomingEventsSection;
