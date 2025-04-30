import React from "react";
import Image from "next/image";

const Partnership = () => {
  return (
    <div className="w-full flex flex-col items-center gap-[20px] text-pretty">
      <h1 className="font-[400] text-[10px] lg:text-[28px] w-[313px] lg:w-[712px] text-center">
        THE UAIC BULLETIN IS BROUGHT TO YOU IN PARTNERSHIP WITH:
      </h1>
      <div className="w-full h-[34px] lg:h-[54px] bg-[#D9D9D9] flex justify-evenly items-center">
        <Image
          src="/assets/forsyth-barr-logo.png"
          alt="forsyth-barr"
          width={100}
          height={100}
          className="w-[160px] lg:w-[254px] h-[20px] lg:h-[32px] object-contain"
        />
        <Image
          src="/assets/NBR-logo.png"
          alt="NBR"
          width={100}
          height={100}
          className="w-[70px] lg:w-[112px] h-[20px] lg:h-[32px] object-contain"
        />
      </div>
      <div className="border p-4 lg:p-14 lg:px-30 m-4 mt-14 max-w-[773px]">
        <p className="text-[8px]/[22px] lg:text-[18px]/[22px]">
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

export default Partnership;
