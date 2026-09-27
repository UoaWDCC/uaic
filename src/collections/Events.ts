import type { CollectionConfig, CollectionSlug } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
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
      type: "text",
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
        condition: (_, siblingData) => siblingData?.requiresSignup === true,
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
        condition: (_, siblingData) => siblingData?.requiresSignup === true,
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
          siblingData?.capacity !== undefined && siblingData?.capacity !== null,
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
        condition: (_, siblingData) => siblingData?.requiresSignup === true,
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
        condition: (_, siblingData) => siblingData?.requiresSignup === true,
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
        condition: (_, siblingData) => siblingData?.requiresSignup === true,
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
