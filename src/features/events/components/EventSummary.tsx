import type { Event } from "../../../../payload-types";

type EventSummaryProps = {
  event: Pick<Event, "event" | "startDate" | "endDate" | "location">;
  className?: string;
};

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// Pinned to Pacific/Auckland so the badge and time match NZ local time no
// matter which timezone the server renders in (our deployment runs in UTC).
// Parts are assembled by hand so the output doesn't depend on each JS
// engine's locale formatting, which can cause SSR/CSR hydration mismatches.
const nzDateTimeFormat = new Intl.DateTimeFormat("en-NZ", {
  timeZone: "Pacific/Auckland",
  day: "2-digit",
  // Numeric month + our own labels, since en-NZ abbreviates September as "Sept".
  month: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hourCycle: "h23",
});

const getNzParts = (date: Date) => {
  const parts = Object.fromEntries(
    nzDateTimeFormat.formatToParts(date).map(({ type, value }) => [type, value]),
  );
  return {
    day: parts.day,
    month: MONTHS[Number(parts.month) - 1],
    hours: Number(parts.hour),
    minutes: parts.minute,
  };
};

const formatTime = ({ hours, minutes }: { hours: number; minutes: string }) => {
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes} ${period}`;
};

// Compact event summary (date badge + title + "time • location") for places
// that need a short reference to an event, e.g. the top of the registration
// card. Not to be confused with PageHeader, which is the full-page
// kicker/title/description block.
const EventSummary = ({ event, className = "" }: EventSummaryProps) => {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const hasValidStart = !isNaN(startDate.getTime());
  const hasValidEnd = !isNaN(endDate.getTime());

  const start = hasValidStart ? getNzParts(startDate) : null;
  const time = start
    ? hasValidEnd
      ? `${formatTime(start)} - ${formatTime(getNzParts(endDate))}`
      : formatTime(start)
    : null;

  return (
    <div className={`flex items-center gap-4 lg:gap-5 ${className}`}>
      {start && (
        <time
          dateTime={startDate.toISOString()}
          className="bg-surface-faint text-primary flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-lg text-center lg:h-14 lg:w-14"
        >
          <span className="text-[16px] leading-none font-bold lg:text-[18px]">{start.day}</span>
          <span className="text-[12px] leading-none font-bold tracking-[0.4px] uppercase lg:text-[14px]">
            {start.month}
          </span>
        </time>
      )}

      <div className="min-w-0">
        <h2 className="text-ink text-[14px] leading-[1.3] font-semibold lg:text-[16px]">
          {event.event}
        </h2>
        <p className="text-muted-foreground text-[14px] leading-[1.3] font-medium lg:text-[16px]">
          {time ? (
            <>
              {time}
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
