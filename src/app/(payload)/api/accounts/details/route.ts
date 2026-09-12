// app/api/account/details/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { auth } from "@/lib/auth";

const VALID_YEARS = ["year1", "year2", "year3", "year4", "year5Plus", "postgraduate"] as const;
/* const VALID_EXPERIENCE = ["beginner", "intermediate", "advanced"] as const; */

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

  const {
    firstName,
    lastName,
    email,
    studentId,
    phoneNumber,
    degrees,
    universityYear,
    //experienceLevel,
  } = body;

  const memberData = {
    firstName: typeof firstName === "string" ? firstName.trim() : undefined,
    lastName: typeof lastName === "string" ? lastName.trim() : undefined,
    email: typeof email === "string" ? email.trim() : undefined,
    studentId: typeof studentId === "string" ? studentId.trim() : undefined,
    phoneNumber: typeof phoneNumber === "string" ? phoneNumber.trim() : undefined,
    degrees: typeof degrees === "string" ? degrees.trim() : undefined,
    universityYear:
      universityYear === "" || universityYear === undefined
        ? undefined
        : (universityYear as (typeof VALID_YEARS)[number]),
    /*experienceLevel:
      experienceLevel === "" || experienceLevel === undefined
        ? undefined
        : (experienceLevel as (typeof VALID_EXPERIENCE)[number]),*/
  };

  if (
    universityYear !== undefined &&
    universityYear !== "" &&
    !VALID_YEARS.includes(universityYear as (typeof VALID_YEARS)[number])
  ) {
    return NextResponse.json({ error: "Invalid year of study" }, { status: 400 });
  }

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
