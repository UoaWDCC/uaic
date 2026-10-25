import type { Event } from "../../../../payload-types";
import ArrowLink from "./ArrowLink";
import EventCTA from "./EventCTA";
import EventDateBadge from "./EventDateBadge";
import EventImage from "./EventImage";
import EventInfoRows from "./EventInfoRows";
import type { RegistrationStatus } from "../lib/registrationStatus";

interface EventDetailsProps {
  event: Event;
  registrationStatus: RegistrationStatus;
}

const EventDetails = ({ event, registrationStatus }: EventDetailsProps) => {
  return (
    // Scale desktop dimensions from the card's 1244px design width. The
    // container keeps text, spacing and the divider proportional to the square image.
    <div className="@container w-full max-w-[1244px]">
      <div className="mb-3">
        <ArrowLink href="/events" direction="back" ariaLabel="Back to events">
          Back
        </ArrowLink>
      </div>
      <article className="border-border shadow-panel relative flex w-full flex-col gap-6 rounded-xl border bg-white p-2 text-left md:flex-row md:items-center md:gap-[calc(80*var(--event-unit))] md:[--event-unit:calc(100cqw/1244)]">
        <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden rounded-lg md:w-[42%] md:max-w-[512px]">
          <EventImage
            image={event.image}
            alt={`${event.event} photo`}
            sizes="(min-width: 1440px) 512px, (min-width: 1024px) calc(42vw - 90px), (min-width: 768px) calc(42vw - 28px), calc(100vw - 66px)"
          />
          <EventDateBadge
            event={event}
            className="text-[20px] md:top-[calc(8*var(--event-unit))] md:left-[calc(8*var(--event-unit))] md:text-[calc(30*var(--event-unit))]"
          />
        </div>

        <div
          aria-hidden="true"
          className="bg-primary-light hidden flex-shrink-0 rounded-full md:block md:h-[calc(340*var(--event-unit))] md:w-[calc(8*var(--event-unit))]"
        />

        {/* The description lives in its own section below, so this card keeps
            the same shape however long an event's description is. */}
        <div className="min-w-0 flex-1 px-2 pb-2 md:py-[calc(40*var(--event-unit))] md:pr-[calc(40*var(--event-unit))] md:pl-0">
          <h1 className="text-ink text-[30px] leading-[1.2] font-semibold [overflow-wrap:anywhere] md:pr-[calc(16*var(--event-unit))] md:text-[calc(30*var(--event-unit))]">
            {event.event}
          </h1>
          <EventInfoRows event={event} className="mt-4 md:mt-[calc(20*var(--event-unit))]" />
          <div className="mt-6 md:mt-[calc(32*var(--event-unit))]">
            <EventCTA
              status={registrationStatus}
              eventId={event.id}
              registrationLink={event.registrationLink}
              layout="panel"
            />
          </div>
        </div>
      </article>

      <section
        aria-labelledby="event-description-heading"
        className="border-border shadow-panel mt-3 rounded-xl border bg-white p-6 md:p-8"
      >
        <h2 id="event-description-heading" className="text-ink text-[20px] leading-6 font-semibold">
          About this event
        </h2>
        <p className="text-ink mt-3 text-[16px] leading-[25px] [overflow-wrap:anywhere] whitespace-pre-line">
          {event.description}
        </p>
      </section>
    </div>
  );
};

export default EventDetails;
