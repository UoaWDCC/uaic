import type { CollectionConfig, CollectionSlug } from "payload";
import { revalidateOnChange } from "../lib/payload/revalidateOnChange";
import { isOnsiteRegistrationLive } from "../features/events/lib/onsiteRegistration";

// Onsite sign-up settings only show where onsite registration is switched on
// (#473), so exec in production only see registrationLink. Hiding a field
// doesn't change its stored value.
const showSignupSettings = (siblingData: { requiresSignup?: unknown } | undefined) =>
  isOnsiteRegistrationLive() && siblingData?.requiresSignup === true;
// The registration window gates the external registrationLink button as well
// as onsite sign-up (#478), so it shows for either - unlike the onsite-only
// settings above.
const showRegistrationWindow = (
  siblingData: { requiresSignup?: unknown; registrationLink?: unknown } | undefined,
) => showSignupSettings(siblingData) || Boolean(siblingData?.registrationLink);

export const Events: CollectionConfig = {
  slug: "events",
  hooks: revalidateOnChange(["/", "/events"]),
  labels: {
    singular: "Event",
    plural: "Events",
  },
  admin: {
    useAsTitle: "event",
  },
  fields: [
    {
      name: "event",
      type: "text",
      label: "Event Name",
      required: true,
      admin: {
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "startDate",
      type: "date",
      label: "Start Date & Time",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "yyyy-MM-dd HH:mm",
        },
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "endDate",
      type: "date",
      label: "End Date & Time",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "yyyy-MM-dd HH:mm",
        },
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "location",
      type: "text",
      label: "Location",
      required: true,
      admin: {
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      required: true,
      admin: {
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "registrationLink",
      type: "text",
      label: "Registration Link",
      required: false,
      admin: {
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "image",
      type: "upload",
      label: "Image",
      relationTo: "media",
      admin: {
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "attendees",
      type: "relationship",
      label: "Attendees",
      relationTo: "member" as CollectionSlug,
      hasMany: true,
      admin: {
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "requiresSignup",
      type: "checkbox",
      label: "Requires Sign-up",
      defaultValue: false,
      admin: {
        description: "Turn on to let members register for this event on the website.",
        condition: () => isOnsiteRegistrationLive(),
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      type: "row",
      admin: {
        condition: (_, siblingData) => showRegistrationWindow(siblingData),
      },
      fields: [
        {
          name: "registrationOpensAt",
          type: "date",
          label: "Registration Opens",
          admin: {
            description: "Leave empty to open as soon as sign-up is switched on.",
            date: {
              pickerAppearance: "dayAndTime",
              displayFormat: "yyyy-MM-dd HH:mm",
            },
            style: {
              cursor: "pointer",
            },
          },
        },
        {
          name: "registrationClosesAt",
          type: "date",
          label: "Registration Closes",
          admin: {
            description: "Leave empty to close when the event starts.",
            date: {
              pickerAppearance: "dayAndTime",
              displayFormat: "yyyy-MM-dd HH:mm",
            },
            style: {
              cursor: "pointer",
            },
          },
        },
      ],
    },
    {
      name: "registrationClosed",
      type: "checkbox",
      label: "Close Registration Now",
      defaultValue: false,
      admin: {
        description:
          "Closes registration immediately, regardless of the dates above. This doesn't close an external form (e.g. a Google Form) - close that in the form itself.",
        condition: (_, siblingData) => showRegistrationWindow(siblingData),
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "requiresMembership",
      type: "checkbox",
      label: "Requires Membership",
      defaultValue: false,
      admin: {
        description: "Only paid members can sign up for this event.",
        condition: (_, siblingData) => showSignupSettings(siblingData),
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "capacity",
      type: "number",
      label: "Capacity",
      admin: {
        description: "Maximum number of sign-ups. Leave empty for unlimited.",
        condition: (_, siblingData) => showSignupSettings(siblingData),
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "freeSlotOnCancel",
      type: "checkbox",
      label: "Free Slot on Cancel",
      defaultValue: false,
      admin: {
        description: "Release the slot back to the pool when someone cancels their sign-up.",
        condition: (_, siblingData) =>
          showSignupSettings(siblingData) &&
          siblingData?.capacity !== undefined &&
          siblingData?.capacity !== null,
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "editCutoff",
      type: "date",
      label: "Edit Cut-off",
      admin: {
        description: "Sign-ups cannot be edited after this time. Defaults to the event start date.",
        condition: (_, siblingData) => showSignupSettings(siblingData),
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "yyyy-MM-dd HH:mm",
        },
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "cancelCutoff",
      type: "date",
      label: "Cancel Cut-off",
      admin: {
        description: "Sign-ups cannot be cancelled after this time. Defaults to the edit cut-off.",
        condition: (_, siblingData) => showSignupSettings(siblingData),
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "yyyy-MM-dd HH:mm",
        },
        style: {
          cursor: "pointer",
        },
      },
    },
    {
      name: "signupForm",
      type: "blocks",
      label: "Sign-up Form",
      labels: {
        singular: "Form Field",
        plural: "Form Fields",
      },
      admin: {
        description:
          "Editing this form after sign-ups already exist will NOT update existing submitted responses.",
        condition: (_, siblingData) => showSignupSettings(siblingData),
      },
      blocks: [
        {
          slug: "formField",
          labels: {
            singular: "Form Field",
            plural: "Form Fields",
          },
          fields: [
            {
              name: "label",
              type: "text",
              label: "Question",
              required: true,
            },
            {
              name: "fieldType",
              type: "select",
              label: "Field Type",
              required: true,
              options: [
                { label: "Short Text", value: "shortText" },
                { label: "Paragraph", value: "paragraph" },
                { label: "Multiple Choice", value: "multipleChoice" },
                { label: "Checkboxes", value: "checkboxes" },
                { label: "Dropdown", value: "dropdown" },
              ],
            },
            {
              name: "required",
              type: "checkbox",
              label: "Required",
              defaultValue: false,
            },
            {
              name: "options",
              type: "array",
              label: "Options",
              admin: {
                description: "Only used by Multiple Choice, Checkboxes and Dropdown field types.",
              },
              fields: [
                {
                  name: "option",
                  type: "text",
                  label: "Option",
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  access: {
    read: () => true,
  },
};
