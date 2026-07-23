import type { PayloadHandler } from "payload";
import type { Where } from "payload";

const MEMBER_CSV_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "upi",
  "studentId",
  "gender",
  "universityYear",
  "memberType",
  "degrees",
  "majors",
  "ethnicity",
  "howDidYouFindUs",
  "hasPaid",
  "paymentDate",
] as const;

const isAuthorized = (user: { collection?: string; role?: string } | null | undefined) =>
  user?.collection === "users" && (user.role === "admin" || user.role === "exec");

const escapeCsvValue = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  const stringValue = String(value);
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

const toCsv = (rows: Record<string, unknown>[]): string => {
  const lines = [MEMBER_CSV_FIELDS.join(",")];
  for (const row of rows) {
    lines.push(MEMBER_CSV_FIELDS.map((field) => escapeCsvValue(row[field])).join(","));
  }
  return lines.join("\r\n");
};

export const exportMembersHandler: PayloadHandler = async (req) => {
  if (!isAuthorized(req.user)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url ?? "", "http://localhost");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const paymentDateConstraints: Record<string, string> = {};
  if (startDate) paymentDateConstraints.greater_than_equal = startDate;
  if (endDate) paymentDateConstraints.less_than_equal = endDate;

  const where: Where | undefined =
    Object.keys(paymentDateConstraints).length > 0
      ? { paymentDate: paymentDateConstraints }
      : undefined;

  const { docs } = await req.payload.find({
    collection: "member",
    where,
    pagination: false,
  });

  const csv = toCsv(docs as unknown as Record<string, unknown>[]);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="members-export.csv"',
    },
  });
};
