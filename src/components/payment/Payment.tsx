"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";
import { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { CgRadioChecked } from "react-icons/cg";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(stripePublicKey);

export default function Payment() {
  const amount = 21.58;

  const [currentStep, setCurrentStep] = useState(0);
  const [radioValue, setRadio] = useState("Google search");

  return (
    /* Parent layout container: centering elements horizontally and vertically using flex */
    <div className="mx-auto flex h-screen w-screen flex-col items-center justify-center rounded-md border bg-gradient-to-tr from-[var(--babyBlue)] to-[var(--darkBlue)] p-10">
      {/* Centered White wrapper container card */}
      <div className="mb-10 w-full rounded-2xl bg-white p-4 pb-0 text-black shadow-[0_5px_15px_rgba(0,0,0,0.25)] lg:max-w-xl">
        <div id="regForm">
          {/* Fixed the dynamic variable text color configuration */}
          <h1 className="mb-4 text-2xl font-bold text-[var(--darkBlue)]">
            {currentStep < 3 ? "Membership" : "Payment"}
          </h1>

          <div className="mb-6 flex w-full items-center justify-between">
            <div className="relative h-9 w-9 flex-shrink-0 lg:h-9 lg:w-9">
              <CgRadioChecked
                className={`absolute inset-0 text-4xl text-blue-500 transition-all duration-300 lg:text-4xl ${currentStep === 0 ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"}`}
              />

              <IoIosCheckmarkCircle
                className={`absolute inset-0 text-4xl text-blue-500 transition-all duration-300 lg:text-4xl ${currentStep > 0 ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"}`}
              />
            </div>

            <div
              className={`mx-2 h-px flex-1 transition-colors duration-300 ${currentStep >= 1 ? "bg-blue-500" : "bg-gray-300"}`}
            />

            <div className="relative h-9 w-9 flex-shrink-0 lg:h-9 lg:w-9">
              <CgRadioChecked
                className={`absolute inset-0 text-4xl text-blue-500 transition-all duration-300 lg:text-4xl ${currentStep === 1 ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"}`}
              />

              <IoIosCheckmarkCircle
                className={`absolute inset-0 text-4xl text-blue-500 transition-all duration-300 lg:text-4xl ${currentStep > 1 ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"}`}
              />

              <MdRadioButtonUnchecked
                className={`absolute inset-0 text-4xl text-gray-300 transition-all duration-300 lg:text-4xl ${currentStep < 1 ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"}`}
              />
            </div>

            <div
              className={`mx-2 h-px flex-1 transition-colors duration-300 ${currentStep >= 2 ? "bg-blue-500" : "bg-gray-300"}`}
            />

            <div className="relative h-9 w-9 flex-shrink-0 lg:h-9 lg:w-9">
              <CgRadioChecked
                className={`absolute inset-0 text-4xl text-blue-500 transition-all duration-300 lg:text-4xl ${currentStep === 2 ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"}`}
              />

              <IoIosCheckmarkCircle
                className={`absolute inset-0 text-4xl text-blue-500 transition-all duration-300 lg:text-4xl ${currentStep > 2 ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"}`}
              />

              <MdRadioButtonUnchecked
                className={`absolute inset-0 text-4xl text-gray-300 transition-all duration-300 lg:text-4xl ${currentStep < 2 ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"}`}
              />
            </div>

            <div
              className={`mx-2 h-px flex-1 transition-all duration-300 ${currentStep >= 3 ? "bg-blue-500" : "bg-gray-300"}`}
            />

            <div className="relative h-9 w-9 flex-shrink-0 lg:h-9 lg:w-9">
              <CgRadioChecked
                className={`absolute inset-0 text-4xl text-blue-500 transition-all duration-300 lg:text-4xl ${currentStep === 3 ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"}`}
              />

              <MdRadioButtonUnchecked
                className={`absolute inset-0 text-4xl text-gray-300 transition-all duration-300 lg:text-4xl ${currentStep < 3 ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"}`}
              />
            </div>
          </div>

          {currentStep == 0 && (
            /* 1. Added space-y-4 to space everything out evenly automatically */
            <div className="tab space-y-4">
              <div className="font-medium text-blue-500">
                <p>Student Details</p>
              </div>

              <div className="flex">
                <input
                  type="text"
                  id="first_name"
                  className="block w-full rounded-l-full border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  id="last_name"
                  className="block w-full rounded-r-full border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Last Name"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  id="last_name"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Password"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  id="last_name"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="API(e.g. abcd123)"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  className="w-full rounded-full bg-gray-200 px-4 py-2 font-bold text-white transition hover:bg-gray-300"
                >
                  Back
                </button>
                <button
                  type="button"
                  className="w-full rounded-full bg-gradient-to-r from-[#3881f7] to-[#1439dd] px-4 py-2 font-bold text-white transition hover:from-blue-700 hover:to-blue-900"
                  onClick={() => setCurrentStep(1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep == 1 && (
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

              <div className="relative w-full">
                <input
                  type="text"
                  id="last_name"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Choice"
                  required
                />

                <GoArrowUpRight className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl text-blue-700" />
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  id="last_name"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Choice"
                  required
                />

                <GoArrowUpRight className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl text-blue-700" />
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  id="last_name"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Choice"
                  required
                />

                <GoArrowUpRight className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl text-blue-700" />
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  id="last_name"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Choice"
                  required
                />

                <GoArrowUpRight className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl text-blue-700" />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  className="w-full rounded-full bg-gray-200 px-4 py-2 font-bold text-white transition hover:bg-gray-300"
                  onClick={() => setCurrentStep(0)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="w-full rounded-full bg-gradient-to-r from-[#3881f7] to-[#1439dd] px-4 py-2 font-bold text-white transition hover:from-blue-700 hover:to-blue-900"
                  onClick={() => setCurrentStep(2)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep == 2 && (
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
                    name="default-radio"
                    value="Google search"
                    className="h-4 w-4 cursor-pointer appearance-none rounded-full border border-blue-500 bg-white transition-all checked:border-[5px] checked:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    checked={radioValue === "Google search"}
                    onChange={(e) => setRadio(e.target.value)}
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
                    value="Social media"
                    className="h-4 w-4 cursor-pointer appearance-none rounded-full border border-blue-500 bg-white transition-all checked:border-[5px] checked:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    checked={radioValue === "Social media"}
                    onChange={(e) => setRadio(e.target.value)}
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
                    value="Email newsletters"
                    className="h-4 w-4 cursor-pointer appearance-none rounded-full border border-blue-500 bg-white transition-all checked:border-[5px] checked:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    checked={radioValue === "Email newsletters"}
                    onChange={(e) => setRadio(e.target.value)}
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
                    value="Word of mouth"
                    className="h-4 w-4 cursor-pointer appearance-none rounded-full border border-blue-500 bg-white transition-all checked:border-[5px] checked:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    checked={radioValue === "Word of mouth"}
                    onChange={(e) => setRadio(e.target.value)}
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
                    value="Other"
                    className="h-4 w-4 cursor-pointer appearance-none rounded-full border border-blue-500 bg-white transition-all checked:border-[5px] checked:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    checked={radioValue === "Other"}
                    onChange={(e) => setRadio(e.target.value)}
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
                <button
                  className="w-full rounded-full bg-gray-200 px-4 py-2 font-bold text-white transition hover:bg-gray-300"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </button>
                <button
                  className="w-full rounded-full bg-gradient-to-r from-[#3881f7] to-[#1439dd] px-4 py-2 font-bold text-white transition hover:from-blue-700 hover:to-blue-900"
                  onClick={() => setCurrentStep(3)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep == 3 && (
            <div className="tab">
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
          )}

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <span className="step"></span>
            <span className="step"></span>
            <span className="step"></span>
            <span className="step"></span>
          </div>
        </div>
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
