import EventsSection from "@/features/home/components/EventsSection";
import { getUpcomingEvents } from "@/features/users/data/getEvents";

const UpcomingEventsSection = async () => {
  const upcomingEvents = await getUpcomingEvents();

  return <EventsSection events={upcomingEvents} />;
};

export default UpcomingEventsSection;
