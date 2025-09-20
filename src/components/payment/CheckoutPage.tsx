import React, { useEffect, useState } from "react";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const CheckoutPage = ({amount}: { amount: number}) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.round(amount * 100) }),
    })
      .then((response) => response.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching payment intent:", error);
      });
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const { error: onSubmitError } = await elements.submit();

    if (onSubmitError) {
      setErrMessage(onSubmitError.message || "An unexpected error occurred.");
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: window.location.origin + `/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrMessage(error.message || "An unexpected error occurred.");
    } else {
      setErrMessage(null);
    }
  }

  // Show a loading state while fetching clientSecret or if Stripe.js has not yet loaded
  if (!clientSecret || !stripe || !elements) {
    return <div className="flex items-center justify-center">
      <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"/>
    </div>;
  }

  return (
    <form onSubmit={handleSubmit}
    >
      {clientSecret && <PaymentElement/>}
      <button className="
        bg-white text-[var(--babyBlue)] w-full py-2 mt-4 rounded-md font-bold 
        disabled:opacity-50 disabled:animate-pulse disabled:cursor-not-allowed 
        hover:scale-[1.02] transition-all"> 
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
      {errMessage && <div className="text-red-500 mt-4 font-bold">{errMessage}</div>}
    </form>
  );

}

export default CheckoutPage;