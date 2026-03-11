"use client";
import React, { useState } from "react";
import { TiLocation } from "react-icons/ti";
import { IoCalendar } from "react-icons/io5";
import { LuClock9 } from "react-icons/lu";
import Image from "next/image";

interface Event {
  id: string;
  date: string;
  time: string;
  title: string;
  location: string;
  type: string;
  photo: string;
  description: string;
}

interface RecentEventsProps {
  events: any[]; // Raw events from database
}

const RecentEvents = ({ events: rawEvents }: RecentEventsProps) => {
  const [selectedEvent, setSelectedEvent] = useState<null | Event>(null);

  // Transform database events to component format
  const events: Event[] = rawEvents.map((dbEvent) => {
    const startDate = new Date(dbEvent.startDate);
    const endDate = new Date(dbEvent.endDate);

    const formattedDate = startDate
      .toLocaleDateString("en-NZ", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(",", "");

    const startTime = startDate.toLocaleTimeString("en-NZ", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const endTime = endDate.toLocaleTimeString("en-NZ", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return {
      id: dbEvent.id,
      date: formattedDate,
      time: `${startTime} - ${endTime}`,
      title: dbEvent.event,
      location: dbEvent.location,
      type: "Event",
      photo: dbEvent.image?.url || "/assets/logos/uaic.webp",
      description: dbEvent.description,
    };
  });

  if (events.length === 0) {
    return <div className="py-10 text-center text-gray-500">No recent events to display.</div>;
  }

  return (
    <div className="mt-[20px] w-full text-center text-black lg:mt-[0px]">
      <div className="px-[16px] lg:px-0">
        <div className="flex h-[35em] flex-col items-stretch gap-[26px] overflow-y-auto text-left lg:h-[38em]">
          {events.map((event: Event) => (
            <div
              key={event.id}
              className="flex-shrink-0 lg:flex lg:h-[180px] lg:flex-row lg:gap-[20px]"
            >
              <div className="hidden flex-shrink-0 lg:block lg:h-full lg:w-1/7">
                <Image
                  src={event.photo}
                  alt={`${event.title} photo`}
                  className="h-full w-full rounded-3xl object-contain"
                  width={220}
                  height={220}
                />
              </div>

              <div className="border-grey-100 w-full rounded-[25px] border-2 bg-white lg:w-auto lg:flex-grow">
                <div className="lg:divide-grey-100 mt-6 px-6 lg:flex lg:divide-x lg:px-8">
                  <div className="min-w-0 lg:w-0 lg:flex-grow lg:pr-8">
                    <div className="border-grey-100 divide-grey-100 lg:py[3px] inline-flex divide-x rounded-[16px] border-2 py-[2px] text-[10px] lg:text-[14px]">
                      <div className="flex items-center gap-[6px] px-2">
                        <IoCalendar className="h-[15px] lg:h-[18px]" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-[6px] px-2">
                        <LuClock9 className="h-[15px] lg:h-[18px]" />
                        {event.time}
                      </div>
                    </div>

                    <div className="lg:w-full lg:overflow-hidden">
                      <div className="lg:overflow-x-auto">
                        <h1 className="py-[6px] text-[15px] font-bold lg:inline-block lg:min-w-0 lg:text-[30px] lg:whitespace-nowrap">
                          {event.title}
                        </h1>
                      </div>
                    </div>

                    <div className="flex gap-[4px] text-[10px] lg:text-[18px]">
                      <TiLocation className="h-[12px] lg:h-[25px]" />
                      {event.location}
                    </div>
                  </div>
                  <div className="lg:flex lg:w-auto lg:items-center lg:pl-8">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="mt-[14px] mb-6 w-full min-w-0 transform cursor-pointer rounded-[20px] border-2 px-2 py-[2px] text-center text-[10px] text-[var(--darkBlue)] transition duration-500 ease-in-out hover:scale-102 hover:cursor-pointer hover:bg-[var(--darkBlue)] hover:text-white lg:w-[140px] lg:px-4 lg:text-[15px]"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/20 px-4 backdrop-blur-md">
            <div className="relative w-full max-w-[600px] rounded-[25px] bg-white p-6 text-left">
              <div className="lg:flex">
                <div>
                  <div className="border-grey-100 divide-grey-100 inline-flex divide-x rounded-[16px] border-2 py-[2px] text-[10px]">
                    <div className="flex items-center gap-[6px] px-2">
                      <IoCalendar className="h-[15px]" />
                      {selectedEvent.date}
                    </div>
                    <div className="flex items-center gap-[6px] px-2">
                      <LuClock9 className="h-[15px]" />
                      {selectedEvent.time}
                    </div>
                  </div>
                  <h2 className="my-[5px] text-lg font-semibold">{selectedEvent.title}</h2>
                  <div className="flex items-center">
                    <div className="flex gap-[4px] text-[14px]">
                      <TiLocation className="h-[16px]" />
                      {selectedEvent.location}
                    </div>
                    <div className="pl-[4px]">
                      <span className="ml-3 inline-block rounded-[20px] border-3 border-[var(--darkBlue)] px-3 text-center text-[12px] text-[var(--darkBlue)]">
                        <strong>{selectedEvent.type}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:mr-10">
                  <Image
                    src={selectedEvent.photo}
                    alt={`${selectedEvent.title} photo`}
                    className="my-4 h-[140px] w-full rounded-3xl object-contain lg:mx-6"
                    width={140}
                    height={140}
                  />
                </div>
              </div>

              <p className="max-h-[120px] overflow-y-auto text-[12px]">
                {selectedEvent.description}
              </p>
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-2 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-[20px] font-bold text-gray-600 transition duration-300 ease-in-out hover:rounded-full hover:bg-[var(--darkBlue)] hover:text-white"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentEvents;
