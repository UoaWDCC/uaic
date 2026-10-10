type EventSummaryProps = {
  date: Date | string;
  title: string;
  time: string;
  location: string;
  className?: string;
};

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// Compact event summary (date badge + title + "time • location") for places
// that need a short reference to an event, e.g. the top of the registration
// card. Not to be confused with PageHeader, which is the full-page
// kicker/title/description block.
const EventSummary = ({ date, title, time, location, className = "" }: EventSummaryProps) => {
  const eventDate = new Date(date);
  // Built by hand rather than with toLocaleDateString, which isn't guaranteed
  // to return identical strings across JS engines and can cause SSR/CSR
  // hydration mismatches.
  const day = eventDate.getDate().toString().padStart(2, "0");
  const month = MONTHS[eventDate.getMonth()];

  return (
    <div className={`flex items-center gap-4 lg:gap-5 ${className}`}>
      <time
        dateTime={eventDate.toISOString()}
        className="bg-surface-faint text-primary flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-lg text-center lg:h-14 lg:w-14"
      >
        <span className="text-[16px] leading-none font-bold lg:text-[18px]">{day}</span>
        <span className="text-[12px] leading-none font-bold tracking-[0.4px] uppercase lg:text-[14px]">
          {month}
        </span>
      </time>

      <div className="min-w-0">
        <h2 className="text-ink text-[14px] leading-[1.3] font-semibold lg:text-[16px]">{title}</h2>
        <p className="text-muted-foreground text-[14px] leading-[1.3] font-medium lg:text-[16px]">
          <span>{time}</span> • <span>{location}</span>
        </p>
      </div>
    </div>
  );
};

export default EventSummary;
