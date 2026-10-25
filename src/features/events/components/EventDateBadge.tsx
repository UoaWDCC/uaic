import type { Event } from "../../../../payload-types";
import { formatEventDate } from "../lib/formatEventDate";

interface EventDateBadgeProps {
  event: Pick<Event, "startDate" | "endDate">;
  // Sets the badge's font-size; everything inside is sized in em from it.
  className?: string;
}

// The start date over the top-left of an event's image. Hidden from screen
// readers since the date row beside it already says the same thing.
const EventDateBadge = ({ event, className = "" }: EventDateBadgeProps) => {
  const { day, month } = formatEventDate(event);

  return (
    <div
      aria-hidden="true"
      className={`text-primary absolute top-2 left-2 flex h-[3.6em] w-[3.6em] flex-col items-center justify-center rounded-sm bg-white text-center font-bold shadow-[0_1px_4px_0_rgba(12,12,13,0.10)] ${className}`}
    >
      <span className="text-[1.4em] leading-none">{day}</span>
      <span className="text-[0.9em] leading-tight">{month}</span>
    </div>
  );
};

export default EventDateBadge;
