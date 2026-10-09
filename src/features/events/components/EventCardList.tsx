"use client";
import React, { useEffect, useRef, useState } from "react";
import { VscClose } from "react-icons/vsc";
import Image from "next/image";
import type { Event as PayloadEvent } from "../../../../payload-types";
import EventCTA from "@/features/events/components/EventCTA";
import {
  cardDescriptionLines,
  getRegistrationStatus,
  LOGGED_OUT_VIEWER,
  NO_SIGNUPS,
  type RegistrationStatus,
} from "@/features/events/lib/registrationStatus";

interface Event {
  id: string;
  day: string;
  month: string;
  time: string;
  title: string;
  location: string;
  type: string;
  photo: string;
  description: string;
  application_link?: string | null;
  registrationStatus: RegistrationStatus;
}

interface EventCardListProps {
  events: PayloadEvent[];
  // Per-event CTA state, keyed by event id - from getEventRegistrationStatuses
  // on the server. Events missing from it fall back to the logged-out view.
  // Every caller should pass this; the fallback exists so a missing entry
  // degrades gracefully rather than crashing.
  registrationStatuses?: Record<string, RegistrationStatus>;
  emptyMessage?: string;
  isPast?: boolean;
}

// Full class names so Tailwind can see them.
const DESKTOP_LINE_CLAMP = { 1: "lg:line-clamp-1", 2: "lg:line-clamp-2", 3: "" } as const;

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
const MONTHS = MONTH_NAMES.map((month) => month.toUpperCase());

// Events happen in Auckland, and this component renders on both the server
// (UTC - no TZ is set) and the browser (whatever the viewer's timezone is).
// Reading dates with getHours()/getDate() would give different answers on
// each - a hydration mismatch, or the wrong day/time. So every date part is
// read in NZ time via formatToParts, which only returns numbers we then format
// ourselves (toLocaleDateString's wording also varies between JS engines).
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

const EventCardList = ({
  events: rawEvents,
  registrationStatuses = {},
  emptyMessage = "No upcoming events at this time.",
  isPast = false,
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

    // Compensate for the scrollbar that overflow:hidden removes, so the page
    // width doesn't shift when the modal opens/closes.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
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

  // Clicking anywhere on a card opens the event (the popup today; the event's
  // own page once #458 lands - change it here). Clicks on the card's own
  // links and buttons (Register, Learn More, Sign in) keep doing their thing,
  // and finishing a text selection (e.g. copying the address) doesn't count.
  // Mouse-only convenience: keyboard users get the same via the title button
  // (and Learn More), so the card itself isn't made a button around other
  // interactive elements.
  const handleCardClick = (clickEvent: React.MouseEvent, event: Event) => {
    if ((clickEvent.target as HTMLElement).closest("a, button")) return;
    if (window.getSelection()?.toString()) return;
    openSelectedEvent(event);
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
    const start = toNzParts(new Date(dbEvent.startDate));
    const end = toNzParts(new Date(dbEvent.endDate));

    const startTime = formatTime(start);
    const endTime = formatTime(end);
    // Same-day events just show the end time; anything ending on a later day
    // says which day, so a multi-day event doesn't read as a few hours long.
    const endsSameDay =
      start.year === end.year && start.monthIndex === end.monthIndex && start.day === end.day;
    const endYear = end.year !== start.year ? ` ${end.year}` : "";
    const endLabel = endsSameDay
      ? endTime
      : `${end.day} ${MONTH_NAMES[end.monthIndex]}${endYear}, ${endTime}`;

    return {
      id: dbEvent.id,
      day: start.day.toString().padStart(2, "0"),
      month: MONTHS[start.monthIndex],
      time: `${startTime} - ${endLabel}`,
      title: dbEvent.event,
      location: dbEvent.location,
      type: "Event",
      photo:
        typeof dbEvent.image === "object" && dbEvent.image?.url
          ? dbEvent.image.url
          : "/assets/logos/uaic.webp",
      description: dbEvent.description,
      application_link: dbEvent.registrationLink,
      // The fallback never reads the clock (now: null) - this renders on both
      // server and client, and the two could disagree right at an event's
      // end time. `isPast` covers "concluded" instead.
      registrationStatus:
        registrationStatuses[dbEvent.id] ??
        (isPast
          ? "concluded"
          : getRegistrationStatus(dbEvent, LOGGED_OUT_VIEWER, NO_SIGNUPS, null)),
    };
  });

  if (events.length === 0) {
    return <div className="py-10 text-center text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className="mt-[20px] w-full text-center text-black lg:mt-[0px]">
      <div className="px-cozy lg:px-0">
        <div className="flex flex-col items-stretch gap-[36px] pt-[10px] text-left">
          {events.map((event: Event) => (
            <article
              key={event.id}
              onClick={(clickEvent) => handleCardClick(clickEvent, event)}
              className="group/card border-border duration-fast mx-auto flex w-full max-w-[1444.56px] flex-shrink-0 cursor-pointer flex-col gap-[20px] rounded-[24px] border bg-white p-[8px] shadow-[0_1px_4px_0_rgba(12,12,13,0.05),0_1px_4px_0_rgba(12,12,13,0.10)] transition-transform ease-in-out hover:-translate-y-[5px] lg:h-[clamp(226px,calc(20vw+21px),260px)] lg:flex-row lg:gap-[clamp(24px,calc(10vw-78px),39px)]"
            >
              <div className="gap-tight flex h-[190px] w-full flex-shrink-0 flex-row lg:h-[clamp(210px,calc(20vw+5px),244px)] lg:w-[clamp(428px,calc(40vw+18px),496px)]">
                <div className="bg-surface-faint py-comfortable text-primary flex h-full min-w-0 flex-1 flex-col items-center justify-center rounded-lg text-center lg:h-[clamp(210px,calc(20vw+5px),244px)] lg:w-[clamp(210px,calc(20vw+5px),244px)] lg:flex-none lg:py-0">
                  <span className="text-[52px] leading-[90%] font-extrabold tracking-[0px] lg:text-[clamp(80.85px,calc(7.7vw+1.925px),93.85px)] lg:leading-[90%]">
                    {event.day}
                  </span>
                  <span className="text-[34px] leading-[100%] font-bold tracking-[1.2px] uppercase lg:text-[clamp(56.5px,calc(5.38vw+1.4px),65.69px)] lg:leading-[112.5%] lg:tracking-[1.97px]">
                    {event.month}
                  </span>
                </div>

                <div className="relative min-w-0 flex-1 overflow-hidden rounded-lg lg:h-[clamp(210px,calc(20vw+5px),244px)] lg:w-[clamp(210px,calc(20vw+5px),244px)] lg:flex-none">
                  <Image
                    src={event.photo}
                    alt={`${event.title} photo`}
                    fill
                    sizes="(min-width: 1024px) 244px, 50vw"
                    className={`object-cover ${isPast ? "grayscale" : ""}`}
                  />
                </div>
              </div>

              <div
                className="bg-surface-muted duration-fast group-hover/card:bg-primary-light hidden h-[38px] w-[4px] flex-shrink-0 self-center rounded-[17px] transition-[height,background-color] ease-in-out group-hover/card:h-[175px] lg:block"
                aria-hidden="true"
              />

              <div className="px-tight flex min-w-0 flex-1 flex-col gap-[20px] pb-[8px] lg:h-[clamp(210px,calc(20vw+5px),244px)] lg:gap-[12px] lg:self-center lg:px-0 lg:pt-[clamp(0px,calc(8.5vw-87px),15px)] lg:pb-[clamp(0px,calc(8.5vw-87px),15px)]">
                <div className="min-w-0">
                  {/* One line each on desktop - the card is a fixed height there,
                      and a wrapping title or address pushes the CTA out of it. */}
                  <h2
                    title={event.title}
                    className="text-ink text-[24px] leading-[32px] font-semibold tracking-[0px] lg:text-[30px]"
                  >
                    {/* The keyboard way into the event details - every CTA
                        variant has one (the locked members-only CTA has no
                        Learn More), and the whole-card click is mouse-only.
                        The clamp sits on the inner span: a <button> lays out
                        as one unbreakable box, so clamping the <h2> or the
                        button itself wouldn't truncate anything. */}
                    <button
                      type="button"
                      onClick={() => openSelectedEvent(event)}
                      className="focus-visible:outline-primary block w-full cursor-pointer rounded-sm text-left underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                      <span className="lg:line-clamp-1">{event.title}</span>
                    </button>
                  </h2>
                  <p className="text-muted-foreground mt-[8px] text-[16px] leading-[18.75px] font-medium tracking-[0px] lg:line-clamp-1 lg:text-[20px] lg:leading-[24px]">
                    <span>{event.time}</span> • <span>{event.location}</span>
                  </p>
                </div>

                <p
                  className={`text-ink line-clamp-3 flex-shrink-0 text-[16px] leading-[25px] font-medium tracking-[0px] ${
                    DESKTOP_LINE_CLAMP[cardDescriptionLines(event.registrationStatus)]
                  }`}
                >
                  {event.description}
                </p>

                <div className="mt-auto w-full">
                  <EventCTA
                    status={event.registrationStatus}
                    eventId={event.id}
                    registrationLink={event.application_link}
                    onLearnMore={() => openSelectedEvent(event)}
                  />
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
            className={`z-modal duration-fast fixed inset-0 flex items-center justify-center overflow-hidden p-[clamp(24px,6vw,64px)] transition-[opacity,background-color,backdrop-filter] ease-in-out lg:p-[clamp(32px,4vw,64px)] ${
              isModalVisible
                ? "bg-black/20 opacity-100 backdrop-blur-md"
                : "bg-black/0 opacity-0 backdrop-blur-none"
            }`}
          >
            <div
              className="border-border relative flex max-h-[calc(100dvh-clamp(48px,12vw,128px))] w-full max-w-[clamp(320px,calc(100dvh-360px),640px)] overflow-hidden rounded-[24px] border bg-white p-[8px] text-left shadow-[0_1px_4px_0_rgba(12,12,13,0.05)] lg:h-auto lg:max-h-[calc(100dvh-clamp(64px,8vw,128px))] lg:min-h-[calc(var(--modal-media-size)+16px)] lg:max-w-[1244px]"
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
                className="text-muted-foreground duration-fast hover:text-primary absolute top-[clamp(14px,2vw,24px)] right-[clamp(14px,2vw,24px)] z-20 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-white/85 p-0 transition-[transform,color] ease-in-out hover:scale-[1.0667]"
                aria-label="Close"
              >
                <VscClose size={30} aria-hidden="true" />
              </button>

              <div className="flex min-h-0 w-full flex-auto flex-col items-stretch gap-[clamp(24px,4vw,36px)] overflow-y-auto overscroll-contain lg:min-h-[var(--modal-media-size)] lg:[scrollbar-width:none] lg:flex-row lg:items-center lg:gap-[clamp(28px,5vw,88px)] lg:overflow-x-hidden lg:overflow-y-auto lg:[&::-webkit-scrollbar]:hidden">
                <div className="relative mx-auto aspect-square w-full flex-shrink-0 overflow-hidden rounded-lg lg:mx-0 lg:h-[var(--modal-media-size)] lg:w-[var(--modal-media-size)]">
                  <Image
                    src={selectedEvent.photo}
                    alt={`${selectedEvent.title} photo`}
                    fill
                    sizes="(min-width: 1280px) 512px, (min-width: 1024px) 40vw, (min-width: 768px) 650px, calc(100vw - 48px)"
                    className={`object-cover ${isPast ? "grayscale" : ""}`}
                  />
                </div>

                <div
                  className="bg-primary-light h-[8px] w-[calc(100%-16px)] flex-shrink-0 self-center rounded-[32.66px] lg:h-[clamp(220px,30vw,340px)] lg:w-[8px]"
                  aria-hidden="true"
                />

                <div className="flex min-h-[clamp(260px,36dvh,320px)] w-full min-w-0 flex-col px-[clamp(8px,2vw,20px)] pb-[clamp(8px,2vw,20px)] lg:h-auto lg:min-h-[336px] lg:flex-1 lg:px-0 lg:pr-[clamp(8px,1.5vw,16px)] lg:pb-0">
                  <div className="gap-tight flex flex-shrink-0 flex-col pr-[48px]">
                    <p className="text-primary-light text-[18px] leading-[20px] font-bold whitespace-nowrap sm:text-[20px]">
                      Event Info
                    </p>
                    <h2 className="text-ink w-full text-[clamp(24px,4vw,30px)] leading-[32px] font-semibold">
                      {selectedEvent.title}
                    </h2>
                  </div>

                  <p className="[&::-webkit-scrollbar-thumb]:bg-surface-muted mt-[clamp(16px,2vw,25px)] h-[158px] w-full flex-none [scrollbar-width:thin] [scrollbar-color:var(--color-blue-200)_transparent] [scrollbar-gutter:stable] overflow-y-scroll pr-[8px] text-[16px] leading-[20px] font-normal text-black sm:text-[20px] sm:leading-[22.5px] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                    {selectedEvent.description}
                  </p>

                  {/* Same CTA as the card, so the modal can never offer a way
                      around what the card gates (e.g. a registration link on a
                      full or members-only event). No Learn More - this is it. */}
                  <div className="mt-auto w-full flex-shrink-0 pt-[clamp(24px,3vw,42px)]">
                    <EventCTA
                      status={selectedEvent.registrationStatus}
                      eventId={selectedEvent.id}
                      registrationLink={selectedEvent.application_link}
                      layout="panel"
                    />
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
