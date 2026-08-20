"use client";
import React, { useEffect, useRef, useState } from "react";
import { VscClose } from "react-icons/vsc";
import Image from "next/image";
import Link from "next/link";
import type { Event as PayloadEvent } from "../../../payload-types";
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
  application_link?: string | null;
}

interface EventCardListProps {
  events: PayloadEvent[];
  emptyMessage?: string;
}

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// toLocaleDateString/toLocaleTimeString aren't guaranteed to return identical
// strings across JS engines (e.g. Node/V8 vs Safari's JavaScriptCore), which
// causes SSR/CSR hydration mismatches since this component renders on both.
const formatTime = (date: Date) => {
  const hours24 = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${minutes} ${period}`;
};

const EventCardList = ({
  events: rawEvents,
  emptyMessage = "No upcoming events at this time.",
}: EventCardListProps) => {
  const [selectedEvent, setSelectedEvent] = useState<null | Event>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!selectedEvent) return;

    const animationFrame = window.requestAnimationFrame(() => setIsModalVisible(true));
    return () => window.cancelAnimationFrame(animationFrame);
  }, [selectedEvent]);

  useEffect(() => {
    if (!selectedEvent) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
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

    const startTime = formatTime(startDate);
    const endTime = formatTime(endDate);

    return {
      id: dbEvent.id,
      date: formattedDate,
      day: startDate.toLocaleDateString("en-NZ", { day: "2-digit" }),
      month: MONTHS[startDate.getMonth()],
      startTime,
      time: `${startTime} - ${endTime}`,
      title: dbEvent.event,
      location: dbEvent.location,
      type: "Event",
      photo:
        typeof dbEvent.image === "object" && dbEvent.image?.url
          ? dbEvent.image.url
          : "/assets/logos/uaic.webp",
      description: dbEvent.description,
      application_link: dbEvent.registrationLink,
    };
  });

  if (events.length === 0) {
    return <div className="py-10 text-center text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className="mt-[20px] w-full text-center text-black lg:mt-[0px]">
      <div className="px-[16px] lg:px-0">
        <div className="flex flex-col items-stretch gap-[36px] pt-[10px] text-left">
          {events.map((event: Event) => (
            <article
              key={event.id}
              className="group/card mx-auto flex w-full max-w-[1444.56px] flex-shrink-0 flex-col gap-[20px] rounded-[24px] border border-[#DCE6F2] bg-white p-[8px] shadow-[0_1px_4px_0_rgba(12,12,13,0.05),0_1px_4px_0_rgba(12,12,13,0.10)] transition-transform duration-200 ease-in-out hover:-translate-y-[5px] lg:h-[clamp(226px,calc(20vw+21px),260px)] lg:flex-row lg:gap-[clamp(24px,calc(10vw-78px),39px)]"
            >
              <div className="flex h-[190px] w-full flex-shrink-0 flex-row gap-[8px] lg:h-[clamp(210px,calc(20vw+5px),244px)] lg:w-[clamp(428px,calc(40vw+18px),496px)]">
                <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-center rounded-[16px] bg-[#EFF4FA] py-[24px] text-center text-[#145BA7] lg:h-[clamp(210px,calc(20vw+5px),244px)] lg:w-[clamp(210px,calc(20vw+5px),244px)] lg:flex-none lg:py-0">
                  <span className="text-[52px] leading-[90%] font-extrabold tracking-[0px] lg:text-[clamp(80.85px,calc(7.7vw+1.925px),93.85px)] lg:leading-[90%]">
                    {event.day}
                  </span>
                  <span className="text-[34px] leading-[100%] font-bold tracking-[1.2px] uppercase lg:text-[clamp(56.5px,calc(5.38vw+1.4px),65.69px)] lg:leading-[112.5%] lg:tracking-[1.97px]">
                    {event.month}
                  </span>
                </div>

                <div className="relative min-w-0 flex-1 overflow-hidden rounded-[16px] lg:h-[clamp(210px,calc(20vw+5px),244px)] lg:w-[clamp(210px,calc(20vw+5px),244px)] lg:flex-none">
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

              <div className="flex min-w-0 flex-1 flex-col gap-[20px] px-[8px] pb-[8px] lg:h-[clamp(210px,calc(20vw+5px),244px)] lg:self-center lg:px-0 lg:pt-[clamp(0px,calc(8.5vw-87px),15px)] lg:pb-[clamp(0px,calc(8.5vw-87px),15px)]">
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

                <div className="mt-auto flex w-full flex-row items-stretch gap-[24px]">
                  {event.application_link ? (
                    <Link
                      href={event.application_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex min-h-[27px] min-w-0 flex-1 flex-row items-center justify-center gap-[10px] overflow-hidden rounded-[100px] border border-transparent bg-[#EFF4FA] px-[12px] py-[4px] text-[16px] leading-[100%] font-semibold tracking-[0px] text-white transition-colors duration-200 hover:border-[#DCE6F2] hover:text-[#005EAF]"
                    >
                      <span className="absolute inset-0 rounded-[100px] bg-gradient-to-r from-[#249AFF] to-[#005EAF] transition-opacity duration-200 group-hover:opacity-0" />
                      <span className="relative z-10 font-[500] whitespace-nowrap">
                        Register Now
                      </span>
                    </Link>
                  ) : (
                    <span className="flex min-h-[27px] min-w-0 flex-1 cursor-not-allowed items-center justify-center rounded-[100px] bg-[#DCE6F2] px-[12px] py-[4px] text-[16px] leading-[18px] font-medium text-[#6B6F8D]">
                      <span className="max-w-full min-w-0 text-center break-words">
                        Registration unavailable
                      </span>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => openSelectedEvent(event)}
                    className="group relative flex min-h-[27px] min-w-0 flex-1 flex-row items-center justify-center gap-[10px] overflow-hidden rounded-[100px] border border-[#DCE6F2] bg-[#EFF4FA] px-[12px] py-[4px] text-[16px] leading-[100%] font-semibold tracking-[0px] text-[#005EAF] transition-colors duration-200 hover:cursor-pointer hover:border-transparent hover:text-white"
                  >
                    <span className="pointer-events-none absolute -inset-px rounded-[inherit] bg-gradient-to-r from-[#249AFF] to-[#005EAF] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    <span className="relative z-10 font-[500] whitespace-nowrap">Learn More</span>
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
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-[clamp(24px,6vw,64px)] transition-[opacity,background-color,backdrop-filter] duration-200 ease-in-out lg:p-[clamp(32px,4vw,64px)] ${
              isModalVisible
                ? "bg-black/20 opacity-100 backdrop-blur-md"
                : "bg-black/0 opacity-0 backdrop-blur-none"
            }`}
          >
            <div
              className="relative flex max-h-[calc(100dvh-clamp(48px,12vw,128px))] w-full max-w-[clamp(320px,calc(100dvh-360px),640px)] overflow-hidden rounded-[24px] border border-[#DCE6F2] bg-white p-[8px] text-left shadow-[0_1px_4px_0_rgba(12,12,13,0.05)] lg:h-auto lg:max-h-[calc(100dvh-clamp(64px,8vw,128px))] lg:min-h-[calc(var(--modal-media-size)+16px)] lg:max-w-[1244px]"
              style={
                {
                  "--modal-media-size":
                    "clamp(280px, min(40vw, calc(100dvh - clamp(96px, 12vw, 176px))), 511.56px)",
                } as React.CSSProperties
              }
            >
              <button
                type="button"
                onClick={closeSelectedEvent}
                className="absolute top-[clamp(14px,2vw,24px)] right-[clamp(14px,2vw,24px)] z-20 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-white/85 p-0 text-[#6B7A8D] transition-[transform,color] duration-200 ease-in-out hover:scale-[1.0667] hover:text-[#005EAF]"
                aria-label="Close"
              >
                <VscClose size={30} aria-hidden="true" />
              </button>

              <div className="flex min-h-0 w-full flex-auto flex-col items-stretch gap-[clamp(24px,4vw,36px)] overflow-y-auto overscroll-contain lg:min-h-[var(--modal-media-size)] lg:flex-row lg:items-center lg:gap-[clamp(28px,5vw,88px)] lg:overflow-x-hidden lg:overflow-y-auto lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden">
                <div className="relative mx-auto aspect-square w-full flex-shrink-0 overflow-hidden rounded-[16px] lg:mx-0 lg:h-[var(--modal-media-size)] lg:w-[var(--modal-media-size)]">
                  <Image
                    src={selectedEvent.photo}
                    alt={`${selectedEvent.title} photo`}
                    fill
                    sizes="(min-width: 1280px) 512px, (min-width: 1024px) 40vw, (min-width: 768px) 650px, calc(100vw - 48px)"
                    className="object-cover"
                  />
                </div>

                <div
                  className="h-[8px] w-[calc(100%-16px)] flex-shrink-0 self-center rounded-[32.66px] bg-[#249AFF] lg:h-[clamp(220px,30vw,340px)] lg:w-[8px]"
                  aria-hidden="true"
                />

                <div className="flex min-h-[clamp(260px,36dvh,320px)] w-full min-w-0 flex-col px-[clamp(8px,2vw,20px)] pb-[clamp(8px,2vw,20px)] lg:h-auto lg:min-h-[336px] lg:flex-1 lg:px-0 lg:pr-[clamp(8px,1.5vw,16px)] lg:pb-0">
                  <div className="flex flex-shrink-0 flex-col gap-[8px] pr-[48px]">
                    <p className="text-[18px] leading-[20px] font-bold whitespace-nowrap text-[#249AFF] sm:text-[20px]">
                      Event Info
                    </p>
                    <h2 className="w-full text-[clamp(24px,4vw,30px)] leading-[32px] font-semibold text-[#0B1A2B]">
                      {selectedEvent.title}
                    </h2>
                  </div>

                  <p className="mt-[clamp(16px,2vw,25px)] h-[158px] w-full flex-none overflow-y-scroll pr-[8px] text-[16px] leading-[20px] font-normal text-black [scrollbar-color:#DCE6F2_transparent] [scrollbar-gutter:stable] [scrollbar-width:thin] sm:text-[20px] sm:leading-[22.5px] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#DCE6F2] [&::-webkit-scrollbar-track]:bg-transparent">
                    {selectedEvent.description}
                  </p>

                  <div className="mt-auto w-full flex-shrink-0 pt-[clamp(24px,3vw,42px)]">
                    {selectedEvent.application_link ? (
                      <ArrowButton
                        text="Complete Registration"
                        link={selectedEvent.application_link}
                        fullWidth
                        openInNewTab
                      />
                    ) : (
                      <div className="flex h-[37px] w-full cursor-not-allowed items-center justify-center rounded-full bg-[#DCE6F2] text-sm font-medium text-[#6B6F8D] sm:h-[51px] sm:text-[20px]">
                        Registration unavailable
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCardList;
