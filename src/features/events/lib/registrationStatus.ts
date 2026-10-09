import type { Event, EventSignup } from "../../../../payload-types";

// Every call-to-action an event can show, one per Figma "EventCTA" variant.
// Derived once per event by `getRegistrationStatus` so components only ever
// switch on this - never re-derive it from raw event fields themselves.
export type RegistrationStatus =
  // No onsite signup and no external link - just show up.
  | "open"
  // No onsite signup, but the event links out to an external form (the
  // pre-EventSignups behaviour, kept so existing events don't lose their CTA).
  | "external"
  // Onsite signup, open to everyone.
  | "requires-signup"
  // Onsite signup, members only, and the viewer is a paid member.
  | "members-only"
  // Members only, viewer isn't logged in - prompt to join or sign in.
  | "members-only-logged-out"
  // Members only, viewer is logged in but hasn't paid - prompt to join.
  | "members-only-non-member"
  | "full"
  | "registered"
  // Started but not ended, and still taking onsite signups.
  | "in-progress"
  // Started but not ended, still taking registrations via the external link.
  | "in-progress-external"
  // Started but not ended, and not taking registrations - either the event has
  // `closeRegistrationOnStart` ticked or there was nothing to register for.
  | "in-progress-closed"
  | "concluded";

// How many description lines the event card has room for on desktop, where
// it's a fixed height: the taller the CTA, the fewer lines. Lives next to the
// statuses so a new status can't be added without deciding this.
const CARD_DESCRIPTION_LINES: Record<RegistrationStatus, 1 | 2 | 3> = {
  // Buttons only.
  external: 3,
  "requires-signup": 3,
  concluded: 3,
  // A heading above the buttons.
  "members-only": 2,
  full: 2,
  registered: 2,
  "in-progress": 2,
  "in-progress-external": 2,
  "in-progress-closed": 2,
  // Heading + wrapping subtext (and the sign-in prompt for locked).
  open: 1,
  "members-only-logged-out": 1,
  "members-only-non-member": 1,
};

export const cardDescriptionLines = (status: RegistrationStatus) => CARD_DESCRIPTION_LINES[status];

export interface EventViewer {
  isLoggedIn: boolean;
  isMember: boolean;
}

export interface EventSignupInfo {
  // Signups taking a spot - see `signupStatusesTakingASpot`.
  signupCount: number;
  // Whether the viewer has a confirmed signup for this event.
  isRegistered: boolean;
}

export const LOGGED_OUT_VIEWER: EventViewer = { isLoggedIn: false, isMember: false };
export const NO_SIGNUPS: EventSignupInfo = { signupCount: 0, isRegistered: false };

// Which signup statuses count against an event's capacity. A cancellation
// only frees its spot when the event has `freeSlotOnCancel` ticked - otherwise
// the cancelled row still holds it. Shared with the create-signup route (#430)
// so the card and the server agree on when an event is full.
export const signupStatusesTakingASpot = (
  freeSlotOnCancel: boolean | null | undefined,
): EventSignup["status"][] => (freeSlotOnCancel ? ["confirmed"] : ["confirmed", "cancelled"]);

type EventFields = Pick<
  Event,
  | "startDate"
  | "endDate"
  | "registrationLink"
  | "requiresSignup"
  | "requiresMembership"
  | "capacity"
  | "closeRegistrationOnStart"
>;

// Order matters: an event that's over is concluded no matter what, and a
// viewer who's already signed up sees that even once the event fills up or
// starts. Once an event has started, "full" and the members-only gates still
// win over "in-progress" - starting doesn't let anyone around them.
//
// `now` is required rather than defaulted so callers have to choose where the
// time comes from. Pass null to skip the time-based checks (concluded and in
// progress) entirely - for client renders, where reading the clock could
// differ from the server render and cause a hydration mismatch at a start or
// end time.
export const getRegistrationStatus = (
  event: EventFields,
  viewer: EventViewer,
  signups: EventSignupInfo,
  now: Date | null,
): RegistrationStatus => {
  if (now && new Date(event.endDate) < now) return "concluded";

  const hasStarted = now !== null && new Date(event.startDate) <= now;
  const registrationClosed = hasStarted && event.closeRegistrationOnStart === true;

  if (!event.requiresSignup) {
    if (hasStarted) {
      return event.registrationLink && !registrationClosed
        ? "in-progress-external"
        : "in-progress-closed";
    }
    return event.registrationLink ? "external" : "open";
  }

  if (signups.isRegistered) return "registered";

  if (registrationClosed) return "in-progress-closed";

  if (typeof event.capacity === "number" && signups.signupCount >= event.capacity) return "full";

  if (event.requiresMembership && !viewer.isMember) {
    return viewer.isLoggedIn ? "members-only-non-member" : "members-only-logged-out";
  }

  if (hasStarted) return "in-progress";

  return event.requiresMembership ? "members-only" : "requires-signup";
};

// The onsite registration page (#430 / #457) doesn't exist yet. Until it
// does, CTAs that would lead there use the event's external registration link
// if it has one, or render disabled - never a link to a 404. Flip this once
// the route has merged.
export const ONSITE_REGISTRATION_LIVE = false;

export const getEventRegistrationHref = (eventId: string): string | null =>
  ONSITE_REGISTRATION_LIVE ? `/events/${eventId}/register` : null;
