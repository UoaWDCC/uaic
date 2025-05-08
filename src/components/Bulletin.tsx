import React from "react";
import Image from "next/image";

const Bulletin = () => {
  return (
    <div
      className="
        grid 
        grid-cols-[400px_1fr] grid-rows-2 
        gap-[10px] 
        w-full
        h-[300px]
      "
    >
      <div className="bg-[#EBF7FE] flex items-center justify-center text-black text-sm lg:text-l w-[400px]">
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
      <div className="bg-[#EBF7FE] flex items-center justify-center text-black text-sm lg:text-l">
        stonks
      </div>
      <div className="bg-[#EBF7FE] flex items-center justify-center text-black text-sm lg:text-l w-[400px]">
        Image 2 goes here
      </div>
      <div className="bg-[#EBF7FE] flex items-center justify-center text-black text-sm lg:text-l">
        Image 2 Description
      </div>
    </div>
  );
};

export default Bulletin;
