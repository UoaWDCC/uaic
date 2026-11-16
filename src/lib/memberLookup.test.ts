import { describe, expect, it } from "vitest";
import { cleanIdentifier, memberIdentityWhere } from "./memberLookup";

describe("cleanIdentifier", () => {
  it.each([undefined, null, "", "   ", "-1", -1])("treats %j as blank", (value) => {
    expect(cleanIdentifier(value)).toBeUndefined();
  });

  it("trims and stringifies", () => {
    expect(cleanIdentifier("  abcd123 ")).toBe("abcd123");
    expect(cleanIdentifier(123456789)).toBe("123456789");
  });
});

describe("memberIdentityWhere", () => {
  it("matches on all three identifiers for UoA members", () => {
    expect(
      memberIdentityWhere({ email: "a@aucklanduni.ac.nz", upi: "abcd123", studentId: "123456789" }),
    ).toEqual({
      or: [
        { email: { equals: "a@aucklanduni.ac.nz" } },
        { upi: { equals: "abcd123" } },
        { studentId: { equals: "123456789" } },
      ],
    });
  });

  it("matches on email only for non-UoA members, so blanks can't collide", () => {
    expect(memberIdentityWhere({ email: "a@gmail.com", upi: "", studentId: undefined })).toEqual({
      or: [{ email: { equals: "a@gmail.com" } }],
    });
  });

  it("returns null when there is nothing to match on", () => {
    expect(memberIdentityWhere({})).toBeNull();
  });
});
