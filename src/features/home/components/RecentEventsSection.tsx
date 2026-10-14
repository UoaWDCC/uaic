import EventsSection from "@/features/home/components/EventsSection";
import { getRecentEvents } from "@/features/events/data/getEvents";
import { getEventRegistrationStatuses } from "@/features/events/data/getEventRegistrationStatuses";

const RecentEventsSection = async () => {
  const recentEvents = await getRecentEvents(2);
  const registrationStatuses = await getEventRegistrationStatuses(recentEvents);

  return (
    <EventsSection
      events={recentEvents}
      registrationStatuses={registrationStatuses}
      subtitle="Recent"
      title="Events and Workshops"
    />
  );
};

export default RecentEventsSection;
