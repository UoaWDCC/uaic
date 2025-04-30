// this component fills outside container

import React from "react";

const MembershipCallout = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 ">
      <h1 className="w-[281px] lg:w-[388px] text-center text-[16px]/[20px] lg:text-[30px]/[35px]">
        Click to learn more about our Membership
      </h1>
        <a href="/memberships" className="bg-[#EBF7FE] hover:bg-[#145CA9] hover:text-white transition px-4 lg:py-2 rounded-[40px] text-[14px]/[35px] lg:text-[25px]/[35px]">Membership</a>
    </div>
  );
};

export default MembershipCallout;
