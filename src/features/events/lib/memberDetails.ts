import type { Member } from "../../../../payload-types";

// Labels and required rules belong to the application, not individual form blocks.
// Only the identity details are mandatory on event sign-up forms.
export const MEMBER_DETAILS = [
  { value: "firstName", label: "First name", required: true },
  { value: "lastName", label: "Last name", required: true },
  { value: "email", label: "Email", required: true },
  { value: "upi", label: "UPI", required: false },
  { value: "studentId", label: "Student ID", required: false },
  { value: "universityYear", label: "University year", required: false },
  { value: "degrees", label: "Degree(s)", required: false },
  { value: "majors", label: "Major(s)", required: false },
] as const satisfies readonly { value: keyof Member; label: string; required: boolean }[];

export type MemberDetail = (typeof MEMBER_DETAILS)[number]["value"];
