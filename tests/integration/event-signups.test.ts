// Integration test - see tests/README.md for the DATABASE_URI import-order
// gotcha this beforeAll works around, and why mongodb-memory-server is used.
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import type { getPayload as GetPayload } from "@/lib/payload";
import type { auth as Auth } from "@/lib/auth";

describe("EventSignups collection", () => {
  let mongod: MongoMemoryServer;
  let getPayload: typeof GetPayload;
  let auth: typeof Auth;

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
    process.env.BETTER_AUTH_SECRET ||= "integration-test-secret";
    process.env.BETTER_AUTH_URL ||= "http://localhost:3000";

    // dynamic import - runs *after* the env vars above are set, unlike a
    // static top-level import, which would be hoisted and run too early.
    ({ getPayload } = await import("@/lib/payload"));
    ({ auth } = await import("@/lib/auth"));

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

  describe("unique (event, member) index", () => {
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

  describe("read access", () => {
    let eventId: string;
    let memberA: { id: string; headers: Headers };
    let memberB: { id: string; headers: Headers };
    let signupAId: string;
    let signupBId: string;
    let staffUser: Awaited<ReturnType<Awaited<ReturnType<typeof GetPayload>>["create"]>>;

    // Signs a member up through Better Auth for real, rather than faking a
    // session - the access function reads the session cookie off the request,
    // so a hand-rolled stub would not exercise the code path that matters.
    const signUpMember = async (email: string) => {
      const { headers } = await auth.api.signUpEmail({
        body: { email, password: "Password123!", name: "Access Test Member" },
        returnHeaders: true,
      });

      const setCookie = headers.get("set-cookie");
      if (!setCookie) {
        throw new Error(`Better Auth returned no session cookie for ${email}`);
      }

      const cookie = setCookie.split(";")[0];
      const requestHeaders = new Headers({ cookie });
      const session = await auth.api.getSession({ headers: requestHeaders });

      if (!session?.user?.id) {
        throw new Error(`Could not resolve a session for ${email}`);
      }

      return { id: session.user.id, headers: requestHeaders };
    };

    beforeAll(async () => {
      const payload = await getPayload();

      const event = await createEvent();
      eventId = event.id;

      [memberA, memberB] = await Promise.all([
        signUpMember("access-a@example.com"),
        signUpMember("access-b@example.com"),
      ]);

      const [signupA, signupB] = await Promise.all([
        payload.create({
          collection: "event-signups",
          data: { event: eventId, member: memberA.id, status: "confirmed" },
        }),
        payload.create({
          collection: "event-signups",
          data: { event: eventId, member: memberB.id, status: "confirmed" },
        }),
      ]);

      signupAId = signupA.id;
      signupBId = signupB.id;

      staffUser = await payload.create({
        collection: "users",
        data: { email: "staff@example.com", password: "Password123!", role: "admin" },
      });
    }, 60_000);

    // Guards the trap this whole block depends on: Payload's Local API defaults
    // to overrideAccess: true, so a find() written the obvious way never calls
    // the access function at all. If that default ever changed, the assertions
    // below would still pass while proving nothing - so assert it directly.
    it("skips access control entirely when overrideAccess is left at its default", async () => {
      const payload = await getPayload();

      const { totalDocs } = await payload.find({
        collection: "event-signups",
        where: { event: { equals: eventId } },
        depth: 0,
      });

      expect(totalDocs).toBe(2);
    });

    it("lets staff read every signup", async () => {
      const payload = await getPayload();

      const { totalDocs } = await payload.find({
        collection: "event-signups",
        where: { event: { equals: eventId } },
        overrideAccess: false,
        user: staffUser,
        depth: 0,
      });

      expect(totalDocs).toBe(2);
    });

    it("narrows a member to their own signups", async () => {
      const payload = await getPayload();

      const { docs, totalDocs } = await payload.find({
        collection: "event-signups",
        where: { event: { equals: eventId } },
        overrideAccess: false,
        req: { headers: memberA.headers },
        depth: 0,
      });

      expect(totalDocs).toBe(1);
      expect(docs[0].id).toBe(signupAId);
      expect(docs[0].member).toBe(memberA.id);
    });

    it("hides another member's signup from a direct lookup by id", async () => {
      const payload = await getPayload();

      // memberB's own row is readable...
      await expect(
        payload.findByID({
          collection: "event-signups",
          id: signupBId,
          overrideAccess: false,
          req: { headers: memberB.headers },
          depth: 0,
        }),
      ).resolves.toMatchObject({ id: signupBId });

      // ...but the same row is not reachable by memberA, even knowing its id.
      // The access `where` excludes it, so it reads as missing rather than
      // forbidden - which also avoids confirming the row exists.
      await expect(
        payload.findByID({
          collection: "event-signups",
          id: signupBId,
          overrideAccess: false,
          req: { headers: memberA.headers },
          depth: 0,
        }),
      ).rejects.toMatchObject({ name: "NotFound", status: 404 });
    });

    it("denies a request carrying no session at all", async () => {
      const payload = await getPayload();

      // read returns false, which executeAccess turns into Forbidden.
      await expect(
        payload.find({
          collection: "event-signups",
          where: { event: { equals: eventId } },
          overrideAccess: false,
          req: { headers: new Headers() },
          depth: 0,
        }),
      ).rejects.toMatchObject({ name: "Forbidden", status: 403 });
    });

    it("denies a request carrying a junk session cookie", async () => {
      const payload = await getPayload();

      await expect(
        payload.find({
          collection: "event-signups",
          where: { event: { equals: eventId } },
          overrideAccess: false,
          req: { headers: new Headers({ cookie: "better-auth.session_token=not-a-real-token" }) },
          depth: 0,
        }),
      ).rejects.toMatchObject({ name: "Forbidden", status: 403 });
    });
  });
});
