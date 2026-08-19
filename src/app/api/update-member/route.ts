import config from "@payload-config";
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();

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

    if (existingMember.docs.length == 0) {
      return NextResponse.json(
        { error: "Failed to update, such member don't exist" },
        { status: 409 },
      );
    }

    const memberId = existingMember.docs[0].id;

    const updatedMember = await payload.update({
      collection: "member",
      id: memberId,
      data: data, // Fields inside data will be updated
    });

    return NextResponse.json(updatedMember, { status: 200 });
  } catch (error) {
    console.error("Failed to update member data:", error);
    return NextResponse.json(
      { error: "Something went wrong, unable to update memeber data" },
      { status: 500 },
    );
  }
}
