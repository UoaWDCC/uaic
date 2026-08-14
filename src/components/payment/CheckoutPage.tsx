import React, { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";

const CheckoutPage = ({
  amount,
  name,
  upi,
  studentId,
  degrees,
  ethnicity,
  gender,
  universityYear,
  majors,
  email,
}: {
  amount: number;
  name: string;
  upi: string;
  studentId: number;
  degrees: string;
  ethnicity: string;
  gender: string;
  universityYear: string;
  majors: string;
  email: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [country, setCountry] = useState("US");
  const [zip, setZip] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    if (!cardElement) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(amount * 100),
          name,
          upi,
          studentId: String(studentId),
          degrees,
          ethnicity,
          gender,
          universityYear,
          majors,
          email,
        }),
      });

      const data = await response.json();
      const clientSecret = data.clientSecret;

      if (!response.ok || !data.clientSecret) {
        setErrMessage(data.error || "Failed to initialize payment.");
        return;
      }

      // Direct token/payment confirmation using CardElement, sends payment confirmation directly to Stripe's server.
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardholderName,
            email: email,
            address: {
              country: country,
              postal_code: zip,
            },
          },
        },
      });

      if (error) {
        setErrMessage(error.message || "An unexpected error occurred.");
      } else if (paymentIntent?.status === "succeeded") {
        setErrMessage(null);

        try {
          const nameParts = name ? name.trim().split("|") : ["", ""];
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(" ") || firstName;

          // 2. Build payload object dynamically
          const payloadData: Record<string, any> = {
            firstName,
            lastName,
            upi,
            studentId: String(studentId), // Member schema expects string
            degrees,
            ethnicity,
            gender,
            universityYear,
            majors,
            paymentDate: new Date().toISOString(),
            memberType: "newMember",
          };

          // Only add email if it's not empty
          if (email && email.trim() !== "placeholder") {
            payloadData.email = email;
          }

          // 3. Make a single fetch request
          const response = await fetch("/api/update-member", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payloadData),
          });

          const memberReponse = await response.json();
          if (!response.ok) {
            setErrMessage(memberReponse.error || "Failed to update member");
            return;
          }
          window.location.href = window.location.origin + `/payment-success?amount=${amount}`;
        } catch (error) {
          console.log("Unable to update member:", error);
          setErrMessage("Payment succeeded, but unable to update member.");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrMessage(error.message);
      } else {
        setErrMessage("An unexpected network error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <span className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent dark:text-white" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 1. Native Email Input */}

      {/* 2. Isolated Card Inputs (Completely bypasses multi-method layouts) */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Card details</label>
        <div className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <CardNumberElement />
        </div>

        <div className="flex gap-2">
          <div className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <CardExpiryElement />
          </div>

          <div className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <CardCvcElement />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cardholder-name" className="text-sm font-medium text-gray-700">
          Cardholder name
        </label>
        <input
          id="cardholder-name"
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
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
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full appearance-none rounded-t-xl border border-gray-200 px-3 py-2.5 text-sm text-[#8a8a8a] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="NZ">New Zealand</option>
          </select>

          <RiArrowDropDownLine className="absolute top-1/5 right-4 text-4xl text-[#afafaf]" />
        </div>

        <input
          id="zip_code"
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="ZIP"
          className="w-full rounded-b-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <button
        disabled={isLoading}
        className="w-full rounded-full bg-gradient-to-r from-[#3881f7] to-[#1439dd] px-4 py-2 font-bold text-white hover:from-blue-700 hover:to-blue-900"
      >
        {isLoading ? "Processing..." : "Pay"}
      </button>

      {errMessage && <div className="mt-4 font-bold text-red-500">{errMessage}</div>}
    </form>
  );
};

export default CheckoutPage;
