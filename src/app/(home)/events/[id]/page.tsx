import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import EventDetails from "@/features/events/components/EventDetails";
import { getEventById } from "@/features/events/data/getEvents";
import { getEventRegistrationStatuses } from "@/features/events/data/getEventRegistrationStatuses";
import { resolveMedia } from "@/lib/payload/media";

// Always read the current event and viewer's registration state. This also
// keeps edits/deletions fresh for concluded events, whose status skips headers().
export const dynamic = "force-dynamic";

type EventPageProps = { params: Promise<{ id: string }> };

// Share the Local API lookup between metadata and the page within one request
// only. React cache does not retain the event across requests or CMS edits.
const getEvent = cache(async (id: string) => {
  const event = await getEventById(id);
  if (!event) notFound();
  return event;
});

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = await getEvent(id);
  const image = resolveMedia(event.image);

  return {
    title: `${event.event} | Investment Club`,
    description: event.description,
    openGraph: {
      title: event.event,
      description: event.description,
      type: "website",
      ...(image?.url && { images: [{ url: image.url, alt: image.alt || event.event }] }),
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = await getEvent(id);
  const statuses = await getEventRegistrationStatuses([event]);

  return (
    <div className="bg-surface-faint flex w-full justify-center px-6 py-[75px] lg:px-[98px]">
      <EventDetails event={event} registrationStatus={statuses[event.id]} />
    </div>
  );
}
