import type { MemberProfile, SessionUser } from "../types";

type PersonalDetailsInput = Pick<
  MemberProfile,
  "firstName" | "lastName" | "studentId" | "degrees" | "universityYear" | "phoneNumber"
>;

export async function savePersonalDetails(
  details: PersonalDetailsInput,
  user: Pick<SessionUser, "email">,
): Promise<void> {
  const response = await fetch("/api/accounts/personal-details", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: details.firstName.trim(),
      lastName: details.lastName.trim(),
      email: user.email.trim(),
      studentId: details.studentId.trim(),
      degrees: details.degrees.trim(),
      universityYear: details.universityYear ?? null,
      phoneNumber: details.phoneNumber?.trim() ?? null,
    }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? "Failed to update details");
  }
}
