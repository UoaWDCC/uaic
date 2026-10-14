// Colocated with the loader it covers. Payload, Better Auth and next/headers
// are mocked; the fake Payload below really applies `where` clauses, so a
// query that forgets to scope by member returns other members' signups here
// just as the Local API would (it skips access control).
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Event } from "../../../../payload-types";

type Signup = { event: string; member: string; status: "confirmed" | "cancelled" };
type Where = Record<string, unknown>;

const db = {
  signups: [] as Signup[],
  members: {} as Record<string, { hasPaid: boolean }>,
  sessionUserId: null as string | null,
  memberLookupFails: false,
};

const matches = (doc: Record<string, unknown>, where: Where): boolean =>
  Object.entries(where).every(([key, cond]) => {
    if (key === "and") return (cond as Where[]).every((w) => matches(doc, w));
    const { equals, in: within } = cond as { equals?: unknown; in?: unknown[] };
    if (equals !== undefined) return doc[key] === equals;
    if (within !== undefined) return within.includes(doc[key]);
    throw new Error(`fake payload: unsupported where on ${key}`);
  });

const fakePayload = {
  count: vi.fn(async ({ where }: { where: Where }) => ({
    totalDocs: db.signups.filter((s) => matches(s, where)).length,
  })),
  find: vi.fn(async ({ collection, where }: { collection: string; where: Where }) => {
    if (collection === "member") {
      if (db.memberLookupFails) throw new Error("connection refused");
      const members = Object.entries(db.members).map(([id, m]) => ({ id, ...m }));
      return { docs: members.filter((m) => matches(m, where)) };
    }
    return { docs: db.signups.filter((s) => matches(s, where)) };
  }),
};

const signupFinds = () =>
  fakePayload.find.mock.calls.filter(([args]) => args.collection === "event-signups");

vi.mock("server-only", () => ({}));
vi.mock("@payload-config", () => ({ default: {} }));
vi.mock("next/headers", () => ({ headers: async () => new Headers() }));
vi.mock("payload", () => ({ getPayload: async () => fakePayload }));
vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: async () => (db.sessionUserId ? { user: { id: db.sessionUserId } } : null),
    },
  },
}));

const { getEventRegistrationStatuses } = await import("./getEventRegistrationStatuses");

const event = (id: string, overrides: Partial<Event> = {}) =>
  ({
    id,
    startDate: "2098-12-31T00:00:00Z",
    endDate: "2099-01-01T00:00:00Z",
    requiresSignup: true,
    requiresMembership: false,
    capacity: null,
    freeSlotOnCancel: false,
    registrationLink: null,
    ...overrides,
  }) as Event;

beforeEach(() => {
  db.signups = [];
  db.members = { me: { hasPaid: true }, other: { hasPaid: true } };
  db.sessionUserId = null;
  db.memberLookupFails = false;
  vi.clearAllMocks();
});

describe("getEventRegistrationStatuses", () => {
  it("only marks events registered for the viewer's own signups", async () => {
    db.sessionUserId = "me";
    db.signups = [
      { event: "theirs", member: "other", status: "confirmed" },
      { event: "mine", member: "me", status: "confirmed" },
    ];

    const statuses = await getEventRegistrationStatuses([event("theirs"), event("mine")]);

    expect(statuses).toEqual({ theirs: "requires-signup", mine: "registered" });
  });

  it("doesn't count a cancelled signup of the viewer's as registered", async () => {
    db.sessionUserId = "me";
    db.signups = [{ event: "a", member: "me", status: "cancelled" }];

    expect(await getEventRegistrationStatuses([event("a")])).toEqual({ a: "requires-signup" });
  });

  it("never looks up registrations for a logged-out viewer", async () => {
    db.signups = [{ event: "a", member: "me", status: "confirmed" }];

    expect(await getEventRegistrationStatuses([event("a")])).toEqual({ a: "requires-signup" });
    expect(fakePayload.find).not.toHaveBeenCalled();
  });

  it("keeps a cancelled spot taken unless freeSlotOnCancel is set", async () => {
    db.signups = [
      { event: "held", member: "other", status: "cancelled" },
      { event: "freed", member: "other", status: "cancelled" },
    ];

    const statuses = await getEventRegistrationStatuses([
      event("held", { capacity: 1, freeSlotOnCancel: false }),
      event("freed", { capacity: 1, freeSlotOnCancel: true }),
    ]);

    expect(statuses).toEqual({ held: "full", freed: "requires-signup" });
  });

  it("only counts signups for events with a capacity", async () => {
    await getEventRegistrationStatuses([event("unlimited"), event("capped", { capacity: 5 })]);

    expect(fakePayload.count).toHaveBeenCalledTimes(1);
  });

  it("skips all signup queries for concluded events", async () => {
    db.sessionUserId = "me";
    const statuses = await getEventRegistrationStatuses([
      event("past", {
        startDate: "1999-12-31T00:00:00Z",
        endDate: "2000-01-01T00:00:00Z",
        capacity: 1,
      }),
    ]);

    expect(statuses).toEqual({ past: "concluded" });
    expect(fakePayload.count).not.toHaveBeenCalled();
    expect(signupFinds()).toHaveLength(0);
  });

  it("splits members-only events by whether the viewer has paid", async () => {
    db.members.me = { hasPaid: false };
    db.sessionUserId = "me";

    expect(await getEventRegistrationStatuses([event("m", { requiresMembership: true })])).toEqual({
      m: "members-only-non-member",
    });
  });

  it("treats a logged-in user with no Member record as a non-member", async () => {
    db.sessionUserId = "no-profile";

    expect(await getEventRegistrationStatuses([event("m", { requiresMembership: true })])).toEqual({
      m: "members-only-non-member",
    });
  });

  it("surfaces a database error instead of demoting a paid member", async () => {
    db.sessionUserId = "me";
    db.memberLookupFails = true;

    await expect(
      getEventRegistrationStatuses([event("m", { requiresMembership: true })]),
    ).rejects.toThrow("connection refused");
  });

  it("doesn't look up the viewer at all when every event is over", async () => {
    db.sessionUserId = "me";
    db.memberLookupFails = true;

    const statuses = await getEventRegistrationStatuses([
      event("a", { startDate: "1999-01-01T00:00:00Z", endDate: "1999-01-01T02:00:00Z" }),
      event("b", { startDate: "2000-01-01T00:00:00Z", endDate: "2000-01-01T02:00:00Z" }),
    ]);

    expect(statuses).toEqual({ a: "concluded", b: "concluded" });
    expect(fakePayload.find).not.toHaveBeenCalled();
  });
});
