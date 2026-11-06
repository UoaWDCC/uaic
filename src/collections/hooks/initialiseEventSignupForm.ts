import type { CollectionBeforeValidateHook } from "payload";
import type { Event } from "../../../payload-types";
import { getInitialMemberDetails } from "../../features/events/lib/initialiseSignupForm";

export const initialiseEventSignupForm: CollectionBeforeValidateHook<Event> = ({
  data,
  originalDoc,
}) => {
  if (!data) return data;

  const defaults = getInitialMemberDetails(data, originalDoc);
  if (defaults.length === 0) return data;

  const form = data.signupForm === undefined ? originalDoc?.signupForm : data.signupForm;
  return { ...data, signupForm: [...defaults, ...(form ?? [])] };
};
