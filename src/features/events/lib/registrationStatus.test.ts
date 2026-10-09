// Colocated with the helper it covers - plain function, no rendering, no DB.
import { describe, it, expect } from "vitest";
import {
  cardDescriptionLines,
  getRegistrationStatus,
  LOGGED_OUT_VIEWER,
  NO_SIGNUPS,
  signupStatusesTakingASpot,
} from "./registrationStatus";

const NOW = new Date("2026-07-01T00:00:00Z");
const MEMBER = { isLoggedIn: true, isMember: true };
const NON_MEMBER = { isLoggedIn: true, isMember: false };

const event = (overrides = {}) => ({
  startDate: "2026-07-20T18:00:00Z",
  endDate: "2026-07-20T20:00:00Z",
  closeRegistrationOnStart: false,
  registrationLink: null,
  requiresSignup: true,
  requiresMembership: false,
  capacity: null,
  ...overrides,
});

describe("getRegistrationStatus", () => {
  it("is concluded once the event has ended, regardless of anything else", () => {
    const past = event({ endDate: "2026-06-01T00:00:00Z", capacity: 1 });
    expect(getRegistrationStatus(past, MEMBER, { signupCount: 5, isRegistered: true }, NOW)).toBe(
      "concluded",
    );
  });

  it("is open when no signup is required and there's no external link", () => {
    expect(getRegistrationStatus(event({ requiresSignup: false }), MEMBER, NO_SIGNUPS, NOW)).toBe(
      "open",
    );
  });

  it("keeps the external-link CTA for events that don't use onsite signup", () => {
    const ext = event({ requiresSignup: false, registrationLink: "https://forms.gle/x" });
    expect(getRegistrationStatus(ext, LOGGED_OUT_VIEWER, NO_SIGNUPS, NOW)).toBe("external");
  });

  it("requires signup for a public event with spots left", () => {
    expect(getRegistrationStatus(event({ capacity: 10 }), LOGGED_OUT_VIEWER, NO_SIGNUPS, NOW)).toBe(
      "requires-signup",
    );
  });

  it("is full once confirmed signups reach capacity", () => {
    const signups = { signupCount: 10, isRegistered: false };
    expect(getRegistrationStatus(event({ capacity: 10 }), MEMBER, signups, NOW)).toBe("full");
  });

  it("shows registered over full for someone who already has a spot", () => {
    const signups = { signupCount: 10, isRegistered: true };
    expect(getRegistrationStatus(event({ capacity: 10 }), MEMBER, signups, NOW)).toBe("registered");
  });

  it("treats a capacity of 0 as full, not as unlimited", () => {
    expect(getRegistrationStatus(event({ capacity: 0 }), MEMBER, NO_SIGNUPS, NOW)).toBe("full");
  });

  it("splits members-only events by who's viewing", () => {
    const membersOnly = event({ requiresMembership: true });
    expect(getRegistrationStatus(membersOnly, MEMBER, NO_SIGNUPS, NOW)).toBe("members-only");
    expect(getRegistrationStatus(membersOnly, NON_MEMBER, NO_SIGNUPS, NOW)).toBe(
      "members-only-non-member",
    );
    expect(getRegistrationStatus(membersOnly, LOGGED_OUT_VIEWER, NO_SIGNUPS, NOW)).toBe(
      "members-only-logged-out",
    );
  });

  describe("once the event has started", () => {
    const running = (overrides = {}) =>
      event({ startDate: "2026-06-30T00:00:00Z", endDate: "2026-07-02T00:00:00Z", ...overrides });

    it("stays registerable by default", () => {
      expect(getRegistrationStatus(running(), MEMBER, NO_SIGNUPS, NOW)).toBe("in-progress");
    });

    it("closes registration when the event says so", () => {
      expect(
        getRegistrationStatus(running({ closeRegistrationOnStart: true }), MEMBER, NO_SIGNUPS, NOW),
      ).toBe("in-progress-closed");
    });

    it("keeps external-link events registerable via the link unless closed", () => {
      const ext = { requiresSignup: false, registrationLink: "https://forms.gle/x" };
      expect(getRegistrationStatus(running(ext), LOGGED_OUT_VIEWER, NO_SIGNUPS, NOW)).toBe(
        "in-progress-external",
      );
      expect(
        getRegistrationStatus(
          running({ ...ext, closeRegistrationOnStart: true }),
          LOGGED_OUT_VIEWER,
          NO_SIGNUPS,
          NOW,
        ),
      ).toBe("in-progress-closed");
    });

    it("has nothing to register for on an open event", () => {
      expect(
        getRegistrationStatus(running({ requiresSignup: false }), MEMBER, NO_SIGNUPS, NOW),
      ).toBe("in-progress-closed");
    });

    it("still shows registered, full and the members-only gates first", () => {
      expect(
        getRegistrationStatus(
          running({ closeRegistrationOnStart: true }),
          MEMBER,
          { signupCount: 0, isRegistered: true },
          NOW,
        ),
      ).toBe("registered");
      expect(
        getRegistrationStatus(
          running({ capacity: 1 }),
          MEMBER,
          { signupCount: 1, isRegistered: false },
          NOW,
        ),
      ).toBe("full");
      expect(
        getRegistrationStatus(running({ requiresMembership: true }), NON_MEMBER, NO_SIGNUPS, NOW),
      ).toBe("members-only-non-member");
    });
  });

  it("skips the time-based checks when given no clock (client fallback)", () => {
    const past = event({
      startDate: "2000-01-01T00:00:00Z",
      endDate: "2000-01-01T02:00:00Z",
      requiresSignup: false,
    });
    expect(getRegistrationStatus(past, LOGGED_OUT_VIEWER, NO_SIGNUPS, null)).toBe("open");
  });
});

describe("signupStatusesTakingASpot", () => {
  it("only counts confirmed signups when cancellations free their spot", () => {
    expect(signupStatusesTakingASpot(true)).toEqual(["confirmed"]);
  });

  it("keeps cancelled signups holding a spot by default", () => {
    expect(signupStatusesTakingASpot(false)).toEqual(["confirmed", "cancelled"]);
    expect(signupStatusesTakingASpot(null)).toEqual(["confirmed", "cancelled"]);
    expect(signupStatusesTakingASpot(undefined)).toEqual(["confirmed", "cancelled"]);
  });
});

describe("cardDescriptionLines", () => {
  it("gives the description fewer lines the taller the CTA is", () => {
    expect(cardDescriptionLines("requires-signup")).toBe(3);
    expect(cardDescriptionLines("full")).toBe(2);
    expect(cardDescriptionLines("members-only-logged-out")).toBe(1);
  });
});
