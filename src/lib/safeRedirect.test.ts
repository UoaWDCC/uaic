// Unit tier: pure function, no DB. Guards the post-sign-in redirect in LoginForm.
import { describe, it, expect } from "vitest";
import { safeRedirectPath } from "./safeRedirect";

describe("safeRedirectPath", () => {
  it.each(["/events/abc/register", "/dashboard?tab=events", "/events#upcoming"])(
    "keeps same-site path %j",
    (path) => {
      expect(safeRedirectPath(path)).toBe(path);
    },
  );

  it.each([
    ["missing", undefined],
    ["array (repeated param)", ["/a", "/b"]],
    ["empty", ""],
    ["relative", "events"],
    ["absolute URL", "https://evil.com"],
    ["protocol-relative", "//evil.com"],
    ["backslash", "/\\evil.com"],
    ["tab-smuggled host", "/\t/evil.com"],
    ["javascript URL", "javascript:alert(1)"],
  ])("falls back for %s", (_label, value) => {
    expect(safeRedirectPath(value)).toBe("/dashboard");
  });

  it("uses the given fallback", () => {
    expect(safeRedirectPath(undefined, "/")).toBe("/");
  });
});
