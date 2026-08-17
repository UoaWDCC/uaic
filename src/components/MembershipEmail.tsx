"use client";
import Link from "next/link";
import MemberSignupButton from "./MemberSignupButton";

const MembershipEmail = () => {
  return (
    <div className="w-full">
      {/* Container */}
      <div className="sm:py-28px flex justify-center px-6">
        <div className="flex min-h-[600px] w-full max-w-[472px] flex-col gap-[30px] rounded-[8px] bg-white px-[28px] py-[30px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
          <div className="w-full flex-col gap-[8px]">
            <div className="w-full text-[5vw] font-semibold text-[#00529B] lg:text-[2.2vw]">
              Welcome to the Club!
            </div>
            <div className="w-full text-[4vw] text-[rgba(0,0,0,0.20)] lg:text-[1.7vw]">
              Your membership has been confirmed.
            </div>
          </div>
          {/* intro */}
          <div className="w-full text-[3vw] text-black lg:text-[1.5vw]">
            Hi [First Name],
            <p>
              <br />
              You're officially a member of the UoA Investment Club. Whether you're here to learn
              the basics, build on what you know, or go deep on markets — there's a place for you
              here.
            </p>
          </div>
          {/* Membership Details */}
          <div className="w-full flex-col gap-[24px]">
            <div className="lg:text-[1.5vw font-600 gap-[24px] text-[3.5vw] text-[#249AFF]">
              MEMBERSHIP DETAILS
              <div className="w-full flex-row">
                <div className="flex w-full justify-between pt-5">
                  <div className="left-0 text-[3vw] text-[#A1A1A1] lg:text-[1.vw]">Name</div>
                  <div className="left-0 text-[3vw] text-[#005EAF] lg:text-[1.vw]">[Full Name]</div>
                </div>
                <div className="h-[24px] w-full border-b-[0.8px] border-[#A1A1A1] bg-white"></div>
                <div className="flex w-full justify-between pt-4">
                  <div className="left-0 text-[3vw] text-[#A1A1A1] lg:text-[1.vw]">Member ID</div>
                  <div className="left-0 text-[3vw] text-[#005EAF] lg:text-[1.vw]">
                    #UAIC-2025-[ID]
                  </div>
                </div>
                <div className="h-[24px] w-full border-b-[0.8px] border-[#A1A1A1] bg-white"></div>
              </div>
              <div className="flex w-full justify-between pt-4">
                <div className="left-0 text-[3vw] text-[#A1A1A1] lg:text-[1.vw]">Joined</div>
                <div className="left-0 text-[3vw] text-[#005EAF] lg:text-[1.vw]">[Date]</div>
              </div>
              <div className="h-[24px] w-full border-b-[0.8px] border-[#A1A1A1] bg-white"></div>
            </div>
          </div>
          {/* Next steps section */}
          <div>
            <div className="gap-[24px] pb-4 text-[3.5vw] text-[#249AFF]">
              <div className="font-600 pb-5 lg:text-[1.5vw]"> What's next?</div>
              <div className="w-full flex-row justify-center">
                {/* one */}
                <div className="flex w-full flex-row items-start gap-3 pb-3">
                  <div className="flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center rounded-full bg-[#249AFF] text-[2.5vw] font-semibold text-white md:text-base">
                    1
                  </div>
                  <div className="flex flex-col">
                    <div className="w-full text-[3vw] text-black md:text-lg">
                      Join the member portal
                    </div>
                    <div className="w-full text-[2.5vw] text-black opacity-50 md:text-sm">
                      Access research, meeting notes, and resources through the UAIC member hub.
                    </div>
                  </div>
                </div>
                {/* two */}
                <div className="flex w-full flex-row items-start gap-3 pb-3">
                  <div className="flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center rounded-full bg-[#249AFF] text-[2.5vw] font-semibold text-white md:text-base">
                    2
                  </div>
                  <div className="flex flex-col">
                    <div className="w-full text-[3vw] text-black md:text-lg">
                      Attend your first session
                    </div>
                    <div className="w-full text-[2.5vw] text-black opacity-50 md:text-sm">
                      We meet weekly — check your email for the schedule and location.
                    </div>
                  </div>
                </div>
                {/* three */}
                <div className="flex w-full flex-row items-start gap-3 pb-3">
                  <div className="flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center rounded-full bg-[#249AFF] text-[2.5vw] font-semibold text-white md:text-base">
                    3
                  </div>
                  <div className="flex flex-col">
                    <div className="w-full text-[3vw] text-black md:text-lg">
                      Connect on our socials
                    </div>
                    <div className="w-full text-[2.5vw] text-black opacity-50 md:text-sm">
                      Our main channel for discussion, opportunities, and announcements.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto my-auto flex justify-center [&_a]:px-26 [&_a]:py-4">
              <MemberSignupButton />
            </div>
          </div>
          {/* email */}
          <div className="w-full text-[2.2vw] text-[#99A1AF]">
            Any questions? Reach us at hello@uaic.com or find us on campus.
            <p>
              <br />— The UAIC team
            </p>
          </div>
          <div>
            <div className="h-40px w-full justify-center">
              <Link href="/">
                <div
                  className={`sticky z-50 mx-auto h-[40px] w-[121px] bg-[#145CA9] mask-[url('/assets/logos/uaic.webp')] mask-contain mask-no-repeat`}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MembershipEmail;
