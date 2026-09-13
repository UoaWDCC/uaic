import * as ics from "ics";

export type Event = {
  startdate: Date;
  enddate: Date;
  title: string;
  description: string;
  location: string;
};

export function generateICS(event: Event) {
  const startdate: [number, number, number, number, number] = [
    event.startdate.getFullYear(),
    event.startdate.getMonth() + 1,
    event.startdate.getDate(),
    event.startdate.getHours(),
    event.startdate.getMinutes(),
  ];

  const enddate: [number, number, number, number, number] = [
    event.enddate.getFullYear(),
    event.enddate.getMonth() + 1,
    event.enddate.getDate(),
    event.enddate.getHours(),
    event.enddate.getMinutes(),
  ];

  const attributes = {
    start: startdate,
    end: enddate,
    title: event.title,
    description: event.description,
    location: event.location,
  };

  return ics.createEvent(attributes);
}
