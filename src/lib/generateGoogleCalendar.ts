import { formatDate } from "./formatDate";
import { Event } from "./generateICS";

export function generateGoogleCalendar(event: Event) {
  const startDate = formatDate(event.startdate);
  const endDate = formatDate(event.enddate);
  const title = event.title;
  const description = event.description;
  const location = event.location;

  const url =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${startDate}/${endDate}` +
    `&details=${encodeURIComponent(description)}` +
    `&location=${encodeURIComponent(location)}`;

  //console.log("Generated Google Calendar URL:", url);
  return url;
}
