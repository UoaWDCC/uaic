import React from "react";
import Image from "next/image";

const SponsorBanner = () => {
  return (
    <div
      className="
      w-full 
      flex flex-col items-center gap-[20px] 
      text-pretty
    "
    >
      <h1
        className="
        w-[313px] 
        font-[400] text-[10px] text-center

        lg:text-[28px]
        lg:w-[712px] 
      "
      >
        THE UAIC BULLETIN IS BROUGHT TO YOU IN PARTNERSHIP WITH:
      </h1>
      <div
        className="
        w-full h-[34px] 
        flex justify-evenly items-center
        bg-[#D9D9D9] 

        lg:h-[54px] 
      "
      >
        <Image
          src="/assets/forsyth-barr-logo.png"
          alt="forsyth-barr"
          width={100}
          height={100}
          className="
            w-[160px] h-[20px] 
            object-contain
            
            lg:w-[254px] 
            lg:h-[32px] 
        "
        />
        <Image
          src="/assets/NBR-logo.png"
          alt="NBR"
          width={100}
          height={100}
          className="
            w-[70px] 
            h-[20px] 
            object-contain

            lg:w-[112px] 
            lg:h-[32px] 
        "
        />
      </div>
      <div
        className="
        p-4 m-4 mt-14 max-w-[773px]
        border 

        lg:p-14 lg:px-30 
      "
      >
        <p
          className="
          text-[8px]/[22px] 
          
          lg:text-[18px]/[22px]
        "
        >
          If earnestly extremity he he propriety something admitting convinced
          ye. Pleasant in to although as if differed horrible. Mirth his quick
          its set front enjoy hoped had there. Who connection imprudence
          middletons too but increasing celebrated principles joy. Herself too
          improve gay winding ask expense are compact. New all paid few hard
          pure she.
        </p>
      </div>
    </div>
  );
};

export default SponsorBanner;
