import type { Event } from "../../../../payload-types";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Read every part in Auckland time so server and browser renders agree,
// regardless of their timezones or locale-specific date wording.
const NZ_DATE_PARTS = new Intl.DateTimeFormat("en-NZ", {
  timeZone: "Pacific/Auckland",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
});

const toNzParts = (date: Date) => {
  const parts = Object.fromEntries(
    NZ_DATE_PARTS.formatToParts(date).map(({ type, value }) => [type, Number(value)]),
  );
  return {
    year: parts.year,
    monthIndex: parts.month - 1,
    day: parts.day,
    hours: parts.hour,
    minutes: parts.minute,
  };
};

// The parts are already in Auckland time, so read the weekday back in UTC to
// avoid the runtime's own timezone shifting the day.
const formatDate = ({ year, monthIndex, day }: { year: number; monthIndex: number; day: number }) =>
  `${WEEKDAY_NAMES[new Date(Date.UTC(year, monthIndex, day)).getUTCDay()]} ${day} ${MONTH_NAMES[monthIndex]} ${year}`;

const formatTime = ({ hours, minutes }: { hours: number; minutes: number }) => {
  const period = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

// Callers check the start date is valid. An invalid end date (e.g. a
// half-entered CMS event) falls back to showing just the start.
export const formatEventDate = (event: Pick<Event, "startDate" | "endDate">) => {
  const start = toNzParts(new Date(event.startDate));
  const endDate = new Date(event.endDate);
  const end = Number.isNaN(endDate.getTime()) ? null : toNzParts(endDate);
  const startTime = formatTime(start);
  const endTime = end ? formatTime(end) : null;
  const isMultiDay =
    end !== null &&
    (start.year !== end.year || start.monthIndex !== end.monthIndex || start.day !== end.day);

  // The event card's single line: a multi-day event says which day it ends,
  // with the year only when it changes.
  const endYear = end && end.year !== start.year ? ` ${end.year}` : "";
  const endLabel =
    end && isMultiDay ? `${end.day} ${MONTH_NAMES[end.monthIndex]}${endYear}, ${endTime}` : endTime;

  return {
    time: endLabel ? `${startTime} - ${endLabel}` : startTime,
    // For the date badge on the event's image.
    day: start.day.toString().padStart(2, "0"),
    month: MONTH_NAMES[start.monthIndex].toUpperCase(),
    // Date and time get their own rows: always the full start date, plus the
    // end date for multi-day events.
    dateLabel: isMultiDay ? `${formatDate(start)} - ${formatDate(end)}` : formatDate(start),
    timeLabel: endTime ? `${startTime} - ${endTime}` : startTime,
  };
};
