// this component fills outside container

import React from "react";

const MembershipSection = () => {
  return (
    <div
      className="
      flex flex-col justify-center items-center gap-4
    ">
      <h1
        className="
        w-[281px] 
        text-center text-[16px]/[20px]

        lg:w-[388px] lg:text-[30px]/[35px]
      ">
        Click to learn more about our Membership
      </h1>
      <a
        href="/memberships"
        className="
        bg-[#EBF7FE]
        px-4 rounded-[40px] 
        text-[14px]/[35px] 
        transition hover:text-white hover:bg-[#145CA9] active:bg-[#0f4a88] active:text-white
        
        lg:py-2 lg:text-[25px]/[35px]   
      ">
        Membership
      </a>
    </div>
  );
};

export default MembershipSection;
