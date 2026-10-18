/* Shared by PersonalDetailsCard (inline errors) and the personal-details API route (the real guard) */

export const VALID_YEARS = [
  "year1",
  "year2",
  "year3",
  "year4",
  "year5Plus",
  "postgraduate",
] as const;

export type UniversityYear = (typeof VALID_YEARS)[number];

export type PersonalDetailsField =
  "firstName" | "lastName" | "studentId" | "phoneNumber" | "degrees" | "universityYear";

export type PersonalDetailsErrors = Partial<Record<PersonalDetailsField, string>>;

export const MAX_NAME_LENGTH = 50;
export const MAX_DEGREE_LENGTH = 100;

/* Letters in any language (incl. macrons), spaces, hyphens, apostrophes and full stops */
const NAME_PATTERN = /^[\p{L}\p{M}' ’.-]+$/u;
/* UoA student IDs are digits only - usually 9, older ones can be shorter */
const STUDENT_ID_PATTERN = /^\d{7,10}$/;
/* Digits plus common formatting characters, e.g. "021 123 4567" or "+64 (21) 123-4567" */
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;
const MIN_PHONE_DIGITS = 7;
const MAX_PHONE_DIGITS = 15; /* E.164 maximum */
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;

function validateName(value: string, label: string) {
  if (!value) return `${label} is required.`;
  if (value.length > MAX_NAME_LENGTH)
    return `${label} must be ${MAX_NAME_LENGTH} characters or less.`;
  if (!NAME_PATTERN.test(value)) return `${label} can only contain letters, spaces, - and '.`;
}

/*
 * Validates whichever fields are present - `undefined` means "not being updated" and is
 * skipped, so the route can accept partial updates. Strings are expected to be trimmed.
 */
export function validatePersonalDetails(details: {
  firstName?: unknown;
  lastName?: unknown;
  studentId?: unknown;
  phoneNumber?: unknown;
  degrees?: unknown;
  universityYear?: unknown;
}): PersonalDetailsErrors {
  const errors: PersonalDetailsErrors = {};
  const { firstName, lastName, studentId, phoneNumber, degrees, universityYear } = details;

  for (const [field, value] of Object.entries({ firstName, lastName, studentId, degrees })) {
    if (value !== undefined && typeof value !== "string") {
      errors[field as PersonalDetailsField] = "Invalid value.";
    }
  }

  if (typeof firstName === "string") {
    const error = validateName(firstName, "First name");
    if (error) errors.firstName = error;
  }

  if (typeof lastName === "string") {
    const error = validateName(lastName, "Last name");
    if (error) errors.lastName = error;
  }

  if (typeof studentId === "string") {
    if (!studentId) errors.studentId = "Student ID is required.";
    else if (!STUDENT_ID_PATTERN.test(studentId))
      errors.studentId = "Student ID must be 7-10 digits.";
  }

  if (phoneNumber !== undefined && phoneNumber !== null && phoneNumber !== "") {
    const digitCount = typeof phoneNumber === "string" ? phoneNumber.replace(/\D/g, "").length : 0;
    if (
      typeof phoneNumber !== "string" ||
      !PHONE_PATTERN.test(phoneNumber) ||
      digitCount < MIN_PHONE_DIGITS ||
      digitCount > MAX_PHONE_DIGITS
    ) {
      errors.phoneNumber = "Enter a valid phone number, e.g. 021 123 4567.";
    }
  }

  if (typeof degrees === "string") {
    if (!degrees) errors.degrees = "Degree is required.";
    else if (degrees.length > MAX_DEGREE_LENGTH)
      errors.degrees = `Degree must be ${MAX_DEGREE_LENGTH} characters or less.`;
    else if (CONTROL_CHARS.test(degrees)) errors.degrees = "Degree contains invalid characters.";
  }

  if (
    universityYear !== undefined &&
    universityYear !== null &&
    universityYear !== "" &&
    !VALID_YEARS.includes(universityYear as UniversityYear)
  ) {
    errors.universityYear = "Invalid year of study.";
  }

  return errors;
}
