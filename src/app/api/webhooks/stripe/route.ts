import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Member } from "../../../../../payload-types";
import { cleanIdentifier, memberIdentityWhere } from "@/lib/memberLookup";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

//When something sends a POST request to this Next.js route, run this function.
export async function POST(request: NextRequest) {
  const body = await request.text();
  let event: Stripe.Event;

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.log("Payment confirmed:", {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      metadata: paymentIntent.metadata,
    });

    const payload = await getPayload({ config });

    // Non-UoA members have no UPI or student ID, so only match on identifiers that exist.
    const { email, upi, studentId } = paymentIntent.metadata;
    const where = memberIdentityWhere({ email, upi, studentId });
    const isDuplicate = where
      ? (await payload.find({ collection: "member", where, limit: 1 })).docs.length > 0
      : false;

    if (isDuplicate) {
      console.log(`[webhook] Duplicate member detected for ${email} — skipping creation.`);
    } else {
      const [firstName, lastName] = (paymentIntent.metadata.name || "").split("|");
      try {
        await payload.create({
          collection: "member",
          overrideAccess: true, // Bypasses access control checks for server action
          data: {
            firstName,
            lastName,
            upi: cleanIdentifier(upi),
            studentId: cleanIdentifier(studentId),
            degrees: paymentIntent.metadata.degrees,
            ethnicity: paymentIntent.metadata.ethnicity as Member["ethnicity"],
            gender: paymentIntent.metadata.gender as Member["gender"],
            universityYear: paymentIntent.metadata.universityYear as Member["universityYear"],
            majors: paymentIntent.metadata.majors,
            email: paymentIntent.metadata.email,
            hasPaid: true,
            paymentDate: new Date().toISOString(),
            memberType: "newMember", //assume new member for now
          },
        });

        console.log("Member added successfully");
      } catch (error) {
        console.error("Failed to create member: ", error);
        return NextResponse.json({ error: "Failed to create member" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
