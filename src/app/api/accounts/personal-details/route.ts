import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { auth } from "@/lib/auth";
import {
  validatePersonalDetails,
  type UniversityYear,
} from "@/features/membership/utils/validatePersonalDetails";

const trimIfString = (value: unknown) => (typeof value === "string" ? value.trim() : value);

export async function PATCH(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Fields left out of the body are left unchanged; email is deliberately not accepted
  const details = {
    firstName: trimIfString(body.firstName),
    lastName: trimIfString(body.lastName),
    studentId: trimIfString(body.studentId),
    phoneNumber: trimIfString(body.phoneNumber),
    degrees: trimIfString(body.degrees),
    universityYear: body.universityYear,
  };

  const errors = validatePersonalDetails(details);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: Object.values(errors)[0], fieldErrors: errors },
      { status: 400 },
    );
  }

  const memberData = {
    firstName: details.firstName as string | undefined,
    lastName: details.lastName as string | undefined,
    studentId: details.studentId as string | undefined,
    degrees: details.degrees as string | undefined,
    // "" / null clear the optional fields - payload treats undefined as "don't change"
    phoneNumber:
      details.phoneNumber === undefined ? undefined : (details.phoneNumber as string) || null,
    universityYear:
      details.universityYear === undefined
        ? undefined
        : (details.universityYear as UniversityYear) || null,
  };

  const payload = await getPayload({ config });

  try {
    // Find the member record matching this user's email
    const memberResult = await payload.find({
      collection: "member",
      where: { email: { equals: session.user.email } },
      limit: 1,
    });

    if (memberResult.docs.length === 0) {
      return NextResponse.json(
        { error: "No member record found for this account" },
        { status: 404 },
      );
    }

    await payload.update({
      collection: "member",
      id: memberResult.docs[0].id,
      data: memberData,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update member details:", err);
    return NextResponse.json({ error: "Failed to save details" }, { status: 500 });
  }
}
