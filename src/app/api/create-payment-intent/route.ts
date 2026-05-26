import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

if (process.env.STRIPE_SECRET_KEY === undefined) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

export async function POST(request: NextRequest) {
  try {
    const { amount, name, upi, studentId, degree, email } = await request.json();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "nzd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        name: name || "",
        upi: upi || "",
        studentId: studentId || "",
        degree: degree || "",
        email: email || "",
      },
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
