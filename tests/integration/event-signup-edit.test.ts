// Integration test - see tests/README.md for the DATABASE_URI import-order
// gotcha this beforeAll works around, and why mongodb-memory-server is used.
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { NextRequest } from "next/server";
import type { getPayload as GetPayload } from "@/lib/payload";
import type { auth as Auth } from "@/lib/auth";
import type { PATCH as PatchHandler } from "@/app/api/event-signups/[id]/route";

describe("PATCH /api/event-signups/:id", () => {
  let mongod: MongoMemoryServer;
  let getPayload: typeof GetPayload;
  let auth: typeof Auth;
  let PATCH: typeof PatchHandler;

  let owner: { id: string; headers: Headers };
  let otherMember: { id: string; headers: Headers };

  let counter = 0;

  const FUTURE = "2099-01-01T18:00:00.000Z";
  const PAST = "2020-01-01T18:00:00.000Z";

  // Signs a member up through Better Auth for real, so the route reads a
  // genuine session cookie rather than a stub.
  const signUpMember = async (email: string) => {
    const { headers } = await auth.api.signUpEmail({
      body: { email, password: "Password123!", name: "Edit Test Member" },
      returnHeaders: true,
    });

    const cookie = headers.get("set-cookie")?.split(";")[0];
    if (!cookie) {
      throw new Error(`Better Auth returned no session cookie for ${email}`);
    }

    const requestHeaders = new Headers({ cookie });
    const session = await auth.api.getSession({ headers: requestHeaders });

    if (!session?.user?.id) {
      throw new Error(`Could not resolve a session for ${email}`);
    }

    return { id: session.user.id, headers: requestHeaders };
  };

  // Each case gets its own event, since a member can only sign up once per event.
  const createSignup = async (cutoffs: { startDate?: string; editCutoff?: string } = {}) => {
    const payload = await getPayload();
    counter += 1;

    const event = await payload.create({
      collection: "events",
      data: {
        event: `Edit Test Event ${counter}`,
        startDate: cutoffs.startDate ?? FUTURE,
        endDate: FUTURE,
        location: "Test Location",
        description: "An event used by the edit signup integration test.",
        requiresSignup: true,
        editCutoff: cutoffs.editCutoff,
        signupForm: [
          { blockType: "formField", label: "Why are you coming?", fieldType: "shortText" },
          {
            blockType: "formField",
            label: "Year",
            fieldType: "dropdown",
            required: true,
            options: [{ option: "First" }, { option: "Second" }],
          },
        ],
      },
    });

    return payload.create({
      collection: "event-signups",
      data: {
        event: event.id,
        member: owner.id,
        status: "confirmed",
        responses: [{ fieldLabel: "Year", value: "First" }],
      },
    });
  };

  const patch = (id: string, body: unknown, headers?: Headers) =>
    PATCH(
      new NextRequest(`http://localhost:3000/api/event-signups/${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(body),
      }),
      { params: Promise.resolve({ id }) },
    );

  const getResponses = async (id: string) => {
    const payload = await getPayload();
    const signup = await payload.findByID({ collection: "event-signups", id, depth: 0 });

    return signup.responses?.map(({ fieldLabel, value }) => ({ fieldLabel, value }));
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
    ({ PATCH } = await import("@/app/api/event-signups/[id]/route"));

    [owner, otherMember] = await Promise.all([
      signUpMember("edit-owner@aucklanduni.ac.nz"),
      signUpMember("edit-other@aucklanduni.ac.nz"),
    ]);
  }, 60_000);

  afterAll(async () => {
    await mongod.stop();
  });

  it("updates responses and leaves status alone", async () => {
    const signup = await createSignup();

    const response = await patch(
      signup.id,
      { responses: [{ fieldLabel: "Year", value: "Second" }], status: "cancelled" },
      owner.headers,
    );

    expect(response.status).toBe(200);

    const payload = await getPayload();
    const updated = await payload.findByID({
      collection: "event-signups",
      id: signup.id,
      depth: 0,
    });

    expect(updated.status).toBe("confirmed");
    expect(await getResponses(signup.id)).toEqual([{ fieldLabel: "Year", value: "Second" }]);
  });

  it("rejects a request with no session", async () => {
    const signup = await createSignup();

    const response = await patch(signup.id, {
      responses: [{ fieldLabel: "Year", value: "Second" }],
    });

    expect(response.status).toBe(401);
    expect(await getResponses(signup.id)).toEqual([{ fieldLabel: "Year", value: "First" }]);
  });

  it("rejects editing another member's signup", async () => {
    const signup = await createSignup();

    const response = await patch(
      signup.id,
      { responses: [{ fieldLabel: "Year", value: "Second" }] },
      otherMember.headers,
    );

    expect(response.status).toBe(403);
    expect(await getResponses(signup.id)).toEqual([{ fieldLabel: "Year", value: "First" }]);
  });

  it("returns 404 for a signup that does not exist", async () => {
    const response = await patch(
      "000000000000000000000000",
      { responses: [{ fieldLabel: "Year", value: "Second" }] },
      owner.headers,
    );

    expect(response.status).toBe(404);
  });

  it("rejects an edit after editCutoff", async () => {
    const signup = await createSignup({ editCutoff: PAST });

    const response = await patch(
      signup.id,
      { responses: [{ fieldLabel: "Year", value: "Second" }] },
      owner.headers,
    );

    expect(response.status).toBe(403);
    expect(await getResponses(signup.id)).toEqual([{ fieldLabel: "Year", value: "First" }]);
  });

  it("falls back to startDate when editCutoff is empty", async () => {
    const signup = await createSignup({ startDate: PAST });

    const response = await patch(
      signup.id,
      { responses: [{ fieldLabel: "Year", value: "Second" }] },
      owner.headers,
    );

    expect(response.status).toBe(403);
  });

  it("rejects responses that do not match the event's signupForm", async () => {
    const signup = await createSignup();

    const response = await patch(
      signup.id,
      { responses: [{ fieldLabel: "Year", value: "Fifth" }] },
      owner.headers,
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({
      details: ['"Fifth" is not a valid option for "Year"'],
    });
    expect(await getResponses(signup.id)).toEqual([{ fieldLabel: "Year", value: "First" }]);
  });
});
