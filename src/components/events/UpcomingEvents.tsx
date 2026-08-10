"use client";
import React, { useEffect, useRef, useState } from "react";
import { VscClose } from "react-icons/vsc";
import Image from "next/image";
import Link from "next/link";
import ArrowButton from "../ArrowButton";

interface Event {
  id: string;
  date: string;
  day: string;
  month: string;
  startTime: string;
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!selectedEvent) return;

    const animationFrame = window.requestAnimationFrame(() => setIsModalVisible(true));
    return () => window.cancelAnimationFrame(animationFrame);
  }, [selectedEvent]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openSelectedEvent = (event: Event) => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    setIsModalVisible(false);
    setSelectedEvent(event);
  };

  const closeSelectedEvent = () => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    setIsModalVisible(false);
    closeTimerRef.current = window.setTimeout(() => {
      setSelectedEvent(null);
      closeTimerRef.current = null;
    }, 200);
  };

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
      startTime: startTime.replace(/^0/, "").toUpperCase(),
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
        <div className="flex h-[35em] flex-col items-stretch gap-[36px] overflow-y-auto pt-[10px] text-left lg:h-[38em]">
          {events.map((event: Event) => (
            <article
              key={event.id}
              className="group/card mx-auto flex w-full max-w-[1444.56px] flex-shrink-0 flex-col gap-[20px] rounded-[24px] border border-[#DCE6F2] bg-white p-[8px] shadow-[0_1px_4px_0_rgba(12,12,13,0.05),0_1px_4px_0_rgba(12,12,13,0.10)] transition-transform duration-200 ease-in-out hover:-translate-y-[5px] lg:h-[260px] lg:flex-row lg:gap-[39px]"
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
                className="hidden h-[38px] w-[4px] flex-shrink-0 self-center rounded-[17px] bg-[#DCE6F2] transition-[height,background-color] duration-200 ease-in-out group-hover/card:h-[175px] group-hover/card:bg-[#249AFF] lg:block"
                aria-hidden="true"
              />

              <div className="flex min-w-0 flex-1 flex-col gap-[20px] px-[8px] pb-[8px] lg:h-[213px] lg:max-w-[635px] lg:self-center lg:px-0 lg:pb-0">
                <div className="min-w-0">
                  <h2 className="text-[24px] leading-[32px] font-semibold tracking-[0px] text-[#0B1A2B] lg:text-[30px]">
                    {event.title}
                  </h2>
                  <p className="mt-[8px] text-[16px] leading-[18.75px] font-medium tracking-[0px] text-[#6B6F8D] lg:text-[20px]">
                    <span>{event.startTime}</span> • <span>{event.location}</span>
                  </p>
                </div>

                <p className="line-clamp-3 text-[16px] leading-[25px] font-medium tracking-[0px] text-[#0B1A2B]">
                  {event.description}
                </p>

                <div className="mt-auto flex w-full flex-row gap-[24px]">
                  <Link
                    href={event.application_link}
                    className="group relative flex h-[27px] min-w-0 flex-1 flex-row items-center justify-center gap-[10px] overflow-hidden rounded-[100px] border border-transparent bg-[#EFF4FA] px-[12px] py-[4px] text-[16px] leading-[100%] font-semibold tracking-[0px] text-white transition-colors duration-200 hover:border-[#DCE6F2] hover:text-[#005EAF]"
                  >
                    <span className="absolute inset-0 rounded-[100px] bg-gradient-to-r from-[#249AFF] to-[#005EAF] transition-opacity duration-200 group-hover:opacity-0" />
                    <span className="relative z-10">Register Now</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => openSelectedEvent(event)}
                    className="group relative flex h-[27px] min-w-0 flex-1 flex-row items-center justify-center gap-[10px] overflow-hidden rounded-[100px] border border-[#DCE6F2] bg-gradient-to-r from-[#249AFF] to-[#005EAF] px-[12px] py-[4px] text-[16px] leading-[100%] font-semibold tracking-[0px] text-[#005EAF] transition-colors duration-200 hover:cursor-pointer hover:border-transparent hover:text-white"
                  >
                    <span className="absolute inset-0 rounded-[100px] bg-[#EFF4FA] transition-opacity duration-200 group-hover:opacity-0" />
                    <span className="relative z-10">Learn More</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {selectedEvent && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedEvent.title} event details`}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeSelectedEvent();
            }}
            className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-[opacity,background-color,backdrop-filter] duration-200 ease-in-out ${
              isModalVisible
                ? "bg-black/20 opacity-100 backdrop-blur-md"
                : "bg-black/0 opacity-0 backdrop-blur-none"
            }`}
          >
            <div className="relative flex max-h-[calc(100vh-32px)] w-full max-w-[1244px] flex-col justify-between gap-[24px] overflow-y-auto rounded-[24px] border border-[#DCE6F2] bg-white pt-[8px] pr-[24px] pb-[8px] pl-[8px] text-left shadow-[0_1px_4px_0_rgba(12,12,13,0.05)] lg:h-[527.56px] lg:flex-row lg:items-center lg:gap-0 lg:overflow-hidden">
              <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden rounded-[16px] lg:h-[511.56px] lg:w-[511.56px]">
                <Image
                  src={selectedEvent.photo}
                  alt={`${selectedEvent.title} photo`}
                  fill
                  sizes="(min-width: 1024px) 512px, calc(100vw - 32px)"
                  className="object-cover"
                />
              </div>

              <div
                className="h-[8px] w-full flex-shrink-0 rounded-[32.66px] bg-[#249AFF] lg:h-[340px] lg:w-[8px]"
                aria-hidden="true"
              />

              <div className="relative flex min-h-[200px] w-full flex-row items-center gap-[28px] lg:h-[480px] lg:w-[512px] lg:flex-shrink-0">
                <button
                  type="button"
                  onClick={closeSelectedEvent}
                  className="absolute top-0 right-0 z-10 flex h-[30px] w-[30px] cursor-pointer items-center justify-center p-0 text-[#6B7A8D] transition-[transform,color] duration-200 ease-in-out hover:scale-[1.0667] hover:text-[#005EAF]"
                  aria-label="Close"
                >
                  <VscClose size={30} aria-hidden="true" />
                </button>
                <div className="flex flex-col gap-[42px]">
                  <div className="flex flex-col gap-[25px]">
                    <div className="flex flex-col gap-[8px]">
                      <p className="h-[20px] w-[95px] text-[20px] leading-[20px] font-bold tracking-[0px] text-[#249AFF]">
                        Event Info
                      </p>
                      <h2 className="h-[64px] w-full text-[30px] leading-[32px] font-semibold tracking-[0px] text-[#0B1A2B] lg:w-[512px]">
                        {selectedEvent.title}
                      </h2>
                    </div>
                    <p className="h-[158px] w-full overflow-y-auto text-[20px] leading-[22.5px] font-normal tracking-[0px] text-black lg:w-[512px]">
                      {selectedEvent.description}
                    </p>
                  </div>
                  <ArrowButton text="Complete Registration" link={selectedEvent.application_link} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
