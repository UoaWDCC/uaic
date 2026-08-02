import type { Access } from "payload";

export const isStaffUser = (user: { collection?: string; role?: string } | null | undefined) =>
  user?.collection === "users" && (user.role === "admin" || user.role === "exec");

export const isAdminOrExec: Access = ({ req }) => isStaffUser(req.user);
