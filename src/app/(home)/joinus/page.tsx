"use client";

import BlueGradient from "@/components/BlueGradient";
import JoinUsDescription from "@/components/joinus/JoinUsDescription";
import MembershipSection from "@/components/joinus/MembershipSection";
import SignupSection from "@/components/joinus/SignupSection";

const JoinUsPage = () => {
  return (
    <div className="mx-auto mt-[10em] min-h-[90vh] w-full md:mt-[12em]">
      <JoinUsDescription />
      <SignupSection />
      <MembershipSection />
      <BlueGradient />
    </div>
  );
};

export default JoinUsPage;
