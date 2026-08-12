import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { success } from "better-auth";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const [firstName, lastName] = data.name.split("|");
    const payload = await getPayload({ config });

    const existingMember = await payload.find({
      collection: "member",
      where: {
        or: [
          {
            email: { equals: data.email },
          },

          {
            upi: { equals: data.upi },
          },

          {
            studentId: { equals: data.studentId },
          },
        ],
      },
    });

    if (existingMember.docs.length > 0) {
      return NextResponse.json({ error: "Such member already exists!" }, { status: 409 });
    }

    const member = await payload.create({
      collection: "member",
      overrideAccess: true, // Bypasses access control checks for server action
      data: {
        email: data.email,
        firstName,
        lastName,
        upi: data.upi,
        studentId: String(data.studentId),
        gender: data.gender,
        universityYear: data.universityYear,
        memberType: "newMember", //assume new member for now
        degrees: data.degrees,
        majors: data.majors,
        ethnicity: data.ethnicity,
        hasPaid: true,
        paymentDate: new Date().toISOString(),
      },
    });

    console.log("Member added successfully");
    return NextResponse.json({ success: true, member }, { status: 201 });
  } catch (error) {
    console.error("Failed to create member: ", error);
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 });
  }
}
