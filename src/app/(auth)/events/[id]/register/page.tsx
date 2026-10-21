import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { getEventRegistrationStatuses } from "@/features/events/data/getEventRegistrationStatuses";
import { isOnsiteRegistrationLive } from "@/features/events/lib/onsiteRegistration";
import type { RegistrationStatus } from "@/features/events/lib/registrationStatus";
import EventRegistrationForm from "./EventRegistrationForm";
import RegistrationUnavailable from "./RegistrationUnavailable";

// Statuses that can still take an onsite signup. "in-progress" is included
// because the event card's "Signups Open" button links here.
const CAN_REGISTER: RegistrationStatus[] = ["requires-signup", "members-only", "in-progress"];

type Props = { params: Promise<{ id: string }> };

// cache() so generateMetadata and the page share one lookup per request.
const getEvent = cache(async (id: string) => {
  const payload = await getPayload({ config });
  return payload.findByID({ collection: "events", id, depth: 0 }).catch(() => null);
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent((await params).id);
  return { title: event ? `Register - ${event.event}` : "Event not found" };
}

export default async function EventRegisterPage({ params }: Props) {
  // Off in production (see isOnsiteRegistrationLive): the URL mustn't be
  // reachable directly while events still use their external forms.
  if (!isOnsiteRegistrationLive()) notFound();

  const event = await getEvent((await params).id);
  if (!event) notFound();

  // Anyone can reach this URL directly, so check the status here rather than
  // relying on the event card hiding the button. The create route (#376) is
  // what actually enforces it server-side.
  const status = (await getEventRegistrationStatuses([event]))[event.id];

  // Stand-in event summary until the #429 header primitive lands.
  const header = (
    <div className="min-w-0">
      <h2 className="text-base leading-tight font-semibold">{event.event}</h2>
      <p className="text-muted-foreground text-base">{event.location}</p>
    </div>
  );

  if (!CAN_REGISTER.includes(status)) {
    return <RegistrationUnavailable eventId={event.id} status={status} header={header} />;
  }

  return <EventRegistrationForm header={header} />;
}
