import { ValidationError, type CollectionBeforeChangeHook } from "payload";
import type { Event } from "../../../payload-types";
import { validateMemberDetailSignupForm } from "../../features/events/lib/validateMemberDetailSignupForm";

// Payload skips field validation when admin.condition hides a field. Enforce
// the same rule server-side even when signup is disabled or the feature is off.
// beforeChange runs after beforeValidate has initialised newly enabled forms.
export const validateEventSignupForm: CollectionBeforeChangeHook<Event> = ({
  data,
  originalDoc,
  req,
}) => {
  const form = data.signupForm === undefined ? originalDoc?.signupForm : data.signupForm;
  const result = validateMemberDetailSignupForm(form, originalDoc?.signupForm);

  if (result !== true) {
    throw new ValidationError({
      collection: "events",
      errors: [{ path: "signupForm", message: result }],
      req,
    });
  }

  return data;
};
