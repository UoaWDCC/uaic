import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Exec", value: "exec" },
      ],
      defaultValue: "exec",
    },
    // Email added by default
    // Add more fields as needed
  ],
};
