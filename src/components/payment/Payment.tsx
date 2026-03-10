"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

export default function Payment() {
  const amount = 11.58;

  if (!stripePromise) {
    return (
      <div className="max-w-6xl mx-auto p-10 text-white text-center border rounded-md bg-gradient-to-tr from-[var(--babyBlue)] to-[var(--darkBlue)]">
        <h1 className="text-3xl font-extrabold mb-4">Payment temporarily unavailable</h1>
        <p className="text-lg">Missing Stripe configuration. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className = "max-w-6xl mx-auto p-10 text-white text-center border rounded-md bg-gradient-to-tr from-[var(--babyBlue)] to-[var(--darkBlue)]">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-5">Payment Amount:</h1>
        <h2 className="text-4xl font-extrabold">${amount}</h2>
      </div>
      <Elements stripe={stripePromise} 
        options={{
          mode: "payment",
          amount: Math.round(amount * 100),
          currency: "nzd",
        }}>
          <CheckoutPage amount={amount}/>
      </Elements>
    </div>
  )
}



