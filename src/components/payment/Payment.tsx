"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(stripePublicKey);

export default function Payment() {
  const amount = 21.58;

  return (
    <div className="mx-auto max-w-6xl rounded-md border bg-gradient-to-tr from-[var(--babyBlue)] to-[var(--darkBlue)] p-10 text-center text-white">
      <div className="mb-10">
        <h1 className="mb-5 text-4xl font-extrabold">Payment Amount:</h1>
        <h2 className="text-4xl font-extrabold">${amount}</h2>
      </div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: Math.round(amount * 100),
          currency: "nzd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </div>
  );
}
