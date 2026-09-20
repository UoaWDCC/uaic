// Integration test - see tests/README.md for the DATABASE_URI import-order
// gotcha this beforeAll works around, and why mongodb-memory-server is used.
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import type { getPayload as GetPayload } from "@/lib/payload";

describe("EventSignups collection (unique event+member index)", () => {
  let mongod: MongoMemoryServer;
  let getPayload: typeof GetPayload;

  // Each case needs its own member/event, since the whole point of the index
  // is that a pair can only be used once.
  let counter = 0;

  const createMember = async () => {
    const payload = await getPayload();
    counter += 1;

    return payload.create({
      collection: "member",
      data: {
        firstName: "Test",
        lastName: `Member ${counter}`,
        email: `member-${counter}@example.com`,
        upi: `tmem${counter}`,
        studentId: `10000000${counter}`,
        gender: "preferNotToSay",
        universityYear: "year1",
        memberType: "newMember",
        degrees: "BSc",
        majors: "Computer Science",
        ethnicity: "preferNotToSay",
        hasPaid: false,
      },
    });
  };

  const createEvent = async () => {
    const payload = await getPayload();
    counter += 1;

    return payload.create({
      collection: "events",
      data: {
        event: `Test Event ${counter}`,
        startDate: new Date("2026-01-01T18:00:00.000Z").toISOString(),
        endDate: new Date("2026-01-01T20:00:00.000Z").toISOString(),
        location: "Test Location",
        description: "An event used by the EventSignups integration test.",
      },
    });
  };

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    process.env.DATABASE_URI = mongod.getUri();
    process.env.PAYLOAD_SECRET ||= "integration-test-secret";

    // dynamic import - runs *after* the env vars above are set, unlike a
    // static top-level import, which would be hoisted and run too early.
    ({ getPayload } = await import("@/lib/payload"));

    // Mongoose only builds indexes once the collection is touched, and nothing
    // makes writes wait for that - without this the first duplicate insert can
    // land before the unique index exists, so these tests would pass or fail
    // depending on timing. Deliberately not optional-chained: if the slug ever
    // changes, this should throw rather than quietly skip the index build and
    // leave the assertions below racing.
    const payload = await getPayload();
    await payload.db.collections["event-signups"].createIndexes();
  }, 60_000);

  afterAll(async () => {
    await mongod.stop();
  });

  it("declares the compound index as unique in MongoDB itself", async () => {
    const payload = await getPayload();
    const indexes = await payload.db.connection.db!.collection("event-signups").indexes();

    const compound = indexes.find((index) => index.name === "event_1_member_1");

    expect(compound).toBeDefined();
    expect(compound!.key).toEqual({ event: 1, member: 1 });
    expect(compound!.unique).toBe(true);
  });

  it("rejects a second signup for the same member and event", async () => {
    const payload = await getPayload();
    const [member, event] = await Promise.all([createMember(), createEvent()]);

    const first = await payload.create({
      collection: "event-signups",
      data: { event: event.id, member: member.id, status: "confirmed" },
    });

    expect(first.id).toBeDefined();

    // Payload's mongo adapter turns the driver's E11000 duplicate-key error
    // into a ValidationError - that's what the signup route will catch to
    // return a clean "you've already signed up" response.
    await expect(
      payload.create({
        collection: "event-signups",
        data: { event: event.id, member: member.id, status: "confirmed" },
      }),
    ).rejects.toMatchObject({
      name: "ValidationError",
    });

    const { totalDocs } = await payload.count({
      collection: "event-signups",
      where: { event: { equals: event.id }, member: { equals: member.id } },
    });

    expect(totalDocs).toBe(1);
  });

  it("allows different members to sign up for the same event", async () => {
    const payload = await getPayload();
    const [memberA, memberB, event] = await Promise.all([
      createMember(),
      createMember(),
      createEvent(),
    ]);

    await payload.create({
      collection: "event-signups",
      data: { event: event.id, member: memberA.id, status: "confirmed" },
    });

    await expect(
      payload.create({
        collection: "event-signups",
        data: { event: event.id, member: memberB.id, status: "confirmed" },
      }),
    ).resolves.toBeDefined();
  });

  it("allows one member to sign up for different events", async () => {
    const payload = await getPayload();
    const [member, eventA, eventB] = await Promise.all([
      createMember(),
      createEvent(),
      createEvent(),
    ]);

    await payload.create({
      collection: "event-signups",
      data: { event: eventA.id, member: member.id, status: "confirmed" },
    });

    await expect(
      payload.create({
        collection: "event-signups",
        data: { event: eventB.id, member: member.id, status: "confirmed" },
      }),
    ).resolves.toBeDefined();
  });

  // The index covers (event, member) only - `status` is not part of it, so a
  // cancelled row still occupies the pair. This is a property of the constraint
  // itself, not of any route: it's what rules out "cancel, then insert again".
  it("still rejects a duplicate when the existing signup is cancelled", async () => {
    const payload = await getPayload();
    const [member, event] = await Promise.all([createMember(), createEvent()]);

    const signup = await payload.create({
      collection: "event-signups",
      data: { event: event.id, member: member.id, status: "confirmed" },
    });

    await payload.update({
      collection: "event-signups",
      id: signup.id,
      data: { status: "cancelled" },
    });

    await expect(
      payload.create({
        collection: "event-signups",
        data: { event: event.id, member: member.id, status: "confirmed" },
      }),
    ).rejects.toMatchObject({ name: "ValidationError" });
  });
});
