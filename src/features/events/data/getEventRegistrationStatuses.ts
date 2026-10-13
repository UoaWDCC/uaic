import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { auth } from "@/lib/auth";
import type { Event } from "../../../../payload-types";
import {
  getRegistrationStatus,
  LOGGED_OUT_VIEWER,
  signupStatusesTakingASpot,
  type EventViewer,
  type RegistrationStatus,
} from "../lib/registrationStatus";

// Deliberately not "use server" (unlike getEvents.ts): that would expose these
// as callable server actions. `server-only` makes importing this from a client
// component a build error instead.

type ViewerWithId = EventViewer & { memberId: string | null };

// cache() so the home page's sections and the events page share one session +
// member lookup per request instead of repeating it for every caller.
const getViewer = cache(async (): Promise<ViewerWithId> => {
  let memberId: string | null;
  try {
    // Better Auth's user documents are the `member` collection's documents
    // (see src/lib/memberSession.ts), so the session id is the Member id.
    const session = await auth.api.getSession({ headers: await headers() });
    memberId = session?.user.id ?? null;
  } catch {
    // A malformed or expired cookie shouldn't break the events page - show the
    // logged-out CTAs instead.
    return { ...LOGGED_OUT_VIEWER, memberId: null };
  }

  if (!memberId) return { ...LOGGED_OUT_VIEWER, memberId: null };

  // find (not findByID) so a missing Member doc comes back empty rather than
  // throwing - that's the only case that means "not a member". Any other
  // failure (e.g. the database being unreachable) propagates: quietly showing
  // a paid member "Join to Register" is worse than the page erroring, which
  // it would anyway since the events query uses the same database.
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "member",
    depth: 0,
    limit: 1,
    pagination: false,
    where: { id: { equals: memberId } },
  });

  return { isLoggedIn: true, isMember: docs[0]?.hasPaid === true, memberId };
});

// Works out the CTA for each event from who's viewing and its signups. Runs on
// the server so the status (including "concluded", which depends on the
// current time) is computed once and can't differ between the server render
// and hydration.
//
// Uses the Local API, which skips EventSignups' access control - so the
// viewer's own signups MUST be scoped by member id explicitly below, or every
// viewer would show as registered for any event someone else signed up to.
export const getEventRegistrationStatuses = async (
  events: Event[],
): Promise<Record<string, RegistrationStatus>> => {
  const now = new Date();

  // Past-events lists (e.g. the home page's Recent section) never need to know
  // who's viewing - skip the session/member lookup entirely, so a database
  // hiccup there can't take those sections down.
  if (events.every((event) => new Date(event.endDate) < now)) {
    return Object.fromEntries(events.map((event) => [event.id, "concluded" as const]));
  }

  const payload = await getPayload({ config });
  const viewer = await getViewer();

  // Only events still taking onsite signups need a signup lookup.
  const signupEvents = events.filter(
    (event) => event.requiresSignup && new Date(event.endDate) >= now,
  );

  // Only events with a capacity need counting - one count per event rather
  // than fetching every signup row.
  const signupCounts = new Map(
    await Promise.all(
      signupEvents
        .filter((event) => typeof event.capacity === "number")
        .map(async (event) => {
          const { totalDocs } = await payload.count({
            collection: "event-signups",
            where: {
              and: [
                { event: { equals: event.id } },
                { status: { in: signupStatusesTakingASpot(event.freeSlotOnCancel) } },
              ],
            },
          });
          return [event.id, totalDocs] as const;
        }),
    ),
  );

  const registeredEventIds = new Set<string>();
  if (viewer.memberId && signupEvents.length > 0) {
    const { docs } = await payload.find({
      collection: "event-signups",
      depth: 0,
      pagination: false,
      select: { event: true },
      where: {
        and: [
          { member: { equals: viewer.memberId } },
          { event: { in: signupEvents.map((event) => event.id) } },
          { status: { equals: "confirmed" } },
        ],
      },
    });

    for (const signup of docs) {
      registeredEventIds.add(typeof signup.event === "string" ? signup.event : signup.event.id);
    }
  }

  return Object.fromEntries(
    events.map((event) => [
      event.id,
      getRegistrationStatus(
        event,
        viewer,
        {
          signupCount: signupCounts.get(event.id) ?? 0,
          isRegistered: registeredEventIds.has(event.id),
        },
        now,
      ),
    ]),
  );
};
