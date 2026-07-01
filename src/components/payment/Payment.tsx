"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";
import { useState } from "react";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(stripePublicKey);

export default function Payment() {
  const amount = 21.58;

  const nextPrev = (step: number) => {
    console.log("Navigate step:", step);
  };

  const [currentStep, setCurrentStep] = useState(1);

  return (
    /* Parent layout container: centering elements horizontally and vertically using flex */
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center rounded-md border bg-gradient-to-tr from-[var(--babyBlue)] to-[var(--darkBlue)] p-10">
      {/* Centered White wrapper container card */}
      <div className="mb-10 w-full rounded-2xl bg-white p-4 pb-0 text-black lg:max-w-xl">
        <form id="regForm" action="">
          {/* Fixed the dynamic variable text color configuration */}
          <h1 className="mb-4 text-2xl font-bold text-[var(--darkBlue)]">Membership:</h1>

          <div className="mb-6 flex w-full items-center justify-between">
            <div
              className={`h-7 w-7 flex-shrink-0 rounded-full border-2 transition-all duration-300 ${currentStep >= 0 ? "border-blue-500 bg-blue-500" : "border-gray-300 bg-white"}`}
            />

            <div
              className={`mx-2 h-px flex-1 transition-all duration-300 ${currentStep >= 0 ? "bg-blue-500" : "bg-gray-300"}`}
            />

            <div
              className={`h-7 w-7 flex-shrink-0 rounded-full border-2 transition-all duration-300 ${currentStep >= 1 ? "border-blue-500 bg-blue-500" : "border-gray-300 bg-white"}`}
            />

            <div
              className={`mx-2 h-px flex-1 transition-all duration-300 ${currentStep >= 1 ? "bg-blue-500" : "bg-gray-300"}`}
            />

            <div
              className={`h-7 w-7 flex-shrink-0 rounded-full border-2 transition-all duration-300 ${currentStep >= 2 ? "border-blue-500 bg-blue-500" : "border-gray-300 bg-white"}`}
            />

            <div
              className={`mx-2 h-px flex-1 transition-all duration-300 ${currentStep >= 2 ? "bg-blue-500" : "bg-gray-300"}`}
            />

            <div
              className={`h-7 w-7 flex-shrink-0 rounded-full border-2 transition-all duration-300 ${currentStep >= 3 ? "border-blue-500 bg-blue-500" : "border-gray-300 bg-white"}`}
            />
          </div>

          {currentStep == 0 && (
            /* 1. Added space-y-4 to space everything out evenly automatically */
            <div className="tab space-y-4">
              <div className="font-medium text-blue-500">
                <p>Student Details</p>
              </div>

              <div>
                <input
                  type="text"
                  id="first_name"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Student ID"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  id="last_name"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Choice"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  id="last_name"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Choice"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  id="last_name"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Choice"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  id="last_name"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Choice"
                  required
                />
              </div>

              {/* 2. Removed the unnecessary wrapper div and clean layout classes applied */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  className="w-full rounded-full bg-gray-200 px-4 py-2 font-bold text-gray-700 transition hover:bg-gray-300"
                >
                  Back
                </button>
                <button
                  type="button"
                  className="w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white transition hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep == 1 && (
            <div className="tab">
              <div className="pb-3 font-medium text-blue-500">
                <p>How Did You Hear?</p>
              </div>
              <fieldset>
                <legend className="sr-only">Countries</legend>

                <div className="mb-4 flex items-center">
                  <input
                    id="country-option-1"
                    type="radio"
                    name="countries"
                    value="USA"
                    className="text-neutral-primary border-default-medium bg-neutral-secondary-medium checked:border-brand focus:ring-brand-subtle h-4 w-4 appearance-none rounded-full border border-blue-500 focus:ring-2 focus:outline-none"
                    checked
                  />
                  <label
                    htmlFor="country-option-1"
                    className="text-heading ms-2 text-sm font-medium select-none"
                  >
                    Google search
                  </label>
                </div>

                <div className="mb-4 flex items-center">
                  <input
                    id="country-option-2"
                    type="radio"
                    name="countries"
                    value="Germany"
                    className="text-neutral-primary border-default-medium bg-neutral-secondary-medium checked:border-brand focus:ring-brand-subtle h-4 w-4 appearance-none rounded-full border border-blue-500 focus:ring-2 focus:outline-none"
                  />
                  <label
                    htmlFor="country-option-2"
                    className="text-heading ms-2 text-sm font-medium select-none"
                  >
                    Social media
                  </label>
                </div>

                <div className="mb-4 flex items-center">
                  <input
                    id="country-option-3"
                    type="radio"
                    name="countries"
                    value="Spain"
                    className="text-neutral-primary border-default-medium bg-neutral-secondary-medium checked:border-brand focus:ring-brand-subtle h-4 w-4 appearance-none rounded-full border border-blue-500 focus:ring-2 focus:outline-none"
                  />
                  <label
                    htmlFor="country-option-3"
                    className="text-heading ms-2 text-sm font-medium select-none"
                  >
                    Email newsletters
                  </label>
                </div>

                <div className="mb-4 flex items-center">
                  <input
                    id="country-option-4"
                    type="radio"
                    name="countries"
                    value="United Kingdom"
                    className="text-neutral-primary border-default-medium bg-neutral-secondary-medium checked:border-brand focus:ring-brand-subtle h-4 w-4 appearance-none rounded-full border border-blue-500 focus:ring-2 focus:outline-none"
                  />
                  <label
                    htmlFor="country-option-4"
                    className="text-heading ms-2 text-sm font-medium select-none"
                  >
                    Word of mouth
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="option-disabled"
                    type="radio"
                    name="countries"
                    value="China"
                    className="text-neutral-primary border-default-medium bg-neutral-secondary-medium checked:border-brand focus:ring-brand-subtle h-4 w-4 appearance-none rounded-full border border-blue-500 focus:ring-2 focus:outline-none"
                  />
                  <label
                    htmlFor="option-disabled"
                    className="text-fg-disabled ms-2 block text-sm font-medium select-none"
                  >
                    Other (Please specify)
                  </label>
                </div>
              </fieldset>

              <div className="flex gap-3 pt-10">
                <button className="w-full rounded rounded-full bg-gray-200 px-4 py-2 font-bold text-white hover:bg-gray-700">
                  Back
                </button>
                <button className="w-full rounded rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep == 2 && (
            <div className="tab">
              <div className="font-medium text-blue-500">
                <p>Student Details</p>
              </div>
              <div className="">
                <input
                  type="text"
                  id="first_name"
                  className="bg-neutral-secondary-medium border-default-medium text-heading rounded-base focus:ring-brand focus:border-brand placeholder:text-body block w-full rounded-3xl border-1 border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="John"
                  required
                />
              </div>
              <div className="">
                <input
                  type="text"
                  id="last_name"
                  className="bg-neutral-secondary-medium border-default-medium text-heading rounded-base focus:ring-brand focus:border-brand placeholder:text-body block w-full rounded-3xl border-1 border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Doe"
                  required
                />
              </div>

              <div className="pt-4">
                <div className="flex gap-3 pt-3">
                  <button className="w-full rounded rounded-full bg-gray-200 px-4 py-2 font-bold text-white hover:bg-gray-700">
                    Back
                  </button>
                  <button className="w-full rounded rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep == 3 && (
            <div className="tab">
              <div className="font-medium text-blue-500">
                <p>Student Details</p>
              </div>
              <div className="">
                <input
                  type="text"
                  id="first_name"
                  className="bg-neutral-secondary-medium border-default-medium text-heading rounded-base focus:ring-brand focus:border-brand placeholder:text-body block w-full rounded-3xl border-1 border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="John"
                  required
                />
              </div>
              <div className="pt-3">
                <input
                  type="text"
                  id="last_name"
                  className="bg-neutral-secondary-medium border-default-medium text-heading rounded-base focus:ring-brand focus:border-brand placeholder:text-body block w-full rounded-3xl border-1 border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Doe"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button className="w-full rounded rounded-full bg-gray-200 px-4 py-2 font-bold text-white hover:bg-gray-700">
                  Back
                </button>
                <button className="w-full rounded rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                  Next
                </button>
              </div>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <span className="step"></span>
            <span className="step"></span>
            <span className="step"></span>
            <span className="step"></span>
          </div>
        </form>
      </div>

      {/* Stripe elements wrapper commented out cleanly inside JSX */}
      {/* <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: Math.round(amount * 100),
            currency: "nzd",
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      */}
    </div>
  );
}
