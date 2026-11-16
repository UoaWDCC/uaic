import config from "@payload-config";
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import { cleanIdentifier } from "@/lib/memberLookup";

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();

    const email = cleanIdentifier(data.email);
    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const payload = await getPayload({ config });

    // This route updates the member who just signed up, so email is the right key.
    // Matching on UPI or student ID as well could pick up a different member who
    // happens to share one of them.
    const existingMember = await payload.find({
      collection: "member",
      where: { email: { equals: email } },
      limit: 1,
    });

    if (existingMember.docs.length === 0) {
      return NextResponse.json(
        { error: "Failed to update, such member don't exist" },
        { status: 409 },
      );
    }

    // Leave out a blank UPI / student ID so a non-UoA update can't overwrite stored values with "".
    const { upi, studentId, ...rest } = data;
    const cleanedUpi = cleanIdentifier(upi);
    const cleanedStudentId = cleanIdentifier(studentId);

    const updatedMember = await payload.update({
      collection: "member",
      id: existingMember.docs[0].id,
      data: {
        ...rest,
        ...(cleanedUpi ? { upi: cleanedUpi } : {}),
        ...(cleanedStudentId ? { studentId: cleanedStudentId } : {}),
      },
    });

    return NextResponse.json(updatedMember, { status: 200 });
  } catch (error) {
    console.error("Failed to update member data:", error);
    return NextResponse.json(
      { error: "Something went wrong, unable to update member data" },
      { status: 500 },
    );
  }
}
