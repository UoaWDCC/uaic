import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

if (process.env.STRIPE_SECRET_KEY === undefined) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "nzd",
      automatic_payment_methods: { enabled: true },
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}