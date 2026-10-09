"use server";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Event } from "../../../../payload-types";

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
