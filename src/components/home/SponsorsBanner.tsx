import React from "react";
import Link from "next/link";
import Image from "next/image";

const SponsorsBanner = () => {
  return (
    <>
      <div
        className="
            relative
            h-[178px] lg:h-[229px]
            bg-white
            overflow-hidden
            "
      >
        <h3
          className="
                        mt-[0px] font-[600] text-darkBlue 
                        text-[19.04px] leading-[19.04px] text-center
                        lg:mt-[40px]
                        lg:text-[28px] lg:leading-[22px]
                        "
        >
          Our Sponsors
        </h3>
        <div
          className="
            flex justify-evenly items-center 
            h-[25.14px] w-[285px] mt-[60px]
            mx-auto 
            gap-[62px]
            lg:gap-[406px]
            lg:h-[52px]
            lg:w-[971.4px]
            "
        >
          <Image
            src="/assets/logos/forsyth-barr-logo-v1.webp"
            alt="forsyth-barr"
            width={135}
            height={16.95}
            className="
                object-contain 
                lg:w-[500px] 
                lg:h-[280px]
            "
          />

          <Image
            src="/assets/logos/NBR-logo-v1.webp"
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
