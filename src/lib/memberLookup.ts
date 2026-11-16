import type { Where } from "payload";

/** Trimmed string, or undefined for blank values (and the old "-1" form default). **/
export function cleanIdentifier(value: unknown): string | undefined {
  const cleaned = value == null ? "" : String(value).trim();
  return cleaned && cleaned !== "-1" ? cleaned : undefined;
}

/**
 * "Does this member already exist?" query. Blank identifiers are left out, because
 * non-UoA members have no UPI or student ID and would otherwise collide with each other.
 * Returns null when there is nothing to match on.
 **/
export function memberIdentityWhere(ids: {
  email?: unknown;
  upi?: unknown;
  studentId?: unknown;
}): Where | null {
  const email = cleanIdentifier(ids.email);
  const upi = cleanIdentifier(ids.upi);
  const studentId = cleanIdentifier(ids.studentId);

  const or: Where[] = [];
  if (email) or.push({ email: { equals: email } });
  if (upi) or.push({ upi: { equals: upi } });
  if (studentId) or.push({ studentId: { equals: studentId } });

  return or.length > 0 ? { or } : null;
}
