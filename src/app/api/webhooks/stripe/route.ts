import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPayload } from "payload";
import config from "@payload-config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

//When something sends a POST request to this Next.js route, run this function.
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
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

    const [firstName, lastName] = paymentIntent.metadata.name.split("|");
    const payload = await getPayload({ config });

    try {
      const member = await payload.create({
        collection: "member",
        data: {
          email: paymentIntent.metadata.email,
          firstName,
          lastName,
          upi: paymentIntent.metadata.upi,
          studentId: paymentIntent.metadata.studentId,
          gender: paymentIntent.metadata.gender,
          universityYear: paymentIntent.metadata.universityYear,
          memberType: "newMember", //assume new member for now
          degrees: paymentIntent.metadata.degrees,
          majors: paymentIntent.metadata.majors,
          ethnicity: paymentIntent.metadata.ethnicity,
          hasPaid: true,
        },
      });

      console.log("Member added successfully");
    } catch (error) {
      console.error("Failed to create member: ", error);
      return NextResponse.json({ error: "Failed to create member" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
