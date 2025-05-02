import React from "react";

const RecentEvents = () => {
  return (
    <div className="
      text-center mt-[20px] 
      lg:max-w-[590px]
    ">

      <h1 className="
        text-[22px]/[28px] mb-[20px] 
        lg:text-[40px]/[28px]
      ">
        Our Recent Events
      </h1>

      <div className="flex flex-col gap-[26px] text-left">

        <div className="bg-[#EBF7FE]">
          <h1 className="p-[20px] lg:p-[23px]">
            <span className="block text-[18px] lg:text-[25px]">Investing 101 with Raymond Webb</span>
            <span className="
              block mt-[30px] text-[16px]
              lg:mt-[2px] lg:text-[23px]
            ">Tuesday 25th  March 2025</span>
          </h1>
        </div>

        <div className="bg-[#EBF7FE]">
          <h1 className="p-[20px] lg:p-[23px]">
            <span className="block text-[18px] lg:text-[25px]">Intro Night</span>
            <span className="
              block mt-[30px] text-[16px] 
              lg:mt-[2px] lg:text-[23px]
            ">Tuesday 18th March 2025</span>
          </h1>
          </div>

      </div>

    </div>

  );
};

export default RecentEvents;

