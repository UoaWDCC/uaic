import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { RiArrowDropDownLine } from "react-icons/ri";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");
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

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    // Direct token/payment confirmation using CardElement
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setErrMessage(error.message || "An unexpected error occurred.");
      setIsLoading(false);
    } else if (paymentIntent?.status === "succeeded") {
      setErrMessage(null);
      window.location.href = window.location.origin + `/payment-success?amount=${amount}`;
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <span className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent dark:text-white" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 1. Native Email Input */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="custom-email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="custom-email"
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      {/* 2. Isolated Card Inputs (Completely bypasses multi-method layouts) */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Card details</label>
        <div className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "14px",
                  color: "#374151",
                  "::placeholder": { color: "#9CA3AF" },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cardholder-name" className="text-sm font-medium text-gray-700">
          Cardholder name
        </label>
        <input
          id="cardholder-name"
          type="name"
          placeholder="full name on card"
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="country_region" className="text-sm font-medium text-gray-700">
          Country or region
        </label>
        <div className="relative pt-2">
          <select
            id="country_region"
            name="countries"
            className="w-full appearance-none rounded-t-xl border border-gray-200 px-3 py-2.5 text-sm text-[#8a8a8a] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="volvo">United States</option>
            <option value="saab">United Kingdom</option>
            <option value="fiat">Australia</option>
            <option value="audi">New Zealand</option>
          </select>

          <RiArrowDropDownLine className="absolute top-1/5 right-4 text-4xl text-[#afafaf]" />
        </div>

        <input
          id="country_region"
          type="name"
          placeholder="ZIP"
          className="w-full rounded-b-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <button className="w-full rounded-full bg-gradient-to-r from-[#3881f7] to-[#1439dd] px-4 py-2 font-bold text-white hover:from-blue-700 hover:to-blue-900">
        {isLoading ? "Processing..." : "Pay"}
      </button>

      {errMessage && <div className="mt-4 font-bold text-red-500">{errMessage}</div>}
    </form>
  );
};

export default CheckoutPage;
