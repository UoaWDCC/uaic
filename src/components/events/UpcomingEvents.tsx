"use client";
import React, { useState } from "react";
import { TiLocation } from "react-icons/ti";
import { IoCalendar } from "react-icons/io5";
import { LuClock9 } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

interface Event {
  id: string;
  date: string;
  day: string;
  month: string;
  time: string;
  title: string;
  location: string;
  type: string;
  photo: string;
  description: string;
  application_link: string;
}

interface UpcomingEventsProps {
  events: any[]; // Raw events from database
}

const UpcomingEvents = ({ events: rawEvents }: UpcomingEventsProps) => {
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
      day: startDate.toLocaleDateString("en-NZ", { day: "2-digit" }),
      month: startDate.toLocaleDateString("en-NZ", { month: "short" }).toUpperCase(),
      time: `${startTime} - ${endTime}`,
      title: dbEvent.event,
      location: dbEvent.location,
      type: "Event",
      photo: dbEvent.image?.url || "/assets/logos/uaic.webp",
      description: dbEvent.description,
      application_link: `/events/${dbEvent.id}`,
    };
  });

  if (events.length === 0) {
    return <div className="py-10 text-center text-gray-500">No upcoming events at this time.</div>;
  }

  return (
    <div className="mt-[20px] w-full text-center text-black lg:mt-[0px]">
      <div className="px-[16px] lg:px-0">
        <div className="flex h-[35em] flex-col items-stretch gap-[32px] overflow-y-auto text-left lg:h-[38em]">
          {events.map((event: Event) => (
            <article
              key={event.id}
              className="mx-auto flex w-full max-w-[1444.56px] flex-shrink-0 flex-col gap-[20px] rounded-[24px] border border-[#DCE6F2] bg-white p-[8px] shadow-[0_1px_4px_0_rgba(12,12,13,0.05),0_1px_4px_0_rgba(12,12,13,0.10)] lg:h-[260px] lg:flex-row lg:gap-[39px]"
            >
              <div className="flex h-[190px] w-full flex-shrink-0 flex-row gap-[8px] lg:h-[244px] lg:w-[495.56px]">
                <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-center rounded-[16px] bg-[#EFF4FA] py-[24px] text-center text-[#145BA7] lg:h-[244px] lg:w-[244px] lg:flex-none lg:py-[37.54px]">
                  <span className="text-[52px] leading-[90%] font-extrabold tracking-[0px] lg:text-[93.85px] lg:leading-[84.46px]">
                    {event.day}
                  </span>
                  <span className="text-[34px] leading-[100%] font-bold tracking-[1.2px] uppercase lg:text-[65.69px] lg:leading-[73.9px] lg:tracking-[1.97px]">
                    {event.month}
                  </span>
                </div>

                <div className="relative min-w-0 flex-1 overflow-hidden rounded-[16px]">
                  <Image
                    src={event.photo}
                    alt={`${event.title} photo`}
                    fill
                    sizes="(min-width: 1024px) 244px, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div
                className="hidden h-[38px] w-[4px] flex-shrink-0 self-center rounded-[17px] bg-[#DCE6F2] lg:block"
                aria-hidden="true"
              />

              <div className="flex min-w-0 flex-1 flex-col gap-[20px] px-[8px] pb-[8px] lg:h-[213px] lg:max-w-[635px] lg:self-center lg:px-0 lg:pb-0">
                <div className="min-w-0">
                  <h2 className="text-[22px] leading-[120%] font-bold text-[#0B1A2B] lg:text-[30px]">
                    {event.title}
                  </h2>
                  <p className="mt-[8px] text-[14px] leading-[140%] font-medium text-[#6B7A8D] lg:text-[16px]">
                    {event.time} · {event.location}
                  </p>
                </div>

                <p className="line-clamp-3 text-[14px] leading-[150%] font-normal text-[#0B1A2B] lg:text-[16px]">
                  {event.description}
                </p>

                <div className="mt-auto flex w-full flex-row gap-[20px]">
                  <Link
                    href={event.application_link}
                    className="flex h-[32px] min-w-0 flex-1 items-center justify-center rounded-[100px] bg-[#0099E5] px-[16px] text-[14px] font-semibold text-white transition hover:opacity-80"
                  >
                    Register Now
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    className="h-[32px] min-w-0 flex-1 rounded-[100px] bg-[#EFF5FB] px-[16px] text-[14px] font-semibold text-[#005EAF] transition hover:cursor-pointer hover:opacity-80"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 backdrop-blur-md">
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
              <div className="flex justify-end">
                <Link
                  href={selectedEvent.application_link}
                  className="mt-[14px] flex min-h-[32px] w-[130px] transform items-center justify-center rounded-[20px] border-2 bg-[var(--darkBlue)] px-4 py-[4px] text-center text-[12px] text-white transition duration-500 ease-in-out hover:scale-102 hover:opacity-80 lg:text-[15px]"
                >
                  Register Now
                </Link>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-2 right-3 flex h-8 w-8 items-center justify-center rounded-md text-[20px] font-bold text-gray-600 transition duration-300 ease-in-out hover:rounded-full hover:bg-[var(--darkBlue)] hover:text-white"
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

export default UpcomingEvents;
