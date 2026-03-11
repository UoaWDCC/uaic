import React from "react";
import Image from "next/image";

const SponsorsBanner = () => {
  return (
    <>
      <div className="relative h-[178px] overflow-hidden bg-white lg:h-[229px]">
        <h3 className="text-darkBlue mt-[0px] text-center text-[19.04px] leading-[19.04px] font-[600] lg:mt-[40px] lg:text-[28px] lg:leading-[22px]">
          Our Sponsors
        </h3>
        <div className="mx-auto mt-[60px] flex h-[25.14px] w-[285px] items-center justify-evenly gap-[62px] lg:h-[52px] lg:w-[971.4px] lg:gap-[406px]">
          <Image
            src="/assets/logos/forsyth-barr-logo-v1.webp"
            alt="forsyth-barr"
            width={135}
            height={16.95}
            className="object-contain lg:h-[280px] lg:w-[500px]"
          />

          <Image
            src="/assets/logos/NBR-logo-v1.webp"
            alt="NBR"
            width={88}
            height={25.14}
            className="object-contain lg:h-[52px] lg:w-[182px]"
          />
        </div>
      </div>
    </>
  );
};

export default SponsorsBanner;
