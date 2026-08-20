import ArrowButton from "@/components/ArrowButton";
import PageHeader from "@/components/PageHeader";
import type { EventsTab } from "@/components/events/EventsPageContent";

const EVENTS_DESCRIPTION =
  "Connect with the team behind New Zealand's sovereign wealth fund and gain firsthand insights into long-term investing, portfolio management, and the role the Fund plays in shaping New Zealand's financial future.";

type EventsHeaderProps = {
  activeTab: EventsTab;
  onToggleTab: () => void;
};

const EventsHeader = ({ activeTab, onToggleTab }: EventsHeaderProps) => {
  const isUpcoming = activeTab === "upcoming";

  return (
    <section className="w-full bg-[#F4F8FE]">
      <div className="flex w-full flex-col px-6 pt-12 lg:px-16 lg:pt-20">
        <PageHeader
          kicker={isUpcoming ? "Upcoming" : "Past"}
          title="Events & Workshops"
          description={EVENTS_DESCRIPTION}
          action={
            <ArrowButton
              text={isUpcoming ? "View Past Events" : "View Upcoming Events"}
              onClick={onToggleTab}
            />
          }
        />
      </div>
    </section>
  );
};

export default EventsHeader;
