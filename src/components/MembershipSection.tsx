// this component fills outside container

import React from "react";
import Link from "next/link";

const MembershipSection = () => {
  return (
    <div
      className="
      flex flex-col justify-center items-center gap-4
    "
    >
      <h1
        className="
        w-[281px] 
        text-center text-[16px]/[20px]

        lg:w-[388px] lg:text-[30px]/[35px]
      "
      >
        Click to learn more about our Membership
      </h1>
      <Link
        href="/memberships"
        className="
        bg-lightBlue
        px-4 rounded-[40px] 
        text-[14px]/[35px] 
        transition hover:text-white hover:bg-darkBlue active:bg-[#0f4a88] active:text-white
        
        lg:py-2 lg:text-[25px]/[35px]   
      "
      >
        Membership
      </Link>
    </div>
  );
};

export default MembershipSection;
