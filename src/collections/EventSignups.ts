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
    useAsTitle: "email",
    defaultColumns: ["email", "firstName", "lastName", "event", "member", "status", "createdAt"],
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
  // An email gets one row per event, for the lifetime of that event. Cancelling
  // flips `status` rather than deleting the row, and re-signing up flips it back —
  // a second insert for the same pair is rejected by MongoDB, not by application
  // code, and surfaces as a Payload ValidationError.
  //
  // MongoDB doesn't drop indexes removed from this config, so databases created
  // before guest signups still carry the old unique `event_1_member_1` index
  // and need it dropped by hand.
  indexes: [{ fields: ["event", "email"], unique: true }],
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
      admin: {
        description: "Set when the person was logged in at sign-up time, empty for guests.",
      },
      // "Every signup for this member" isn't covered by the compound index, so
      // it needs an index of its own.
      index: true,
    },
    // The fields below are a snapshot of what was entered on the form. Editing
    // them here must not write back to the Member record.
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      required: true,
      hooks: {
        // Normalised before validation so the unique index can't be dodged by
        // case or whitespace.
        beforeValidate: [
          ({ value }) => (typeof value === "string" ? value.trim().toLowerCase() : value),
        ],
      },
    },
    {
      name: "upi",
      label: "UPI",
      type: "text",
    },
    {
      name: "studentId",
      label: "Student ID",
      type: "text",
    },
    {
      name: "universityYear",
      label: "University Year",
      type: "select",
      options: [
        { label: "Year 1", value: "year1" },
        { label: "Year 2", value: "year2" },
        { label: "Year 3", value: "year3" },
        { label: "Year 4", value: "year4" },
        { label: "Year 5+", value: "year5Plus" },
        { label: "Postgraduate", value: "postgraduate" },
      ],
    },
    {
      name: "degrees",
      label: "Degrees",
      type: "text",
    },
    {
      name: "majors",
      label: "Majors",
      type: "text",
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
