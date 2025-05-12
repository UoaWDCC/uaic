import React from "react";
import Image from "next/image";

const Bulletin = () => {
  return (
    <div
      className="
        grid 
        grid-cols-[33.33333%_1fr] grid-rows-2 
        gap-[10px] 
        w-full
        h-[150px]
        text-[10px]/[12px] 

        lg:h-[300px]
        lg:text-[18px]/[22px]
      "
    >
      <div className="bg-[#EBF7FE] flex items-center justify-center text-black">
        <Image
          src="/assets/stonks-up.jpg"
          alt="forsyth-barr"
          width={100}
          height={100}
          className="
            w-full
            h-full
            object-contain
          "
        />
      </div>
      <div className="bg-[#EBF7FE] flex items-center justify-center text-black p-4 lg:p-10 ">
        If earnestly extremity he he propriety something admitting convinced
        ye. Pleasant in to although as if differed horrible. Mirth his quick
        its set front enjoy hoped had there.
      </div>
      <div className="bg-[#EBF7FE] flex items-center justify-center text-black ">
      <Image
          src="/assets/stonks-up.jpg"
          alt="forsyth-barr"
          width={100}
          height={100}
          className="
            w-full
            h-full
            object-contain
          "
        />
      </div>
      <div className="bg-[#EBF7FE] flex items-center justify-center text-black p-4 lg:p-10">
        stonks
      </div>
    </div>
  );
};

export default Bulletin;
