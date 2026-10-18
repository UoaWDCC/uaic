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
    <article className="border-border relative flex w-full max-w-[1244px] flex-col gap-6 rounded-xl border bg-white p-2 text-left shadow-[0_1px_4px_0_rgba(12,12,13,0.05)] lg:flex-row lg:items-center lg:gap-20">
      <Link
        href="/events"
        aria-label="Back to events"
        className="lg:text-muted-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-primary absolute top-1 right-1 z-10 flex h-16 w-16 items-center justify-center rounded-sm text-white drop-shadow-sm transition-[scale,color] duration-300 ease-in-out hover:scale-[1.0667] focus-visible:scale-[1.0667] focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:scale-100 motion-reduce:transition-none lg:h-11 lg:w-11 lg:drop-shadow-none"
      >
        <LuX size={64} strokeWidth={2} className="h-full w-full" aria-hidden="true" />
      </Link>

      <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden rounded-lg lg:w-[42%] lg:max-w-[512px]">
        <Image
          src={image?.url || "/assets/logos/uaic.webp"}
          alt={image?.alt || `${event.event} photo`}
          fill
          sizes="(min-width: 1440px) 512px, (min-width: 1024px) 36vw, calc(100vw - 64px)"
          className={image?.url ? "object-cover" : "bg-surface-faint object-contain p-8"}
        />
        <time
          dateTime={event.startDate}
          className="bg-surface-faint text-primary absolute top-2 left-2 flex h-[72px] w-[72px] flex-col items-center justify-center rounded-sm text-center lg:h-[108px] lg:w-[108px]"
        >
          <span className="text-[28px] leading-none font-bold lg:text-[40px]">{day}</span>
          <span className="text-[18px] leading-tight font-bold lg:text-[28px]">{month}</span>
        </time>
      </div>

      <div
        aria-hidden="true"
        className="bg-primary-light hidden h-[340px] w-2 flex-shrink-0 rounded-full lg:block"
      />

      <div className="min-w-0 flex-1 px-2 pb-2 lg:py-10 lg:pr-10 lg:pl-0">
        <p className="text-primary-light mb-2 hidden text-[20px] leading-6 font-bold lg:block">
          Event Info
        </p>
        <h1 className="text-ink text-[30px] leading-8 font-semibold [overflow-wrap:anywhere] lg:pr-4">
          {event.event}
        </h1>
        <p className="text-muted-foreground mt-4 text-[20px] leading-[26px] [overflow-wrap:anywhere]">
          <time dateTime={event.startDate}>{detailsTime}</time>
          <span aria-hidden="true"> • </span>
          {event.location}
        </p>
        <p className="text-ink mt-6 text-[16px] leading-[25px] [overflow-wrap:anywhere] whitespace-pre-line">
          {event.description}
        </p>
        <div className="mt-6 lg:mt-8">
          <EventCTA
            status={registrationStatus}
            eventId={event.id}
            registrationLink={event.registrationLink}
            layout="panel"
          />
        </div>
      </div>
    </article>
  );
};

export default EventDetails;
