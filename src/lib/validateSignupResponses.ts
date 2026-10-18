export type SignupFormField = {
  label: string;
  fieldType: "shortText" | "paragraph" | "multipleChoice" | "checkboxes" | "dropdown";
  required?: boolean | null;
  options?: { option: string }[] | null;
};

export type SignupResponse = {
  fieldLabel: string;
  value: string;
};

type ValidationResult = { ok: true; responses: SignupResponse[] } | { ok: false; errors: string[] };

// Checkboxes allow several answers, but a response's `value` is a single text
// field - multiple selections are sent as one comma-separated string.
const CHECKBOX_SEPARATOR = ",";

/**
 * Checks submitted responses against an event's current `signupForm`.
 *
 * On success, returns the responses in form order with unanswered optional
 * questions left out (`value` is required on the collection, so an empty answer
 * can't be stored).
 */
export function validateSignupResponses(
  signupForm: SignupFormField[] | null | undefined,
  responses: unknown,
): ValidationResult {
  const fields = signupForm ?? [];
  const submitted = responses ?? [];

  if (!Array.isArray(submitted)) {
    return { ok: false, errors: ["responses must be an array"] };
  }

  const errors: string[] = [];
  const answers = new Map<string, string>();

  for (const response of submitted) {
    const fieldLabel: unknown = response?.fieldLabel;
    const value: unknown = response?.value;

    if (typeof fieldLabel !== "string" || typeof value !== "string") {
      return {
        ok: false,
        errors: ["each response needs a fieldLabel and a value, both strings"],
      };
    }

    if (!fields.some((field) => field.label === fieldLabel)) {
      errors.push(`"${fieldLabel}" is not a question on this event's sign-up form`);
    } else if (answers.has(fieldLabel)) {
      errors.push(`"${fieldLabel}" was answered more than once`);
    } else {
      answers.set(fieldLabel, value.trim());
    }
  }

  const cleaned: SignupResponse[] = [];

  for (const field of fields) {
    const value = answers.get(field.label) ?? "";

    if (!value) {
      if (field.required) {
        errors.push(`"${field.label}" is required`);
      }
      continue;
    }

    const options = (field.options ?? []).map(({ option }) => option);

    if (field.fieldType === "multipleChoice" || field.fieldType === "dropdown") {
      if (!options.includes(value)) {
        errors.push(`"${value}" is not a valid option for "${field.label}"`);
        continue;
      }
    }

    if (field.fieldType === "checkboxes") {
      const selected = value.split(CHECKBOX_SEPARATOR).map((option) => option.trim());
      const invalid = selected.filter((option) => !options.includes(option));

      if (invalid.length > 0) {
        errors.push(`"${invalid.join(", ")}" is not a valid option for "${field.label}"`);
        continue;
      }
    }

    cleaned.push({ fieldLabel: field.label, value });
  }

  return errors.length > 0 ? { ok: false, errors } : { ok: true, responses: cleaned };
}
