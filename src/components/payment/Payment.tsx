"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";
import { SetStateAction, useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { CgRadioChecked } from "react-icons/cg";
import { MdError, MdRadioButtonUnchecked } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { redirect } from "next/navigation";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(stripePublicKey);

export default function Payment() {
  const amount = 21.58;

  const [currentStep, setCurrentStep] = useState(0);
  const [dropdown1, setDrop1] = useState(false);
  const [dropdown2, setDrop2] = useState(false);
  const [dropdown3, setDrop3] = useState(false);

  const [checkButton1, setCheck1] = useState(false);
  const [checkButton2, setCheck2] = useState(false);
  const [checkButton3, setCheck3] = useState(false);
  const [checkButton4, setCheck4] = useState(false);
  const [checkButton5, setCheck5] = useState(false);

  const genderOptions = ["Male", "Female", "Gender Diverse", "Preferred Not To Say"];
  const universityYearOptions = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5+", "Postgraduate"];
  const ethnicityOptions = [
    "European",
    "Pacific",
    "MELAA",
    "Māori",
    "Asian",
    "Other",
    "Prefer Not To Say",
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [UPI, setUPI] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErroMsg] = useState("");
  const [openErrorPage, setErrorPage] = useState(false);

  const [specifyInput, setSpecifyInput] = useState(false);
  const [specifyContent, setSpecifyContent] = useState("");
  const [studentId, setStudentId] = useState(-1);

  const [gender, setGender] = useState("Gender:");
  const [displayedGender, setDisplayedGender] = useState("Gender:");
  const [university, setUniversity] = useState("");
  const [uniYear, setUniYear] = useState("University Year:");
  const [displayedUniYear, setDisplayedUniYear] = useState("University Year:");
  const [degrees, setDegrees] = useState("");
  const [major, setMajor] = useState("");
  const [ethnicity, setEthnicity] = useState("Ethnicity:");
  const [displayedEthnicity, setDisplayedEthnicity] = useState("Ethnicity:");

  function validateNext(i: SetStateAction<number>, bypass: boolean) {
    if (i == 1 && bypass == false) {
      if (firstName != "" && lastName != "" && UPI != "" && password != "") {
        setCurrentStep(i);
        setErrorPage(false);
      } else {
        setErroMsg("Error, you must fill all input fields!");
        setErrorPage(true);
      }
    }

    if (i == 2 && bypass == false) {
      if (
        gender != "Gender:" &&
        uniYear != "University Year:" &&
        university != "" &&
        ethnicity != "Ethnicity:" &&
        degrees != "" &&
        major != ""
      ) {
        setCurrentStep(i);
        setErrorPage(false);
      } else {
        setErroMsg("Error, you must provide all student details!");
        setErrorPage(true);
      }
    }

    if (i == 3 && bypass == false) {
      if (
        checkButton1 ||
        checkButton2 ||
        checkButton3 ||
        checkButton4 ||
        (checkButton5 && specifyContent != "")
      ) {
        setCurrentStep(i);
        setErrorPage(false);
      } else {
        setErroMsg("Error, you select at least one option!");
        setErrorPage(true);
      }
    }

    if (bypass == true) {
      setCurrentStep(i);
    }
  }
  useEffect(() => {
    if (!openErrorPage) return;

    const timer = setTimeout(() => {
      setErrorPage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [openErrorPage]); //run this useEffect whenever openErrorPage changes.

  return (
    /* Parent layout container: centering elements horizontally and vertically using flex */
    <div className="fixed inset-0 z-50 mx-auto flex h-screen w-screen flex-col items-center justify-center rounded-md border bg-gradient-to-tr from-[var(--babyBlue)] to-[var(--darkBlue)] p-10">
      {/* Centered White wrapper container card */}
      <div className="mb-10 w-full rounded-2xl bg-white p-4 pb-0 text-black shadow-[0_5px_15px_rgba(0,0,0,0.25)] lg:max-w-xl">
        <div
          className={`fixed bottom-10 left-5/7 z-70 flex w-1/3 items-center justify-center gap-2 rounded-xl border-2 border-red-400 bg-white p-1 pt-2 text-center text-xl transition duration-100 lg:h-[150px] lg:max-w-[300px] ${openErrorPage ? "opacity-100" : "opacity-0"}`}
        >
          {" "}
          {/* left-1/2 puts element's left edge at the middle, and -translate-x-1/2 move element left by half, essentially moving the element to the middle. */}{" "}
          <MdError className="text-3xl text-red-500" />
          {errorMsg}
        </div>

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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  id="last_name"
                  className="block w-full rounded-r-full border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  id="last_name"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  id="last_name"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="UPI(e.g. abcd123)"
                  value={UPI}
                  onChange={(e) => setUPI(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  className="w-full rounded-full bg-gray-200 px-4 py-2 font-bold text-[#145ca9] transition hover:bg-gray-300"
                  onClick={() => redirect("/")}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="w-full rounded-full bg-gradient-to-r from-[#3881f7] to-[#1439dd] px-4 py-2 font-bold text-white transition hover:from-blue-700 hover:to-blue-900"
                  onClick={() => validateNext(1, false)}
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

              <div className="relative w-full">
                <button
                  id="gender"
                  className="w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-left text-sm shadow-xs"
                  onClick={() => setDrop1(!dropdown1)}
                >
                  {displayedGender}
                  <GoArrowUpRight
                    className={`absolute top-1/2 right-4 -translate-y-1/2 text-2xl text-blue-700 transition duration-100 ${dropdown1 ? "rotate-45" : "rotate-0"}`}
                  />
                </button>

                {dropdown1 && (
                  <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg">
                    {genderOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          if (option == "Male") {
                            setGender("male");
                          } else if (option == "Female") {
                            setGender("female");
                          } else if (option == "Gender Diverse") {
                            setGender("nonBinary");
                          } else {
                            setGender("preferNotToSay");
                          }
                          setDisplayedGender(option);

                          setDrop1(false);
                        }}
                        className="p-2 text-sm hover:bg-blue-100"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <input
                  type="number"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Student ID"
                  value={studentId === -1 ? "" : studentId}
                  onChange={(e) => setStudentId(Number(e.target.value))}
                  required
                />
              </div>

              <div>
                <input
                  type="string"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="University"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  required
                />
              </div>

              <div className="relative w-full">
                <button
                  id="uniYear"
                  className="w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-left text-sm shadow-xs"
                  onClick={() => setDrop2(!dropdown2)}
                >
                  {displayedUniYear}
                  <GoArrowUpRight
                    className={`absolute top-1/2 right-4 -translate-y-1/2 text-2xl text-blue-700 transition duration-100 ${dropdown2 ? "rotate-45" : "rotate-0"}`}
                  />
                </button>

                {dropdown2 && (
                  <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg">
                    {universityYearOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          if (option == "Year 1") {
                            setUniYear("year1");
                          } else if (option == "Year 2") {
                            setUniYear("year2");
                          } else if (option == "Year 3") {
                            setUniYear("year3");
                          } else if (option == "Year 4") {
                            setUniYear("year4");
                          } else if (option == "Year 5+") {
                            setUniYear("year5Plus");
                          } else {
                            setUniYear("postgraduate");
                          }
                          setDisplayedUniYear(option);
                          setDrop2(false);
                        }}
                        className="p-2 text-sm hover:bg-blue-100"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <input
                  type="string"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Degrees"
                  value={degrees}
                  onChange={(e) => setDegrees(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="string"
                  className="block w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                  placeholder="Major"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  required
                />
              </div>

              <div className="relative w-full">
                <button
                  id="ethnicity"
                  className="w-full rounded-3xl border border-gray-200 px-3 py-2.5 text-left text-sm shadow-xs"
                  onClick={() => setDrop3(!dropdown3)}
                >
                  {displayedEthnicity}
                  <GoArrowUpRight
                    className={`absolute top-1/2 right-4 -translate-y-1/2 text-2xl text-blue-700 transition duration-100 ${dropdown3 ? "rotate-45" : "rotate-0"}`}
                  />
                </button>

                {dropdown3 && (
                  <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg">
                    {ethnicityOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          if (option == "European") {
                            setEthnicity("european");
                          } else if (option == "Asian") {
                            setEthnicity("asian");
                          } else if (option == "Māori") {
                            setEthnicity("maori");
                          } else if (option == "MELAA") {
                            setEthnicity("melaa");
                          } else if (option == "Prefer Not To Say") {
                            setEthnicity("preferNotToSay");
                          } else if (option == "Pacific") {
                            setEthnicity("pacificPeoples");
                          } else {
                            setEthnicity("other");
                          }
                          setDisplayedEthnicity(option);
                          setDrop3(false);
                        }}
                        className="p-2 text-sm hover:bg-blue-100"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  className="w-full rounded-full bg-gray-200 px-4 py-2 font-bold text-[#145ca9] transition hover:bg-gray-300"
                  onClick={() => setCurrentStep(0)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="w-full rounded-full bg-gradient-to-r from-[#3881f7] to-[#1439dd] px-4 py-2 font-bold text-white transition hover:from-blue-700 hover:to-blue-900"
                  onClick={() => validateNext(2, false)}
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
                  <div className="relative h-4 w-4">
                    <input
                      id="country-option-1"
                      type="checkbox"
                      name="default-radio"
                      value="Google search"
                      checked={checkButton1}
                      onChange={() => setCheck1(!checkButton1)}
                      className="h-4 w-4 cursor-pointer appearance-none rounded-full border border-blue-500 bg-white transition-all focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    />

                    <IoIosCheckmarkCircle
                      className={`pointer-events-none absolute top-0 -left-0.5 size-5 text-blue-500 transition duration-100 ${checkButton1 ? "opacity-100" : "opacity-0"}`}
                    />
                  </div>

                  <label
                    htmlFor="country-option-1"
                    className="ms-2 text-sm font-medium select-none"
                  >
                    Google search
                  </label>
                </div>

                <div className="mb-4 flex items-center">
                  <div className="relative h-4 w-4">
                    <input
                      id="country-option-2"
                      type="checkbox"
                      name="default-radio"
                      value="Google search"
                      checked={checkButton2}
                      onChange={() => setCheck2(!checkButton2)}
                      className="h-4 w-4 cursor-pointer appearance-none rounded-full border border-blue-500 bg-white transition-all focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    />

                    <IoIosCheckmarkCircle
                      className={`pointer-events-none absolute top-0 -left-0.5 size-5 text-blue-500 transition duration-100 ${checkButton2 ? "opacity-100" : "opacity-0"}`}
                    />
                  </div>

                  <label
                    htmlFor="country-option-2"
                    className="ms-2 text-sm font-medium select-none"
                  >
                    Social media
                  </label>
                </div>

                <div className="mb-4 flex items-center">
                  <div className="relative h-4 w-4">
                    <input
                      id="country-option-3"
                      type="checkbox"
                      name="default-radio"
                      value="Google search"
                      checked={checkButton3}
                      onChange={() => setCheck3(!checkButton3)}
                      className="h-4 w-4 cursor-pointer appearance-none rounded-full border border-blue-500 bg-white transition-all focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    />

                    <IoIosCheckmarkCircle
                      className={`pointer-events-none absolute top-0 -left-0.5 size-5 text-blue-500 transition duration-100 ${checkButton3 ? "opacity-100" : "opacity-0"}`}
                    />
                  </div>

                  <label
                    htmlFor="country-option-3"
                    className="ms-2 text-sm font-medium select-none"
                  >
                    Email newslettters
                  </label>
                </div>

                <div className="mb-4 flex items-center">
                  <div className="relative h-4 w-4">
                    <input
                      id="country-option-4"
                      type="checkbox"
                      name="default-radio"
                      value="Google search"
                      checked={checkButton4}
                      onChange={() => setCheck4(!checkButton4)}
                      className="h-4 w-4 cursor-pointer appearance-none rounded-full border border-blue-500 bg-white transition-all focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    />

                    <IoIosCheckmarkCircle
                      className={`pointer-events-none absolute top-0 -left-0.5 size-5 text-blue-500 transition duration-100 ${checkButton4 ? "opacity-100" : "opacity-0"}`}
                    />
                  </div>

                  <label
                    htmlFor="country-option-4"
                    className="ms-2 text-sm font-medium select-none"
                  >
                    Word of mouth
                  </label>
                </div>

                <div className="mb-4 flex flex-wrap items-center">
                  <div className="relative h-4 w-4">
                    <input
                      id="country-option-5"
                      type="checkbox"
                      name="default-radio"
                      value="Google search"
                      checked={checkButton5}
                      onChange={() => {
                        (setCheck5(!checkButton5), setSpecifyInput(!checkButton5));
                      }}
                      className="h-4 w-4 cursor-pointer appearance-none rounded-full border border-blue-500 bg-white transition-all focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    />

                    <IoIosCheckmarkCircle
                      className={`pointer-events-none absolute top-0 -left-0.5 size-5 text-blue-500 transition duration-100 ${checkButton5 ? "opacity-100" : "opacity-0"}`}
                    />
                  </div>

                  <label
                    htmlFor="country-option-5"
                    className="ms-2 text-sm font-medium select-none"
                  >
                    Other (Please specify)
                  </label>

                  {specifyInput && (
                    <div className="basis-full pt-2">
                      <input
                        type="text"
                        id="specify"
                        className="w-full rounded-full border border-gray-200 px-3 py-2.5 text-sm shadow-xs"
                        placeholder="Specify your option"
                        value={specifyContent}
                        onChange={(e) => setSpecifyContent(e.target.value)}
                        required
                      />
                    </div>
                  )}
                </div>
              </fieldset>

              <div className="flex gap-3 pt-10">
                <button
                  className="w-full rounded-full bg-gray-200 px-4 py-2 font-bold text-[#145ca9] transition hover:bg-gray-300"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </button>
                <button
                  className="w-full rounded-full bg-gradient-to-r from-[#3881f7] to-[#1439dd] px-4 py-2 font-bold text-white transition hover:from-blue-700 hover:to-blue-900"
                  onClick={() => validateNext(3, false)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep == 3 && (
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: Math.round(amount * 100),
                currency: "nzd",
              }}
            >
              <CheckoutPage
                amount={amount}
                name={firstName + "|" + lastName}
                upi={UPI}
                studentId={studentId}
                degrees={degrees}
                ethnicity={ethnicity}
                gender={gender}
                universityYear={uniYear}
                majors={major}
              />
            </Elements>
          )}

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <span className="step"></span>
            <span className="step"></span>
            <span className="step"></span>
            <span className="step"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
