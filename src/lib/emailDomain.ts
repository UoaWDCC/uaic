export const ALLOWED_EMAIL_DOMAIN = "aucklanduni.ac.nz";

// Exact match on the domain after the final "@" - never endsWith/includes, which
// would let lookalikes like "aucklanduni.ac.nz.evil.com" through.
export function isAllowedEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const parts = email.trim().toLowerCase().split("@");
  // Exactly one "@", with a non-empty local part.
  return parts.length === 2 && parts[0].length > 0 && parts[1] === ALLOWED_EMAIL_DOMAIN;
}

// Shared by the server hook and the sign-up form. The code doubles as the ?error= value
// better-auth puts on the redirect when a Google sign-up is rejected.
export const EMAIL_DOMAIN_NOT_ALLOWED = "EMAIL_DOMAIN_NOT_ALLOWED";
export const EMAIL_DOMAIN_NOT_ALLOWED_MESSAGE = `Sign up is limited to University of Auckland students. Please use your @${ALLOWED_EMAIL_DOMAIN} email.`;
