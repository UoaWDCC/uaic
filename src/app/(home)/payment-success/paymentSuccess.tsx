"use client";

import React, { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { ClipLoader } from "react-spinners";

export default function PaymentSuccess({ amount }: { amount: string }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="mx-auto flex h-screen w-screen flex-col items-center justify-center rounded-md border bg-gradient-to-tr from-[var(--babyBlue)] to-[var(--darkBlue)] p-10">
      {/* Centered White wrapper container card */}
      <div className="mb-10 w-full rounded-2xl bg-white p-4 pb-0 text-center text-black shadow-[0_5px_15px_rgba(0,0,0,0.25)] lg:max-w-xl">
        <p className="text-2xl font-bold">Thank you for your payment.</p>
        <div className="pt-10 pb-10">
          {isLoading ? (
            <ClipLoader color="#5482f3" size={150} />
          ) : (
            <IoIosCheckmarkCircle className="mx-auto size-45 text-blue-400" />
          )}
        </div>

        <div className="flex justify-center pb-10">
          <div className="flex w-80 flex-col gap-y-4 text-left">
            <div className="flex justify-between">
              Confirm number: <p className="inline text-gray-400">1234 5678 9101 1212</p>
            </div>

            <div className="flex justify-between">
              Payment amount: <p className="inline text-gray-400">${amount}</p>
            </div>

            <div className="flex justify-between">
              Payment date: <p className="inline text-gray-400">04/01/2022</p>
            </div>

            <div className="flex justify-between">
              <p>From account:</p>

              <div className="text-right text-gray-400">
                <p>BANK NA</p>
                <p>(...0248)</p>
                <p>(Checking)</p>
              </div>
            </div>

            <div className="flex justify-between">
              <p>To account: </p>

              <div className="text-right">
                <p className="text-gray-400">P WHEATLEY</p>
                <p className="text-gray-400">(...8668)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
