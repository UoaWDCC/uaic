"use client";

import {useState} from "react";

const stepTexts = {
    1: "STEP 1",
    2: "STEP 2",
    3: "STEP 3"
};

export default function MembershipPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  return (
    /* Background */
    <div className="min-h-screen bg-linear-to-r from-[#249aff] to-[#005eaf]">        
        <div
            className={`m-0 h-[86px] w-[140px] bg-white mask-[url('/assets/logos/uaic.webp')] [mask-size:100%] mask-center mask-no-repeat lg:ml-10 lg:h-[100px] lg:w-[140px] mx-6 lg:mx-24`}
        />    

        <div className="flex justify-center px-6 py-9">
          <div className="flex min-h-[579px] w-full max-w-[708px] min-w-[38px] flex-col gap-[44px] rounded-[16px] bg-white px-[24px] py-[28px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
          <div className="flex flex-col"> 
            <p className="font-bold text-[#249aff]">{stepTexts[step]}</p>
            <h2 className="py-2 text-left text-2xl text-[30px] font-bold text-[#0B1A2B]">
                Membership Signup
            </h2>
          </div>  

          <div className="flex flex-row mt-auto gap-2">
            <button onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)} className="w-[147.5px] h-[52px] lg:w-[326px] bg-[#EFF4FA] text-[#005EAF] px-4 py-2 font-size-[20px] font-semibold rounded-full hover:bg-blue-700">
              Back
            </button>            
            <button onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)} className="w-[147.5px] h-[52px] lg:w-[326px] bg-linear-to-r from-[#249aff] to-[#005eaf] text-white px-4 py-2 font-size-[20px] font-semibold rounded-full hover:bg-blue-700">
              Next
            </button>  
          </div>  
        </div>
      </div>
    </div>
  );
}
