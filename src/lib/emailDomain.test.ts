// Unit tier: pure function, no DB. Guards the signup domain check in lib/auth.ts.
import { describe, it, expect } from "vitest";
import { isUoAEmail } from "./emailDomain";

describe("isUoAEmail", () => {
  it.each([
    "abcd123@aucklanduni.ac.nz",
    "ABCD123@AucklandUni.ac.nz",
    "  abcd123@aucklanduni.ac.nz  ",
    "first.last+tag@aucklanduni.ac.nz",
  ])("accepts uni email %j", (email) => {
    expect(isUoAEmail(email)).toBe(true);
  });

  it.each(["person@gmail.com", "person@auckland.ac.nz", "person@outlook.com", "person@uoa.nz"])(
    "rejects non-uni email %j",
    (email) => {
      expect(isUoAEmail(email)).toBe(false);
    },
  );

  it.each([
    ["suffix lookalike", "abcd123@aucklanduni.ac.nz.evil.com"],
    ["prefix lookalike", "abcd123@evil-aucklanduni.ac.nz"],
    ["subdomain", "abcd123@mail.aucklanduni.ac.nz"],
    ["uni domain in local part", "aucklanduni.ac.nz@gmail.com"],
    ["double @, uni last", "evil@gmail.com@aucklanduni.ac.nz"],
    ["double @, uni first", "abcd123@aucklanduni.ac.nz@gmail.com"],
    ["trailing dot", "abcd123@aucklanduni.ac.nz."],
    ["similar TLD", "abcd123@aucklanduni.ac.nz.com"],
  ])("rejects tricky address: %s", (_label, email) => {
    expect(isUoAEmail(email)).toBe(false);
  });

  it.each([
    ["empty string", ""],
    ["whitespace", "   "],
    ["no @", "aucklanduni.ac.nz"],
    ["no local part", "@aucklanduni.ac.nz"],
    ["no domain", "abcd123@"],
  ])("rejects malformed input: %s", (_label, email) => {
    expect(isUoAEmail(email)).toBe(false);
  });

  it.each([undefined, null, 123, {}])("rejects non-string input %j", (value) => {
    expect(isUoAEmail(value)).toBe(false);
  });
});
