import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { auth } from "@/lib/auth";

const VALID_EXPERIENCE = ["beginner", "intermediate", "advanced"] as const;
const VALID_INTERESTS = [
  "Equities",
  "Crypto",
  "Macro",
  "Options",
  "ESG",
  "Fixed Income",
  "Venture / Startups",
] as const;

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

  const { experienceLevel, areasOfInterest, linkedinHandle, caseCompetitionInterest } = body;

  if (
    experienceLevel !== undefined &&
    experienceLevel !== "" &&
    !VALID_EXPERIENCE.includes(experienceLevel as (typeof VALID_EXPERIENCE)[number])
  ) {
    return NextResponse.json({ error: "Invalid experience level" }, { status: 400 });
  }

  if (
    areasOfInterest !== undefined &&
    (!Array.isArray(areasOfInterest) || !areasOfInterest.every((i) => VALID_INTERESTS.includes(i)))
  ) {
    return NextResponse.json({ error: "Invalid areas of interest" }, { status: 400 });
  }

  const payload = await getPayload({ config });

  const profileData = {
    experienceLevel: experienceLevel === "" ? undefined : experienceLevel,
    areasOfInterest: Array.isArray(areasOfInterest) ? areasOfInterest : undefined,
    linkedinHandle: typeof linkedinHandle === "string" ? linkedinHandle.trim() : undefined,
    caseCompetitionInterest:
      typeof caseCompetitionInterest === "boolean" ? caseCompetitionInterest : undefined,
  };

  try {
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
      data: profileData,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update investment profile:", err);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}
