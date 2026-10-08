import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";
import { getMemberIdFromRequest } from "@/lib/memberSession";
import { isPastCutoff, resolveEditCutoff } from "@/lib/eventCutoffs";
import { validateSignupResponses } from "@/lib/validateSignupResponses";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const memberId = await getMemberIdFromRequest(request);

    if (!memberId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await getPayload();

    // depth: 0 keeps `member` and `event` as plain IDs instead of pulling the
    // full Member and Event documents along with the signup.
    const signup = await payload
      .findByID({ collection: "event-signups", id, depth: 0 })
      .catch(() => null);

    if (!signup) {
      return NextResponse.json({ error: "Event signup not found" }, { status: 404 });
    }

    const signupMemberId = typeof signup.member === "string" ? signup.member : signup.member?.id;

    if (signupMemberId !== memberId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const eventId = typeof signup.event === "string" ? signup.event : signup.event?.id;

    const event = eventId
      ? await payload.findByID({ collection: "events", id: eventId, depth: 0 }).catch(() => null)
      : null;

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (isPastCutoff(resolveEditCutoff(event))) {
      return NextResponse.json(
        { error: "The deadline to edit this signup has passed" },
        { status: 403 },
      );
    }

    const body = await request.json().catch(() => null);

    const result = validateSignupResponses(event.signupForm, body?.responses);

    if (!result.ok) {
      return NextResponse.json(
        { error: "Invalid responses", details: result.errors },
        { status: 400 },
      );
    }

    // Only `responses` is passed, so `status` (and everything else on the
    // signup) is left exactly as it was.
    const updatedSignup = await payload.update({
      collection: "event-signups",
      id,
      data: { responses: result.responses },
      depth: 0,
    });

    return NextResponse.json(updatedSignup, { status: 200 });
  } catch (error) {
    console.error("Failed to update event signup:", error);
    return NextResponse.json(
      { error: "Something went wrong, unable to update event signup" },
      { status: 500 },
    );
  }
}
