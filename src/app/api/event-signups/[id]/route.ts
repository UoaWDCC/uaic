import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";
import { getMemberIdFromRequest } from "@/lib/memberSession";

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const payload = await getPayload();
  const { id } = await params;

  const memberId = await getMemberIdFromRequest(_request as any);
  if (!memberId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const signup = await payload.findByID({ collection: "event-signups", id }).catch(() => null);

  if (!signup) {
    return NextResponse.json({ error: "Event signup not found" }, { status: 404 });
  }

  //return NextResponse.json({ message: `Signup found`, signup }, { status: 200 });
}
