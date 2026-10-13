// Unit tier: pure function, no DB. Guards how phone numbers show on the member dashboard.
import { describe, it, expect } from "vitest";
import { maskPhoneNumber } from "./maskPhoneNumber";

describe("maskPhoneNumber", () => {
  it.each([
    ["0211234567", "••• ••• ••67"],
    ["021 123 4567", "••• ••• ••67"],
    ["09 123 4567", "••• ••• •67"],
    ["+64 21 555 0123", "••• ••• •••23"],
    ["12345", "••• 45"],
  ])("masks %s as %s", (input, expected) => {
    expect(maskPhoneNumber(input)).toBe(expected);
  });

  it("shows a dash when there is no number", () => {
    expect(maskPhoneNumber("")).toBe("—");
  });

  it("leaves very short values as they are", () => {
    expect(maskPhoneNumber("12")).toBe("12");
  });
});
