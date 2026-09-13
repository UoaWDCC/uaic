"use server";
import { getPayload } from "payload";
import config from "@payload-config";

// Get all events
export const getEvents = async (): Promise<any[]> => {
  const payload = await getPayload({ config });

  const events = await payload.find({
    collection: "events" as any,
    depth: 1,
    pagination: false,
    sort: "-startDate",
  });

  return events.docs;
};

// Get only upcoming events (startDate >= today)
export const getUpcomingEvents = async (): Promise<any[]> => {
  const payload = await getPayload({ config });

  const events = await payload.find({
    collection: "events" as any,
    depth: 1,
    pagination: false,
    sort: "startDate", // Ascending - soonest first
    where: {
      startDate: {
        greater_than_equal: new Date().toISOString(),
      },
    },
  });

  return events.docs;
};

// Get only past events (endDate < today), optionally capped to the `limit` most recent
export const getRecentEvents = async (limit?: number): Promise<any[]> => {
  const payload = await getPayload({ config });

  const events = await payload.find({
    collection: "events" as any,
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
