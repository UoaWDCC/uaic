"use client";
import React, { useState } from "react";
import Image from "next/image";


const ExecutiveCommitteesDropdown = () => {
  const [isMainOpen, setIsMainOpen] = useState(false);



  return (

    <div className="w-full max-w-md mx-auto p-4 bg-white">

      <div>

        <button onClick={() => setIsMainOpen(!isMainOpen)} className="w-full flex justify-between items-center text-left text-[#145CA9] font-medium py-2">
          <span className="font-bold">Investment Committees</span>
          <img src={`/assets/${isMainOpen ? "arrow-up" : "arrow-down"}.png`} alt="" className="w-7 h-7  inline-block" />
        </button>

        {isMainOpen && (
          <div className="text-sm text-[#145CA9]">
            <p className="mb-2 pl-4">The Investment Committee is responsible for managing the club's fund, including:</p>
            <ul className="list-disc list-inside mb-4 pl-4">
              <li>Ensuring all investments are in line with the fund's value investing thesis</li>
              <li>Regularly pitching and analysing potential stock investments</li>
              <li>Voting to decide whether an investment passes to the next stage of approval</li>
            </ul>
            <div className="w-[500px] h-[300px] bg-[#EBF7FE] flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/investment-committee.png"
                alt="investment-committee"
                width={500}
                height={250}
                className="object-cover"
              />
            </div>
            <div className="items-center text-center">

              <p><strong>Back Row: </strong>Max wilson, Sam Gowen, Caden Van De Laak </p>
              <p><strong>Middle Row: </strong>Sophia Walker, Caleb Manson, Matt Powell, Tom Maclean, Shivam Shanker </p>
              <p><strong>Front Row: </strong>Amelia Cave, Abbey Patten, Rohit Guthpe, Aimee Ng, Cullen Tran, Lilly Crawford </p>
              <p><strong>Absent: </strong>Isabella Boswell, Andrew Griffiths</p>
            </div>

          </div>
        )}
      </div>

      <hr className="border-t border-[#CBC6C6] w-9/10 self-center my-6" />

    </div>
  );
};

export default ExecutiveCommitteesDropdown;