"use client";

import { useDocumentInfo, useForm, useFormFields } from "@payloadcms/ui";
import { useEffect, useRef } from "react";
import type { Event } from "../../../../payload-types";
import { getInitialMemberDetails } from "../../events/lib/initialiseSignupForm";

// Mounted beside requiresSignup so it also observes the first toggle, before
// the conditional blocks field has been shown or the document has been saved.
export const InitialiseEventSignupForm = () => {
  const requiresSignup = useFormFields(([fields]) => fields.requiresSignup?.value);
  const { data: savedData } = useDocumentInfo();
  const { addFieldRow, getDataByPath } = useForm();
  const initialised = useRef(false);

  useEffect(() => {
    if (initialised.current || requiresSignup !== true) return;

    const defaults = getInitialMemberDetails(
      { requiresSignup, signupForm: getDataByPath<Event["signupForm"]>("signupForm") },
      savedData,
    );
    if (defaults.length === 0) return;

    initialised.current = true;
    defaults.forEach(({ blockType, detail }, rowIndex) => {
      addFieldRow({
        path: "signupForm",
        schemaPath: "events.signupForm",
        blockType,
        rowIndex,
        subFieldState: {
          detail: { value: detail, initialValue: detail, valid: true },
        },
      });
    });
  }, [requiresSignup, savedData, addFieldRow, getDataByPath]);

  return null;
};
