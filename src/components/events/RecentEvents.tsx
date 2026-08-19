"use client";
import React, { useState } from "react";
import { TiLocation } from "react-icons/ti";
import { IoCalendar } from "react-icons/io5";
import { LuClock9 } from "react-icons/lu";
import Image from "next/image";

interface Event {
  id: string;
  day: string;
  month: string;
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

    const formattedDay = startDate
      .toLocaleDateString("en-NZ", {
        day: "2-digit",
      })
      .replace(",", "");

    const formattedMonth = startDate
      .toLocaleDateString("en-NZ", {
        month: "short",
      })
      .replace(",", "");

    const formattedDate = startDate
      .toLocaleDateString("en-NZ", {
        day: "2-digit",
        month: "short",
      })
      .replace(",", "");

    const startTime = startDate.toLocaleTimeString("en-NZ", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return {
      id: dbEvent.id,
      day: formattedDay,
      month: formattedMonth,
      date: formattedDate,
      time: `${startTime}`,
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
            <div key={event.id} className="flex-shrink-0 lg:flex lg:flex-row lg:gap-[20px]">
              <div className="border-grey-100 grid w-full min-w-0 grid-cols-10 gap-4 rounded-[25px] border-2 bg-white p-2 lg:w-auto lg:flex-grow">
                <div className="col-span-2 flex min-w-0 items-center justify-center rounded-xl bg-blue-100 text-center">
                  <div className="text-darkBlue text-center text-7xl font-bold break-words">
                    <div>{event.day}</div>
                    <div>{event.month}</div>
                  </div>
                </div>

                <Image
                  src={event.photo}
                  alt={`${event.title} photo`}
                  className="col-span-2 h-full w-full min-w-0 object-contain"
                  width={200}
                  height={200}
                />

                <div className="col-span-6 lg:w-full">
                  <div className="">
                    <h1 className="text-[15px] font-bold lg:inline-block lg:min-w-0 lg:text-[30px] lg:whitespace-nowrap">
                      {event.title}
                    </h1>
                    <h1 className="flex items-center gap-2 text-lg text-gray-500">
                      {event.time} <span className="text-5xl">·</span> {event.location}
                    </h1>
                  </div>

                  <div className="text-sm">Introduction paragraph placeholder.</div>

                  <div className="mt-[14px] flex w-full gap-5">
                    <button
                      onClick={() => (window.location.href = "/events")}
                      className="mb-6 w-full min-w-0 transform cursor-pointer rounded-[20px] border bg-gradient-to-l from-[#005EAF] to-[#249AFF] px-2 text-center text-[10px] text-white transition duration-500 ease-in-out hover:scale-102 hover:cursor-pointer hover:border-gray-200 hover:from-blue-50 hover:to-blue-50 hover:text-[var(--darkBlue)] lg:px-4 lg:text-[15px]"
                    >
                      Register now
                    </button>

                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="mb-6 w-full min-w-0 transform cursor-pointer rounded-[20px] border border-gray-200 bg-blue-50 px-2 text-center text-[10px] text-[var(--darkBlue)] transition duration-500 ease-in-out hover:scale-102 hover:cursor-pointer hover:bg-gradient-to-l hover:from-[#005EAF] hover:to-[#249AFF] hover:text-white lg:px-4 lg:text-[15px]"
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
