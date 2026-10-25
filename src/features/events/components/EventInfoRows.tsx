import { LuCalendar, LuClock, LuMapPin } from "react-icons/lu";
import type { Event } from "../../../../payload-types";
import { formatEventDate } from "../lib/formatEventDate";

interface EventInfoRowsProps {
  event: Pick<Event, "startDate" | "endDate" | "location">;
  className?: string;
}

// Sized in --event-unit like EventCTA, so the details page and
// event cards can scale the rows with their own layout (1px by default).
const EventInfoRows = ({ event, className = "" }: EventInfoRowsProps) => {
  const { dateLabel, timeLabel } = formatEventDate(event);
  const rows = [
    {
      label: "Date",
      Icon: LuCalendar,
      value: <time dateTime={event.startDate}>{dateLabel}</time>,
    },
    { label: "Time", Icon: LuClock, value: timeLabel },
    { label: "Location", Icon: LuMapPin, value: event.location },
  ];

  return (
    <dl
      className={`text-ink flex flex-col gap-[calc(12*var(--event-unit))] text-[calc(20*var(--event-unit))] leading-[1.3] ${className}`}
    >
      {rows.map(({ label, Icon, value }) => (
        <div key={label} className="flex items-start gap-[calc(12*var(--event-unit))]">
          <dt className="text-primary-light shrink-0">
            <Icon
              className="h-[calc(26*var(--event-unit))] w-[calc(26*var(--event-unit))]"
              aria-hidden="true"
            />
            <span className="sr-only">{label}</span>
          </dt>
          <dd className="min-w-0 [overflow-wrap:anywhere]">{value}</dd>
        </div>
      ))}
    </dl>
  );
};

export default EventInfoRows;
