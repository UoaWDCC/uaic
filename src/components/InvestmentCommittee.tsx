"use client";
import React, { useState } from "react";
import Image from "next/image";


const InvestmentCommittee = () => {
  const [isMainOpen, setIsMainOpen] = useState(false);

  return (

    <div className="w-full mx-auto p-4 lg:px-10 bg-white rounded-lg shadow-md">

      <div>

        <button onClick={() => setIsMainOpen(!isMainOpen)} className="w-full flex justify-between items-center text-left text-[#145CA9] font-medium py-2">
          <span className="font-bold md:text-[20px]">Investment Committees</span>
          <img src={`/assets/${isMainOpen ? "arrow-up" : "arrow-down"}.png`} alt="" className="w-7 h-7  inline-block" />
        </button>

        {isMainOpen && (
          <div className="text-sm text-[#145CA9] flex flex-col items-center">
            <div className="w-full px-1">
              <p className="mb-4">The Investment Committee is responsible for managing the club's fund, including:</p>

              <ul className="list-disc list-inside mb-4 text-left">
                <li>Ensuring all investments are in line with the fund's value investing thesis</li>
                <li>Regularly pitching and analysing potential stock investments</li>
                <li>Voting to decide whether an investment passes to the next stage of approval</li>
              </ul>

              <div className="w-full h-[300px] flex items-center justify-center overflow-hidden rounded-lg">
                <Image
                  src="/assets/investment-committee.png"
                  alt="investment-committee"
                  width={500}
                  height={300}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="items-center text-center mt-4">
              <p className="p-2"><strong>Back Row: </strong>Max Wilson, Sam Gowen, Caden Van De Laak</p>
              <p className="p-2"><strong>Middle Row: </strong>Sophia Walker, Caleb Manson, Matt Powell, Tom Maclean, Shivam Shanker</p>
              <p className="p-2"><strong>Front Row: </strong>Amelia Cave, Abbey Patten, Rohit Guthpe, Aimee Ng, Cullen Tran, Lilly Crawford</p>
              <p className="p-2"><strong>Absent: </strong>Isabella Boswell, Andrew Griffiths</p>
            </div>
          </div>

        )}
      </div>

      <hr className="border-t border-[#CBC6C6] w-9/10 md:w-full self-center my-6" />

    </div>
  );
};

export default InvestmentCommittee;