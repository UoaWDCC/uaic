import type { Event } from "../../../../payload-types";
import { MEMBER_DETAILS } from "./memberDetails";

type SignupSettings = Pick<Partial<Event>, "requiresSignup" | "signupForm">;

/** Returns defaults only on first enabling sign-up for an unconfigured form. */
export function getInitialMemberDetails(data: SignupSettings, originalDoc?: SignupSettings) {
  const form = data.signupForm === undefined ? originalDoc?.signupForm : data.signupForm;

  if (
    data.requiresSignup !== true ||
    originalDoc?.requiresSignup === true ||
    form?.some((block) => block.blockType === "memberDetail") ||
    originalDoc?.signupForm?.some((block) => block.blockType === "memberDetail")
  ) {
    return [];
  }

  return MEMBER_DETAILS.map(({ value }) => ({ blockType: "memberDetail" as const, detail: value }));
}
