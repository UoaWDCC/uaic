"use client";
import type { MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Event as PayloadEvent } from "../../../../payload-types";
import EventCTA from "@/features/events/components/EventCTA";
import { formatEventDate } from "@/features/events/lib/formatEventDate";
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

const EventCardList = ({
  events: rawEvents,
  registrationStatuses = {},
  emptyMessage = "No upcoming events at this time.",
  isPast = false,
}: EventCardListProps) => {
  const router = useRouter();

  // Whole-card navigation is a mouse convenience. The title and Learn More
  // links provide keyboard access without nesting controls inside a link.
  // Keep the card's own actions and text selection independent.
  const handleCardClick = (clickEvent: MouseEvent, event: Event) => {
    if ((clickEvent.target as Element).closest("a, button")) return;
    if (window.getSelection()?.toString()) return;
    router.push(`/events/${event.id}`);
  };

  // Transform database events to component format
  const events: Event[] = rawEvents.map((dbEvent) => {
    return {
      id: dbEvent.id,
      ...formatEventDate(dbEvent),
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
                    <Link
                      href={`/events/${event.id}`}
                      className="focus-visible:outline-primary block w-full cursor-pointer rounded-sm text-left underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                      <span className="lg:line-clamp-1">{event.title}</span>
                    </Link>
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
                    learnMoreHref={`/events/${event.id}`}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCardList;
