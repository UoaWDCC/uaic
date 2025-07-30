'use client';

import JoinUsDescription from "@/components/joinus/JoinUsDescription";
import MembershipSection from "@/components/joinus/MembershipSection";
import SignupSection from "@/components/joinus/SignupSection";

const JoinUsPage= () => {
  return (
    <div className="mt-[10em] md:mt-[12em] min-h-[90vh] w-full mx-auto">
      <JoinUsDescription />
      <SignupSection />
      <MembershipSection />
      
    </div>
  );
}

export default JoinUsPage

