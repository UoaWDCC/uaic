import EventsSection from "@/components/EventsSection";
import { getRecentEvents } from "@/features/users/data/getEvents";

const RecentEventsSection = async () => {
  const recentEvents = await getRecentEvents(2);

  return <EventsSection events={recentEvents} subtitle="Recent" title="Events and Workshops" />;
};

export default RecentEventsSection;
