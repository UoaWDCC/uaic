import type { CollectionConfig } from "payload";
import { isAdminOrExec } from "../lib/isAdminOrExec";

export const EventSignups: CollectionConfig = {
  slug: "event-signups",
  labels: {
    singular: "Event Signup",
    plural: "Event Signups",
  },
  admin: {
    useAsTitle: "id",
    defaultColumns: ["event", "member", "status", "createdAt"],
  },
  defaultSort: "-createdAt",
  access: {
    // Staff-only for now. Member-scoped reads (returning a `where` clause built
    // from the Better Auth session) land in a follow-up — see the read-access
    // callout on #375.
    read: isAdminOrExec,
    create: isAdminOrExec,
    update: isAdminOrExec,
    delete: isAdminOrExec,
  },
  // A member gets one row per event, for the lifetime of that event. Cancelling
  // flips `status` rather than deleting the row, and re-signing up flips it back —
  // a second insert for the same pair is rejected by MongoDB, not by application
  // code, and surfaces as a Payload ValidationError.
  indexes: [{ fields: ["event", "member"], unique: true }],
  fields: [
    {
      name: "event",
      label: "Event",
      type: "relationship",
      relationTo: "events",
      required: true,
    },
    {
      name: "member",
      label: "Member",
      type: "relationship",
      relationTo: "member",
      required: true,
      // The compound index below only covers queries prefixed by `event`, so
      // "every signup for this member" needs an index of its own.
      index: true,
    },
    {
      name: "responses",
      label: "Responses",
      type: "array",
      labels: {
        singular: "Response",
        plural: "Responses",
      },
      admin: {
        description: "Answers to the event's sign-up questions, captured at sign-up time.",
      },
      fields: [
        {
          name: "fieldLabel",
          label: "Question",
          type: "text",
          required: true,
        },
        {
          name: "value",
          label: "Answer",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      defaultValue: "confirmed",
      options: [
        { label: "Confirmed", value: "confirmed" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
  ],
};
