import { MEMBER_DETAILS } from "./memberDetails";

const selectedDetails = (form: unknown): unknown[] =>
  Array.isArray(form)
    ? form.filter((block) => block?.blockType === "memberDetail").map((block) => block.detail)
    : [];

/** Previous selections distinguish a cleared configured form from a legacy form. */
export function validateMemberDetailSignupForm(
  value: unknown,
  previousValue?: unknown,
): true | string {
  const details = selectedDetails(value);
  if (details.length === 0 && selectedDetails(previousValue).length === 0) return true;

  const missing = MEMBER_DETAILS.filter(
    ({ value, required }) => required && !details.includes(value),
  );
  const duplicated = MEMBER_DETAILS.filter(
    ({ value }) => details.filter((detail) => detail === value).length > 1,
  );
  const errors: string[] = [];

  if (missing.length > 0) {
    errors.push(
      `Missing required member details: ${missing.map(({ label }) => label).join(", ")}.`,
    );
  }
  if (duplicated.length > 0) {
    errors.push(
      `Member details can appear only once: ${duplicated.map(({ label }) => label).join(", ")}.`,
    );
  }

  return errors.length > 0 ? errors.join(" ") : true;
}
