'use client';

import JoinUsDescription from "@/components/joinus/MembershipSection";
import MembershipSection from "@/components/joinus/MembershipSection";
import SignupSection from "@/components/joinus/SignupSection";

const JoinUsPage= () => {
  return (
    <div className="mt-[10em] md:mt-[12em] min-h-[90vh] w-full mx-auto pb-20">
      <JoinUsDescription />
      <MembershipSection />
      <SignupSection />
    </div>
  );
}

export default JoinUsPage

