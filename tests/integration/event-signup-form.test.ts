import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
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

describe("event signup form initialisation and validation (Payload + Mongo)", () => {
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

  afterEach(() => vi.unstubAllEnvs());

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

  const expectFormError = async (save: Promise<unknown>, message: string) => {
    await expect(save).rejects.toMatchObject({
      data: {
        errors: expect.arrayContaining([expect.objectContaining({ path: "signupForm", message })]),
      },
    });
  };

  it.each([
    ["firstName", "First name"],
    ["lastName", "Last name"],
    ["email", "Email"],
  ])("rejects missing %s on creation and partial form updates", async (detail, label) => {
    const incomplete = configured.filter(
      (block) => block.blockType !== "memberDetail" || block.detail !== detail,
    );
    const message = `Missing required member details: ${label}.`;
    await expectFormError(createEvent({ requiresSignup: true, signupForm: incomplete }), message);

    const event = await createEvent({ requiresSignup: true });
    const payload = await getPayload();
    await expectFormError(
      payload.update({
        collection: "events",
        id: event.id,
        data: { signupForm: incomplete },
      }),
      message,
    );
  });

  it.each([
    ["firstName", "First name"],
    ["lastName", "Last name"],
    ["email", "Email"],
    ["upi", "UPI"],
    ["studentId", "Student ID"],
    ["universityYear", "University year"],
    ["degrees", "Degree(s)"],
    ["majors", "Major(s)"],
  ] as const)("rejects duplicate %s on creation and update", async (detail, label) => {
    const event = await createEvent({ requiresSignup: true });
    const duplicated: NonNullable<Event["signupForm"]> = [
      ...event.signupForm!,
      { blockType: "memberDetail", detail },
    ];
    const message = `Member details can appear only once: ${label}.`;
    await expectFormError(createEvent({ requiresSignup: true, signupForm: duplicated }), message);
    const payload = await getPayload();
    await expectFormError(
      payload.update({
        collection: "events",
        id: event.id,
        data: { signupForm: duplicated },
      }),
      message,
    );
  });

  it("reports all missing and duplicated details together", async () => {
    await expectFormError(
      createEvent({
        requiresSignup: true,
        signupForm: [
          { blockType: "memberDetail", detail: "upi" },
          { blockType: "memberDetail", detail: "upi" },
        ],
      }),
      "Missing required member details: First name, Last name, Email. Member details can appear only once: UPI.",
    );
  });

  it.each([{ signupForm: [] }, { signupForm: null }, { signupForm: [question] }])(
    "rejects clearing every member detail with %j",
    async ({ signupForm }) => {
      const event = await createEvent({ requiresSignup: true });
      const payload = await getPayload();
      await expectFormError(
        payload.update({
          collection: "events",
          id: event.id,
          data: { signupForm },
        }),
        "Missing required member details: First name, Last name, Email.",
      );
      const unchanged = await payload.findByID({ collection: "events", id: event.id });
      expect(unchanged.signupForm).toEqual(event.signupForm);
    },
  );

  it("allows all five optional details to be removed and preserves them on partial updates", async () => {
    const event = await createEvent({ requiresSignup: true });
    const payload = await getPayload();
    const edited = await payload.update({
      collection: "events",
      id: event.id,
      data: { signupForm: configured },
    });
    expect(edited.signupForm).toEqual(configured.map((block) => expect.objectContaining(block)));
    const saved = await payload.update({
      collection: "events",
      id: event.id,
      data: { location: "Elsewhere" },
    });
    expect(saved.signupForm).toEqual(edited.signupForm);
  });

  it.each(["true", "false"])(
    "cannot bypass validation with the feature flag %s or signup disabled",
    async (featureFlag) => {
      vi.stubEnv("NEXT_PUBLIC_ONSITE_REGISTRATION", featureFlag);
      const event = await createEvent({ requiresSignup: true });
      const payload = await getPayload();
      await expectFormError(
        payload.update({
          collection: "events",
          id: event.id,
          data: { requiresSignup: false, signupForm: [question] },
        }),
        "Missing required member details: First name, Last name, Email.",
      );
      await payload.update({ collection: "events", id: event.id, data: { requiresSignup: false } });
      await expectFormError(
        payload.update({
          collection: "events",
          id: event.id,
          data: { requiresSignup: true, signupForm: [] },
        }),
        "Missing required member details: First name, Last name, Email.",
      );
    },
  );

  it.each([{ signupForm: null }, { signupForm: [] }, { signupForm: [question] }])(
    "preserves legacy form %j through partial updates and custom question edits",
    async ({ signupForm }) => {
      const event = await createEvent({ signupForm });
      const payload = await getPayload();
      await payload.db.updateOne({
        collection: "events",
        id: event.id,
        data: { requiresSignup: true },
      });
      const saved = await payload.update({
        collection: "events",
        id: event.id,
        data: { event: "Legacy event renamed" },
      });
      expect(saved.signupForm).toEqual(event.signupForm);
      const edited = await payload.update({
        collection: "events",
        id: event.id,
        data: { signupForm: [question] },
      });
      expect(edited.signupForm).toEqual([expect.objectContaining(question)]);
      const cleared = await payload.update({
        collection: "events",
        id: event.id,
        data: { signupForm: [] },
      });
      expect(cleared.signupForm ?? []).toEqual([]);
    },
  );

  it("requires mandatory details when a legacy form adopts member detail blocks", async () => {
    const event = await createEvent({ signupForm: [question] });
    const payload = await getPayload();
    await payload.db.updateOne({
      collection: "events",
      id: event.id,
      data: { requiresSignup: true },
    });
    await expectFormError(
      payload.update({
        collection: "events",
        id: event.id,
        data: { signupForm: [{ blockType: "memberDetail", detail: "email" }, question] },
      }),
      "Missing required member details: First name, Last name.",
    );
    await payload.update({ collection: "events", id: event.id, data: { signupForm: configured } });
    await expectFormError(
      payload.update({ collection: "events", id: event.id, data: { signupForm: [question] } }),
      "Missing required member details: First name, Last name, Email.",
    );
  });
});
