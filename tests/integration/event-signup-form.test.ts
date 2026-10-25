import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import type { Event } from "../../payload-types";
import type { getPayload as GetPayload } from "@/lib/payload";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

const detailNames = [
  "firstName",
  "lastName",
  "email",
  "upi",
  "studentId",
  "universityYear",
  "degrees",
  "majors",
];
const question = {
  blockType: "formField",
  label: "Dietary requirements",
  fieldType: "shortText",
} as const;
const configured: NonNullable<Event["signupForm"]> = [
  { blockType: "memberDetail", detail: "firstName" },
  { blockType: "memberDetail", detail: "lastName" },
  { blockType: "memberDetail", detail: "email" },
  question,
];

describe("event signup form initialisation (Payload + Mongo)", () => {
  let mongod: MongoMemoryServer;
  let getPayload: typeof GetPayload;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    process.env.DATABASE_URI = mongod.getUri();
    process.env.PAYLOAD_SECRET ||= "integration-test-secret";
    ({ getPayload } = await import("@/lib/payload"));
  }, 60_000);

  afterAll(async () => {
    await mongod?.stop();
  });

  const createEvent = async (settings: Partial<Event> = {}) => {
    const payload = await getPayload();
    return payload.create({
      collection: "events",
      data: {
        event: "Signup form test",
        startDate: "2026-11-01T05:00:00.000Z",
        endDate: "2026-11-01T07:00:00.000Z",
        location: "Campus",
        description: "An event used to test signup form initialisation.",
        ...settings,
      },
    });
  };

  const expectDefaults = (event: Event) => {
    expect(
      event.signupForm
        ?.slice(0, 8)
        .map((block) => (block.blockType === "memberDetail" ? block.detail : block.blockType)),
    ).toEqual(detailNames);
  };

  it("creates all eight details before custom questions when signup starts enabled", async () => {
    const event = await createEvent({ requiresSignup: true, signupForm: [question] });
    expectDefaults(event);
    expect(event.signupForm).toHaveLength(9);
    expect(event.signupForm?.[8]).toMatchObject(question);
  });

  it("does not initialise while signup is disabled", async () => {
    const event = await createEvent({ signupForm: [question] });
    expect(event.signupForm).toEqual([expect.objectContaining(question)]);
  });

  it("initialises a new enabled event without an explicit form", async () => {
    const event = await createEvent({ requiresSignup: true });
    expectDefaults(event);
    expect(event.signupForm).toHaveLength(8);
  });

  it.each([false, true])(
    "enables an existing event with submitted form: %s",
    async (submitForm) => {
      const event = await createEvent({ signupForm: [question] });
      const payload = await getPayload();
      const updated = await payload.update({
        collection: "events",
        id: event.id,
        data: { requiresSignup: true, ...(submitForm ? { signupForm: [question] } : {}) },
      });
      expectDefaults(updated);
      expect(updated.signupForm).toHaveLength(9);
      expect(updated.signupForm?.[8]).toMatchObject(question);
    },
  );

  it("preserves an admin-configured subset on creation and repeated saves", async () => {
    const event = await createEvent({ requiresSignup: true, signupForm: configured });
    expect(event.signupForm).toHaveLength(4);
    const payload = await getPayload();
    const saved = await payload.update({
      collection: "events",
      id: event.id,
      data: { event: "Renamed" },
    });
    expect(saved.signupForm).toEqual(event.signupForm);
  });

  it("does not restore removed optional details on save or re-enabling signup", async () => {
    const event = await createEvent({ requiresSignup: true });
    const payload = await getPayload();
    const edited = await payload.update({
      collection: "events",
      id: event.id,
      data: { signupForm: configured },
    });
    await payload.update({ collection: "events", id: event.id, data: { requiresSignup: false } });
    const enabled = await payload.update({
      collection: "events",
      id: event.id,
      data: { requiresSignup: true },
    });
    expect(enabled.signupForm).toEqual(edited.signupForm);
  });

  it("leaves already-enabled legacy forms unchanged on ordinary saves", async () => {
    const event = await createEvent({ signupForm: [question] });
    const payload = await getPayload();
    // Simulate data predating Member detail blocks without running create hooks.
    await payload.db.updateOne({
      collection: "events",
      id: event.id,
      data: { requiresSignup: true },
    });
    const updated = await payload.update({
      collection: "events",
      id: event.id,
      data: { requiresSignup: true, location: "New location" },
    });
    expect(updated.signupForm).toEqual(event.signupForm);
  });
});
