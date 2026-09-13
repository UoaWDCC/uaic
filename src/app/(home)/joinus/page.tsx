"use client";

import BlueGradient from "@/components/BlueGradient";
import JoinUsDescription from "@/features/joinus/components/JoinUsDescription";
import MembershipSection from "@/features/joinus/components/MembershipSection";
import SignupSection from "@/features/joinus/components/SignupSection";

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
