// Unit tier: Payload is mocked - only the onsite registration switch (#473) is
// under test. With it off the page must 404 without even looking up the event.
import { describe, it, expect, vi, afterEach } from "vitest";

const getPayload = vi.fn();
vi.mock("payload", () => ({ getPayload }));
vi.mock("@payload-config", () => ({ default: {} }));
vi.mock("@/features/events/data/getEventRegistrationStatuses", () => ({
  getEventRegistrationStatuses: vi.fn(),
}));

const { default: EventRegisterPage } = await import("./page");

afterEach(() => {
  vi.unstubAllEnvs();
  getPayload.mockReset();
});

const params = Promise.resolve({ id: "abc" });

describe("/events/[id]/register", () => {
  it("404s where onsite registration is off", async () => {
    vi.stubEnv("NEXT_PUBLIC_ONSITE_REGISTRATION", "");
    await expect(EventRegisterPage({ params })).rejects.toThrow(/NEXT_HTTP_ERROR_FALLBACK;404/);
    expect(getPayload).not.toHaveBeenCalled();
  });

  it("looks up the event where it's on", async () => {
    vi.stubEnv("NEXT_PUBLIC_ONSITE_REGISTRATION", "true");
    getPayload.mockResolvedValue({ findByID: vi.fn().mockRejectedValue(new Error("missing")) });
    // The event doesn't exist, so this still 404s - but only after the lookup.
    await expect(EventRegisterPage({ params })).rejects.toThrow(/NEXT_HTTP_ERROR_FALLBACK;404/);
    expect(getPayload).toHaveBeenCalled();
  });
});
