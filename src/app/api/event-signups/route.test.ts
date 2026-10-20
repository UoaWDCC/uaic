// Unit tier: auth and Payload are mocked - only the onsite registration switch
// (#473) is under test. The full create flow is covered in
// tests/integration/event-signups.test.ts.
import { describe, it, expect, vi, afterEach } from "vitest";
import { NextRequest } from "next/server";

const getSession = vi.fn().mockResolvedValue(null);
vi.mock("@/lib/auth", () => ({ auth: { api: { getSession } } }));
vi.mock("@payload-config", () => ({ default: {} }));
vi.mock("next/headers", () => ({ headers: async () => new Headers() }));

const { POST } = await import("./route");

const request = () =>
  new NextRequest("http://localhost/api/event-signups", {
    method: "POST",
    body: JSON.stringify({ event: "abc" }),
  });

afterEach(() => {
  vi.unstubAllEnvs();
  getSession.mockClear();
});

describe("POST /api/event-signups", () => {
  it("refuses signups where onsite registration is off, before checking the session", async () => {
    vi.stubEnv("NEXT_PUBLIC_ONSITE_REGISTRATION", "");
    const res = await POST(request());
    expect(res.status).toBe(404);
    expect(getSession).not.toHaveBeenCalled();
  });

  it("carries on to the session check where it's on", async () => {
    vi.stubEnv("NEXT_PUBLIC_ONSITE_REGISTRATION", "true");
    const res = await POST(request());
    expect(res.status).toBe(401);
    expect(getSession).toHaveBeenCalled();
  });
});
