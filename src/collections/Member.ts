import type { CollectionConfig } from "payload";
import { ExportMembersButton } from "../components/admin/ExportMembersButton";

export const Member: CollectionConfig = {
  slug: "member",
  admin: {
    useAsTitle: "email",
    components: {
      beforeListTable: [ExportMembersButton],
    },
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "email",
      type: "text",
      label: "Email",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "upi",
      type: "text",
      label: "UPI",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "studentId",
      type: "text",
      label: "Student ID",
      required: true,
    },
    {
      name: "gender",
      type: "select",
      label: "Gender",
      required: true,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Non-binary", value: "nonBinary" },
        { label: "Prefer not to say", value: "preferNotToSay" },
      ],
    },
    {
      name: "universityYear",
      type: "select",
      label: "University Year",
      required: true,
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
      name: "memberType",
      type: "select",
      label: "Member Type",
      required: true,
      options: [
        { label: "Returning", value: "returning" },
        { label: "New Member", value: "newMember" },
      ],
    },
    {
      name: "degrees",
      type: "text",
      label: "Degrees",
      required: true,
    },
    {
      name: "majors",
      type: "text",
      label: "Majors",
      required: true,
    },
    {
      name: "ethnicity",
      type: "select",
      label: "Ethnicity",
      required: true,
      options: [
        { label: "European / Pākehā", value: "european" },
        { label: "Māori", value: "maori" },
        { label: "Pacific Peoples", value: "pacificPeoples" },
        { label: "Asian", value: "asian" },
        { label: "Middle Eastern / Latin American / African", value: "melaa" },
        { label: "Other", value: "other" },
        { label: "Prefer not to say", value: "preferNotToSay" },
      ],
    },
    {
      name: "howDidYouFindUs",
      type: "text",
      label: "How did you find us?",
      required: false,
    },
    {
      name: "hasPaid",
      type: "checkbox",
      label: "Has Paid",
      required: true,
      defaultValue: false,
    },
    {
      name: "paymentDate",
      type: "date",
      label: "Payment Date",
      admin: {
        condition: (_, siblingData) => siblingData?.hasPaid === true,
      },
      validate: (value, { siblingData }) => {
        const memberData = siblingData as { hasPaid?: boolean } | undefined;

        if (memberData?.hasPaid && !value) {
          return "Payment date is required once payment is confirmed.";
        }

        if (value && !memberData?.hasPaid) {
          return "Set hasPaid to true before recording a payment date.";
        }

        return true;
      },
    },
  ],
  access: {
    read: () => true,
  },
};
