"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Payment() {
  const amount = 11.58;

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



