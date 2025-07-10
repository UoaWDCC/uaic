"use client";
import React, { useState } from "react";
import Image from "next/image";


const InvestmentCommittee = () => {
  const [isMainOpen, setIsMainOpen] = useState(false);



  return (

    <div className="w-full mx-auto p-4 lg:px-10 bg-white rounded-lg shadow-md">

      <div>

        <button onClick={() => setIsMainOpen(!isMainOpen)} className="w-full flex justify-between items-center text-left text-[#145CA9] font-medium py-2">
          <span className="font-bold ">Bulletin Committees</span>
          <img src={`/assets/${isMainOpen ? "arrow-up" : "arrow-down"}.png`} alt="" className="w-7 h-7  inline-block" />
        </button>

        {isMainOpen && (
          <div className="text-sm text-[#145CA9] flex flex-col items-center">
            <div className="w-[500px]">
              <p className="mb-4">The Bulletin Committee is responsible for publishing the club's bulletin, including:</p>

              <ul className="list-disc list-inside mb-4 text-left">
                <li>Writing articles on a range of financial and economic topics</li>
                <li>Offering advice on each other's articles</li>
                <li>Contributing opinions towards the club's weekly magazine</li>
              </ul>

              <div className="w-full h-[300px] bg-[#EBF7FE] flex items-center justify-center overflow-hidden rounded-lg">
                <Image
                  src="/assets/bulletin-committee.png"
                  alt="investment-committee"
                  width={500}
                  height={300}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="items-center text-center mt-4">
              <p className="p-2"><strong>Back Row: </strong>Daniel Guonho-Song, Andy Tran, Sohum Karl, Meghana Gaddam</p>
              <p className="p-2"><strong>Third Row: </strong>Yasmin Coombe, Skip Gee, Connor Petrie, Oliver Turnbull</p>
              <p className="p-2"><strong>Second Row: </strong>Yao Ming Lee, Hunter Sari, Alice Hout</p>
              <p className="p-2"><strong>Front Row: </strong>Devika Modak, Annabelle Larsen, Isabella Ho, Riley Bogard-Allen, Lisa Shiozawa, Manav Treekam</p>
              <p className="p-2"><strong>Absent: </strong>Bella Crawford, Waejen Kwan</p>
            </div>
          </div>

        )}
      </div>

      <hr className="border-t border-[#CBC6C6] w-9/10 self-center my-6" />

    </div>
  );
};

export default InvestmentCommittee;