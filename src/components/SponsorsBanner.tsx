import React from "react";
import Link from "next/link";
import Image from "next/image";

const SponsorsBanner = () => {
  return (
    <>
      {/* This is to hide/disable the scrolling horizontally of the background */}
    
      <div className="
            relative
            h-[178px] lg:h-[229px]
            bg-gradient-to-r from-white/70 via-white/30 to-transparent
            rounded-[8px]
            shadow-[0_0_30px_rgba(255,255,255,0.4)]   // subtle glow
            overflow-hidden
            ">

        <h3 className="
                        mt-[40px] font-[600] text-[#145CA9] 
                        text-[19.04px] leading-[19.04px] text-center
                        lg:text-[28px] lg:leading-[22px]
                        ">
                        Our Sponsors
            </h3>
        <div  
            className="
            flex justify-evenly items-center 
            h-[25.14px] w-[285px] mt-[60px]
            mx-auto 
            gap-[62px]
            lg:gap-[376px]
            lg:h-[52px]
            lg:w-[971.4px]
            "
        >
            <Image
            src="/assets/forsyth-barr-logo-v2.png"
            alt="forsyth-barr"
            width={135}
            height={16.95}
            className="
                object-contain 
                lg:w-[413.4px] 
                lg:h-[51.92px]
            "
            />

            <Image
            src="/assets/NBR-logo-v2.png"
            alt="NBR"
            width={88}
            height={25.14}
            className="
                object-contain 
                lg:w-[182px] 
                lg:h-[52px]
            "
            />

        </div>
      </div>
    </>
  );
};

export default SponsorsBanner;
