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

const formatTime = ({ hours, minutes }: { hours: number; minutes: number }) => {
  const period = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export const formatEventDate = (event: Pick<Event, "startDate" | "endDate">) => {
  const start = toNzParts(new Date(event.startDate));
  const end = toNzParts(new Date(event.endDate));
  const startTime = formatTime(start);
  const endTime = formatTime(end);
  // Include the end date for multi-day events, and the year when it changes.
  const endsSameDay =
    start.year === end.year && start.monthIndex === end.monthIndex && start.day === end.day;
  const endYear = end.year !== start.year ? ` ${end.year}` : "";
  const endLabel = endsSameDay
    ? endTime
    : `${end.day} ${MONTH_NAMES[end.monthIndex]}${endYear}, ${endTime}`;
  const time = `${startTime} - ${endLabel}`;

  return {
    day: start.day.toString().padStart(2, "0"),
    month: MONTH_NAMES[start.monthIndex].toUpperCase(),
    time,
    // The details design shows just the start time for a same-day event.
    // Keep the range when it spans days so the end date isn't lost.
    detailsTime: endsSameDay ? startTime : time,
  };
};
