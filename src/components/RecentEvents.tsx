import React from "react";

const RecentEvents = () => {
  return (
    <div className="
      text-center mt-[20px] 
      lg:max-w-[590px]
      text-[#000000]
    ">

      <h1 className="
        text-[22px]/[28px] mb-[20px] text-[#172741]
        lg:text-[40px]/[28px] lg:text-[#000000]
      ">
        Our Recent Events
      </h1>

      <div className="flex flex-col gap-[26px] text-left">
        <div className="bg-[#EBF7FE] border-2 border-[#CBC6C6]" style={{ boxShadow: '0 5px 10px rgba(0, 0, 0, 0.25)' }}>
          <h1 className="
            p-[20px] pt-[35px] pb-[35px]
            lg:p-[23px] 
          ">
            <span className="
              block text-[18px] 
              lg:text-[23px]
            ">
              Investing 101 with Raymond Webb
            </span>
            <span className="
              block mt-[15px] text-[16px] 
              lg:mt-[2px] lg:text-[21px]
            ">Tuesday 25th  March 2025</span>
          </h1>
        </div>
        <div className="bg-[#EBF7FE] border-2 border-[#CBC6C6]" style={{ boxShadow: '0 5px 10px rgba(0, 0, 0, 0.25)' }}>
          <h1 className="
            p-[20px] pt-[35px] pb-[35px]
            lg:p-[23px]
          ">
            <span className="
              block text-[18px] 
              lg:text-[23px]
              ">
                Intro Night
            </span>
            <span className="
              block mt-[15px] text-[16px] 
              lg:mt-[2px] lg:text-[21px]
              ">
                Tuesday 18th March 2025
            </span>
          </h1>
          
          </div>

      </div>

    </div>

  );
};

export default RecentEvents;

