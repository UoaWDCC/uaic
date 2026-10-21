import Image from "next/image";
import Link from "next/link";
import { LuChevronLeft } from "react-icons/lu";
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
      <Link
        href="/events"
        aria-label="Back to events"
        className="group hover:text-primary focus-visible:text-primary focus-visible:outline-primary duration-fast relative mb-3 inline-flex h-9 w-fit items-center justify-center gap-1 overflow-hidden rounded-full border-0 bg-white px-4 text-[16px] leading-none font-medium whitespace-nowrap text-white transition-colors ease-in-out focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none"
      >
        <span
          aria-hidden="true"
          className="from-primary to-primary-light duration-fast pointer-events-none absolute inset-0 rounded-full bg-linear-to-l transition-opacity ease-in-out group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none"
        />
        <LuChevronLeft
          size={18}
          strokeWidth={2}
          className="pointer-events-none relative shrink-0"
          aria-hidden="true"
        />
        <span className="pointer-events-none relative">Back</span>
      </Link>
      <article className="border-border relative flex w-full flex-col gap-6 rounded-xl border bg-white p-2 text-left shadow-[0_1px_4px_0_rgba(12,12,13,0.05)] md:flex-row md:items-center md:gap-[calc(80*var(--event-details-unit))] md:[--event-details-unit:calc(100cqw/1244)] md:[--event-panel-unit:var(--event-details-unit)]">
        <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden rounded-lg md:w-[42%] md:max-w-[512px]">
          <Image
            src={image?.url || "/assets/logos/uaic.webp"}
            alt={image?.alt || `${event.event} photo`}
            fill
            sizes="(min-width: 1440px) 512px, (min-width: 1024px) calc(42vw - 90px), (min-width: 768px) calc(42vw - 28px), calc(100vw - 66px)"
            className={
              image?.url
                ? "object-cover"
                : "bg-surface-faint object-contain p-8 md:p-[calc(32*var(--event-details-unit))]"
            }
          />
          <time
            dateTime={event.startDate}
            className="bg-surface-faint text-primary absolute top-2 left-2 flex h-[72px] w-[72px] flex-col items-center justify-center rounded-sm text-center md:top-[calc(8*var(--event-details-unit))] md:left-[calc(8*var(--event-details-unit))] md:h-[calc(108*var(--event-details-unit))] md:w-[calc(108*var(--event-details-unit))]"
          >
            <span className="text-[28px] leading-none font-bold md:text-[calc(40*var(--event-details-unit))]">
              {day}
            </span>
            <span className="text-[18px] leading-tight font-bold md:text-[calc(28*var(--event-details-unit))]">
              {month}
            </span>
          </time>
        </div>

        <div
          aria-hidden="true"
          className="bg-primary-light hidden flex-shrink-0 rounded-full md:block md:h-[calc(340*var(--event-details-unit))] md:w-[calc(8*var(--event-details-unit))]"
        />

        <div className="min-w-0 flex-1 px-2 pb-2 md:py-[calc(40*var(--event-details-unit))] md:pr-[calc(40*var(--event-details-unit))] md:pl-0">
          <p className="text-primary-light mb-2 hidden text-[20px] leading-6 font-bold md:mb-[calc(8*var(--event-details-unit))] md:block md:text-[calc(20*var(--event-details-unit))] md:leading-[1.2]">
            Event Info
          </p>
          <h1 className="text-ink text-[30px] leading-8 font-semibold [overflow-wrap:anywhere] md:pr-[calc(16*var(--event-details-unit))] md:text-[calc(30*var(--event-details-unit))] md:leading-[1.066667]">
            {event.event}
          </h1>
          <p className="text-muted-foreground mt-4 text-[20px] leading-[26px] [overflow-wrap:anywhere] md:mt-[calc(16*var(--event-details-unit))] md:text-[calc(20*var(--event-details-unit))] md:leading-[1.3]">
            <time dateTime={event.startDate}>{detailsTime}</time>
            <span aria-hidden="true"> • </span>
            {event.location}
          </p>
          <p className="text-ink mt-6 text-[16px] leading-[25px] [overflow-wrap:anywhere] whitespace-pre-line md:mt-[calc(24*var(--event-details-unit))] md:text-[calc(16*var(--event-details-unit))] md:leading-[1.5625]">
            {event.description}
          </p>
          <div className="mt-6 md:mt-[calc(32*var(--event-details-unit))]">
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
