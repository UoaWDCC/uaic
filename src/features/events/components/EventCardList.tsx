"use client";
import type { MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Event } from "../../../../payload-types";
import ArrowLink from "@/features/events/components/ArrowLink";
import EventCTA from "@/features/events/components/EventCTA";
import EventDateBadge from "@/features/events/components/EventDateBadge";
import EventImage from "@/features/events/components/EventImage";
import EventInfoRows from "@/features/events/components/EventInfoRows";
import {
  getRegistrationStatus,
  LOGGED_OUT_VIEWER,
  NO_SIGNUPS,
  type RegistrationStatus,
} from "@/features/events/lib/registrationStatus";

interface EventCardListProps {
  events: Event[];
  // Per-event CTA state, keyed by event id - from getEventRegistrationStatuses
  // on the server. Events missing from it fall back to the logged-out view.
  // Every caller should pass this; the fallback exists so a missing entry
  // degrades gracefully rather than crashing.
  registrationStatuses?: Record<string, RegistrationStatus>;
  emptyMessage?: string;
  isPast?: boolean;
}

const EventCardList = ({
  events,
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

  // The fallback never reads the clock (now: null) - this renders on both
  // server and client, and the two could disagree right at an event's end
  // time. `isPast` covers "concluded" instead.
  const getStatus = (event: Event): RegistrationStatus =>
    registrationStatuses[event.id] ??
    (isPast ? "concluded" : getRegistrationStatus(event, LOGGED_OUT_VIEWER, NO_SIGNUPS, null));

  if (events.length === 0) {
    return <div className="py-10 text-center text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className="mt-[20px] w-full text-center text-black lg:mt-[0px]">
      <div className="px-cozy lg:px-0">
        <div className="flex flex-col items-stretch gap-[36px] pt-[10px] text-left">
          {events.map((event) => (
            <article
              key={event.id}
              onClick={(clickEvent) => handleCardClick(clickEvent, event)}
              className="group/card border-border duration-fast mx-auto flex w-full max-w-[1444.56px] flex-shrink-0 cursor-pointer flex-col gap-[20px] rounded-[24px] border bg-white p-[8px] shadow-[0_1px_4px_0_rgba(12,12,13,0.05),0_1px_4px_0_rgba(12,12,13,0.10)] transition-transform ease-in-out hover:-translate-y-[5px] lg:min-h-[348px] lg:flex-row lg:items-center lg:gap-[clamp(24px,calc(10vw-78px),39px)]"
            >
              {/* Stretches to the card's full height on desktop, so the image
                  fills the left side however tall the card is. */}
              <div className="relative h-[190px] w-full flex-shrink-0 overflow-hidden rounded-lg lg:h-auto lg:w-[clamp(300px,28vw,360px)] lg:self-stretch">
                <EventImage
                  image={event.image}
                  alt={`${event.event} photo`}
                  sizes="(min-width: 1024px) 360px, 100vw"
                  className={isPast ? "grayscale" : ""}
                />
                <EventDateBadge event={event} className="text-[20px]" />
              </div>

              <div
                className="bg-surface-muted duration-fast group-hover/card:bg-primary-light hidden h-[38px] w-[4px] flex-shrink-0 self-center rounded-[17px] transition-[height,background-color] ease-in-out group-hover/card:h-[175px] lg:block"
                aria-hidden="true"
              />

              {/* Same summary as the event's own page: title, info rows and the
                  registration panel, with Learn More always below it. The panel
                  unit shrinks everything on desktop so the card stays compact.
                  On desktop every card is at least the same height. The panel
                  and Learn More sit at the bottom, so any spare height becomes
                  the gap above the panel - room for a two-line title. */}
              <div className="px-tight flex min-w-0 flex-1 flex-col gap-[16px] pb-[8px] lg:gap-[12px] lg:self-stretch lg:px-0 lg:py-[16px] lg:pr-[24px] lg:[--event-unit:0.75px]">
                <h2
                  title={event.event}
                  className="text-ink text-[24px] leading-[32px] font-semibold tracking-[0px] lg:text-[30px] lg:leading-[1.2]"
                >
                  <Link
                    href={`/events/${event.id}`}
                    className="focus-visible:outline-primary block w-full cursor-pointer rounded-sm text-left underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    <span className="lg:line-clamp-2">{event.event}</span>
                  </Link>
                </h2>

                <EventInfoRows event={event} className="lg:[&_dd]:line-clamp-1" />

                <EventCTA
                  status={getStatus(event)}
                  eventId={event.id}
                  registrationLink={event.registrationLink}
                  className="lg:mt-auto"
                />

                <ArrowLink href={`/events/${event.id}`} className="mt-2 self-end">
                  Learn More
                </ArrowLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCardList;
