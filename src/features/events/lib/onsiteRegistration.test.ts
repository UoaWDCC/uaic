// Unit tier: reads one env var. Guards the per-environment switch for onsite
// registration (#473) - production leaves it unset, so anything but "true" is off.
import { describe, it, expect, vi, afterEach } from "vitest";
import { isOnsiteRegistrationLive } from "./onsiteRegistration";
import { getEventRegistrationHref, getEventSignInHref } from "./registrationStatus";

afterEach(() => vi.unstubAllEnvs());

describe("isOnsiteRegistrationLive", () => {
  it('is on only for "true"', () => {
    vi.stubEnv("NEXT_PUBLIC_ONSITE_REGISTRATION", "true");
    expect(isOnsiteRegistrationLive()).toBe(true);
  });

  it.each([undefined, "", "false", "TRUE", "1"])("is off for %j", (value) => {
    vi.stubEnv("NEXT_PUBLIC_ONSITE_REGISTRATION", value);
    expect(isOnsiteRegistrationLive()).toBe(false);
  });
});

describe("registration links", () => {
  it("point at the register page when it's on", () => {
    vi.stubEnv("NEXT_PUBLIC_ONSITE_REGISTRATION", "true");
    expect(getEventRegistrationHref("abc")).toBe("/events/abc/register");
    expect(getEventSignInHref("abc")).toBe("/login?redirect=%2Fevents%2Fabc%2Fregister");
  });

  it("don't point at the register page when it's off", () => {
    vi.stubEnv("NEXT_PUBLIC_ONSITE_REGISTRATION", "");
    expect(getEventRegistrationHref("abc")).toBeNull();
    expect(getEventSignInHref("abc")).toBe("/login");
  });
});
