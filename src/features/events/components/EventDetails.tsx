import Image from "next/image";
import Link from "next/link";
import { LuX } from "react-icons/lu";
import type { Event } from "../../../../payload-types";
import { resolveMedia } from "@/lib/payload/media";
import EventCTA from "./EventCTA";
import { formatEventDate } from "../lib/formatEventDate";
import type { RegistrationStatus } from "../lib/registrationStatus";

interface EventDetailsProps {
  event: Event;
  registrationStatus: RegistrationStatus;
}

const EventDetails = ({ event, registrationStatus }: EventDetailsProps) => {
  const { day, month, detailsTime } = formatEventDate(event);
  const image = resolveMedia(event.image);

  return (
    // Scale desktop dimensions from the card's 1244px design width. The
    // container keeps text, spacing and the divider proportional to the square image.
    <div className="@container w-full max-w-[1244px]">
      <article className="border-border relative flex w-full flex-col gap-6 rounded-xl border bg-white p-2 text-left shadow-[0_1px_4px_0_rgba(12,12,13,0.05)] lg:flex-row lg:items-center lg:gap-[calc(80*var(--event-details-unit))] lg:[--event-details-unit:calc(100cqw/1244)] lg:[--event-panel-unit:var(--event-details-unit)]">
        <Link
          href="/events"
          aria-label="Back to events"
          className="lg:text-muted-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-primary absolute top-1 right-1 z-10 flex h-16 w-16 items-center justify-center rounded-sm text-white drop-shadow-sm transition-[scale,color] duration-300 ease-in-out hover:scale-[1.0667] focus-visible:scale-[1.0667] focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:scale-100 motion-reduce:transition-none lg:h-[calc(44*var(--event-details-unit))] lg:w-[calc(44*var(--event-details-unit))] lg:drop-shadow-none"
        >
          <LuX size={64} strokeWidth={2} className="h-full w-full" aria-hidden="true" />
        </Link>

        <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden rounded-lg lg:w-[42%] lg:max-w-[512px]">
          <Image
            src={image?.url || "/assets/logos/uaic.webp"}
            alt={image?.alt || `${event.event} photo`}
            fill
            sizes="(min-width: 1440px) 512px, (min-width: 1024px) 36vw, calc(100vw - 64px)"
            className={
              image?.url
                ? "object-cover"
                : "bg-surface-faint object-contain p-8 lg:p-[calc(32*var(--event-details-unit))]"
            }
          />
          <time
            dateTime={event.startDate}
            className="bg-surface-faint text-primary absolute top-2 left-2 flex h-[72px] w-[72px] flex-col items-center justify-center rounded-sm text-center lg:top-[calc(8*var(--event-details-unit))] lg:left-[calc(8*var(--event-details-unit))] lg:h-[calc(108*var(--event-details-unit))] lg:w-[calc(108*var(--event-details-unit))]"
          >
            <span className="text-[28px] leading-none font-bold lg:text-[calc(40*var(--event-details-unit))]">
              {day}
            </span>
            <span className="text-[18px] leading-tight font-bold lg:text-[calc(28*var(--event-details-unit))]">
              {month}
            </span>
          </time>
        </div>

        <div
          aria-hidden="true"
          className="bg-primary-light hidden flex-shrink-0 rounded-full lg:block lg:h-[calc(340*var(--event-details-unit))] lg:w-[calc(8*var(--event-details-unit))]"
        />

        <div className="min-w-0 flex-1 px-2 pb-2 lg:py-[calc(40*var(--event-details-unit))] lg:pr-[calc(40*var(--event-details-unit))] lg:pl-0">
          <p className="text-primary-light mb-2 hidden text-[20px] leading-6 font-bold lg:mb-[calc(8*var(--event-details-unit))] lg:block lg:text-[calc(20*var(--event-details-unit))] lg:leading-[1.2]">
            Event Info
          </p>
          <h1 className="text-ink text-[30px] leading-8 font-semibold [overflow-wrap:anywhere] lg:pr-[calc(16*var(--event-details-unit))] lg:text-[calc(30*var(--event-details-unit))] lg:leading-[1.066667]">
            {event.event}
          </h1>
          <p className="text-muted-foreground mt-4 text-[20px] leading-[26px] [overflow-wrap:anywhere] lg:mt-[calc(16*var(--event-details-unit))] lg:text-[calc(20*var(--event-details-unit))] lg:leading-[1.3]">
            <time dateTime={event.startDate}>{detailsTime}</time>
            <span aria-hidden="true"> • </span>
            {event.location}
          </p>
          <p className="text-ink mt-6 text-[16px] leading-[25px] [overflow-wrap:anywhere] whitespace-pre-line lg:mt-[calc(24*var(--event-details-unit))] lg:text-[calc(16*var(--event-details-unit))] lg:leading-[1.5625]">
            {event.description}
          </p>
          <div className="mt-6 lg:mt-[calc(32*var(--event-details-unit))]">
            <EventCTA
              status={registrationStatus}
              eventId={event.id}
              registrationLink={event.registrationLink}
              layout="panel"
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default EventDetails;
