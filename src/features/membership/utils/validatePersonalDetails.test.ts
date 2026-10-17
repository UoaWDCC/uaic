// Unit tier: pure function, no DB. Guards the personal-details route and dashboard edit form.
import { describe, it, expect } from "vitest";
import { validatePersonalDetails } from "./validatePersonalDetails";

const valid = {
  firstName: "Aroha",
  lastName: "Ngāti-O'Brien",
  studentId: "123456789",
  phoneNumber: "021 123 4567",
  degrees: "Bachelor of Commerce",
  universityYear: "year2",
};

describe("validatePersonalDetails", () => {
  it("accepts a fully valid set of details", () => {
    expect(validatePersonalDetails(valid)).toEqual({});
  });

  it("skips fields that are undefined (partial updates)", () => {
    expect(validatePersonalDetails({})).toEqual({});
    expect(validatePersonalDetails({ degrees: "BSc" })).toEqual({});
  });

  it.each([
    ["empty", ""],
    ["digits", "J0hn"],
    ["symbols", "<script>"],
    ["too long", "a".repeat(51)],
  ])("rejects a first name that is %s", (_, firstName) => {
    expect(validatePersonalDetails({ ...valid, firstName })).toHaveProperty("firstName");
  });

  it.each(["José", "Mary-Jane", "D'Arcy", "St. John", "Tūī"])("accepts the name %s", (name) => {
    expect(validatePersonalDetails({ ...valid, firstName: name })).toEqual({});
  });

  it.each(["", "12345", "12345678901", "12345678a", "1234 5678"])(
    "rejects student ID %j",
    (studentId) => {
      expect(validatePersonalDetails({ ...valid, studentId })).toHaveProperty("studentId");
    },
  );

  it.each(["1234567", "123456789", "1234567890"])("accepts student ID %s", (studentId) => {
    expect(validatePersonalDetails({ ...valid, studentId })).toEqual({});
  });

  it.each(["021 123 4567", "+64 21 123 4567", "(09) 123-4567", "0211234567"])(
    "accepts phone number %s",
    (phoneNumber) => {
      expect(validatePersonalDetails({ ...valid, phoneNumber })).toEqual({});
    },
  );

  it.each(["", null])("allows clearing the phone number with %j", (phoneNumber) => {
    expect(validatePersonalDetails({ ...valid, phoneNumber })).toEqual({});
  });

  it.each(["abc", "123", "021-ABC-4567", "+1234567890123456", "12+345678", 21123456])(
    "rejects phone number %j",
    (phoneNumber) => {
      expect(validatePersonalDetails({ ...valid, phoneNumber })).toHaveProperty("phoneNumber");
    },
  );

  it.each(["", "a".repeat(101), "BCom\u0000"])("rejects degree %j", (degrees) => {
    expect(validatePersonalDetails({ ...valid, degrees })).toHaveProperty("degrees");
  });

  it.each(["", null, "postgraduate"])("accepts year of study %j", (universityYear) => {
    expect(validatePersonalDetails({ ...valid, universityYear })).toEqual({});
  });

  it.each(["year9", 2, true])("rejects year of study %j", (universityYear) => {
    expect(validatePersonalDetails({ ...valid, universityYear })).toHaveProperty("universityYear");
  });

  it("rejects non-string values for text fields", () => {
    const errors = validatePersonalDetails({ firstName: 1, studentId: 123456789, degrees: [] });
    expect(Object.keys(errors).sort()).toEqual(["degrees", "firstName", "studentId"]);
  });
});
