import { describe, it, expect } from "vitest";
import { validateSignupResponses, type SignupFormField } from "./validateSignupResponses";

const form: SignupFormField[] = [
  { label: "Dietary requirements", fieldType: "shortText", required: false },
  { label: "Why are you coming?", fieldType: "paragraph", required: true },
  {
    label: "Year",
    fieldType: "dropdown",
    required: true,
    options: [{ option: "First" }, { option: "Second" }],
  },
  {
    label: "Topics",
    fieldType: "checkboxes",
    options: [{ option: "Equities" }, { option: "Crypto" }, { option: "Bonds" }],
  },
];

const valid = [
  { fieldLabel: "Why are you coming?", value: "To learn" },
  { fieldLabel: "Year", value: "Second" },
];

describe("validateSignupResponses", () => {
  it("accepts responses that satisfy the form", () => {
    expect(validateSignupResponses(form, valid)).toEqual({ ok: true, responses: valid });
  });

  it("drops unanswered optional questions and trims values", () => {
    const result = validateSignupResponses(form, [
      ...valid,
      { fieldLabel: "Dietary requirements", value: "   " },
      { fieldLabel: "Topics", value: " Equities, Bonds " },
    ]);

    expect(result).toEqual({
      ok: true,
      responses: [...valid, { fieldLabel: "Topics", value: "Equities, Bonds" }],
    });
  });

  it("rejects a missing or blank required answer", () => {
    const result = validateSignupResponses(form, [
      { fieldLabel: "Why are you coming?", value: "  " },
    ]);

    expect(result).toEqual({
      ok: false,
      errors: ['"Why are you coming?" is required', '"Year" is required'],
    });
  });

  it("rejects an answer that is not one of the options", () => {
    const result = validateSignupResponses(form, [
      { fieldLabel: "Why are you coming?", value: "To learn" },
      { fieldLabel: "Year", value: "Fifth" },
      { fieldLabel: "Topics", value: "Equities,Property" },
    ]);

    expect(result).toEqual({
      ok: false,
      errors: [
        '"Fifth" is not a valid option for "Year"',
        '"Property" is not a valid option for "Topics"',
      ],
    });
  });

  it("rejects unknown and duplicated questions", () => {
    const result = validateSignupResponses(form, [
      ...valid,
      { fieldLabel: "Year", value: "First" },
      { fieldLabel: "Favourite colour", value: "Blue" },
    ]);

    expect(result).toEqual({
      ok: false,
      errors: [
        '"Year" was answered more than once',
        '"Favourite colour" is not a question on this event\'s sign-up form',
      ],
    });
  });

  it("rejects a payload that is not a list of string pairs", () => {
    expect(validateSignupResponses(form, "nope").ok).toBe(false);
    expect(validateSignupResponses(form, [{ fieldLabel: "Year", value: 2 }]).ok).toBe(false);
    expect(validateSignupResponses(form, [null]).ok).toBe(false);
  });

  it("treats a missing form or missing responses as empty", () => {
    expect(validateSignupResponses(null, undefined)).toEqual({ ok: true, responses: [] });
    expect(validateSignupResponses(form, undefined).ok).toBe(false);
  });
});
