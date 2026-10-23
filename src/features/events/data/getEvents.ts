// Deliberately not "use server": that would expose every export as a server
// action callable from the client with any ID. `server-only` makes importing
// this from a client component a build error instead.
import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Event } from "../../../../payload-types";

export const getEventById = async (id: string): Promise<Event | null> => {
  // Events use MongoDB ObjectIDs. Reject malformed route params before they
  // reach the database so the page can treat them as not found.
  if (!/^[a-f\d]{24}$/i.test(id)) return null;

  const payload = await getPayload({ config });

  return payload.findByID({
    collection: "events",
    id,
    depth: 1,
    overrideAccess: false,
    // Missing/deleted events return null; database and other failures still
    // propagate rather than being mistaken for a missing event.
    disableErrors: true,
  });
};

// Get all events
export const getEvents = async (): Promise<Event[]> => {
  const payload = await getPayload({ config });

  const events = await payload.find({
    collection: "events",
    depth: 1,
    pagination: false,
    sort: "-startDate",
  });

  return events.docs;
};

// Get upcoming events, including ones already in progress (they haven't ended
// yet). Filtering on startDate instead would hide an event from both this and
// getRecentEvents for as long as it's running.
export const getUpcomingEvents = async (): Promise<Event[]> => {
  const payload = await getPayload({ config });

  const events = await payload.find({
    collection: "events",
    depth: 1,
    pagination: false,
    sort: "startDate", // Ascending - in-progress first, then soonest
    where: {
      endDate: {
        greater_than_equal: new Date().toISOString(),
      },
    },
  });

  return events.docs;
};

// Get only past events (endDate < today), optionally capped to the `limit` most recent
export const getRecentEvents = async (limit?: number): Promise<Event[]> => {
  const payload = await getPayload({ config });

  const events = await payload.find({
    collection: "events",
    depth: 1,
    pagination: false,
    sort: "-endDate", // Descending - most recent first
    where: {
      endDate: {
        less_than: new Date().toISOString(),
      },
    },
  });

  return typeof limit === "number" ? events.docs.slice(0, limit) : events.docs;
};
