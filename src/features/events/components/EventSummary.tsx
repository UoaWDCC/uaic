import type { Event } from "../../../../payload-types";
import { formatEventDate } from "../lib/formatEventDate";

type EventSummaryProps = {
  event: Pick<Event, "event" | "startDate" | "endDate" | "location">;
  className?: string;
};

// Compact event summary (date badge + title + "time • location") for places
// that need a short reference to an event, e.g. the top of the registration
// card. Not to be confused with PageHeader, which is the full-page
// kicker/title/description block.
const EventSummary = ({ event, className = "" }: EventSummaryProps) => {
  // Dates are formatted in Auckland time (see formatEventDate). An invalid
  // start drops the badge and time; an invalid end shows just the start time.
  const startDate = new Date(event.startDate);
  const formatted = Number.isNaN(startDate.getTime()) ? null : formatEventDate(event);

  return (
    <div className={`flex items-center gap-4 lg:gap-5 ${className}`}>
      {formatted && (
        <time
          dateTime={startDate.toISOString()}
          className="bg-surface-faint text-primary flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-lg text-center lg:h-14 lg:w-14"
        >
          <span className="text-[16px] leading-none font-bold lg:text-[18px]">{formatted.day}</span>
          <span className="text-[12px] leading-none font-bold tracking-[0.4px] uppercase lg:text-[14px]">
            {formatted.month}
          </span>
        </time>
      )}

      <div className="min-w-0">
        <h2 className="text-ink text-[14px] leading-[1.3] font-semibold lg:text-[16px]">
          {event.event}
        </h2>
        <p className="text-muted-foreground text-[14px] leading-[1.3] font-medium lg:text-[16px]">
          {formatted ? (
            <>
              {formatted.timeLabel}
              <span aria-hidden> • </span>
              {event.location}
            </>
          ) : (
            event.location
          )}
        </p>
      </div>
    </div>
  );
};

export default EventSummary;
