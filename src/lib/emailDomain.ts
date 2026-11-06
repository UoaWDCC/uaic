export const UOA_EMAIL_DOMAIN = "aucklanduni.ac.nz";

// Exact match on the domain after the final "@" - never endsWith/includes, which
// would let lookalikes like "aucklanduni.ac.nz.evil.com" through.
export function isUoAEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const parts = email.trim().toLowerCase().split("@");
  // Exactly one "@", with a non-empty local part.
  return parts.length === 2 && parts[0].length > 0 && parts[1] === UOA_EMAIL_DOMAIN;
}
