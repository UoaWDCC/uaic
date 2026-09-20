import type { CollectionConfig } from "payload";
import { isAdminOrExec, isStaffUser } from "../lib/isAdminOrExec";
import { getMemberIdFromRequest } from "../lib/memberSession";

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
    // Staff see everything. Anyone else is narrowed to their own rows by the
    // `where` clause below rather than being allowed or denied outright, so a
    // member can never read another member's signup.
    //
    // Note this only guards the REST/GraphQL endpoints Payload mounts at
    // /api/event-signups. Local API calls (payload.find() in a route handler or
    // server component) default to overrideAccess: true and skip this entirely -
    // those callers have to scope by member themselves.
    read: async ({ req }) => {
      if (isStaffUser(req.user)) {
        return true;
      }

      const memberId = await getMemberIdFromRequest(req);

      if (!memberId) {
        return false;
      }

      return { member: { equals: memberId } };
    },
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
