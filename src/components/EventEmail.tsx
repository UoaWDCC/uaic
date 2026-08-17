"use client";
import Link from "next/link";
import MemberSignupButton from "./MemberSignupButton";

const EventEmail = () => {
  return (
    <div className="w-full">
      {/* Container */}
      <div className="sm:py-28px flex justify-center px-6">
        <div className="flex min-h-[600px] w-full max-w-[472px] flex-col gap-[30px] rounded-[8px] bg-white px-[28px] py-[30px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
          <div className="w-full flex-col gap-[8px]">
            <div className="w-full text-[5vw] font-semibold text-[#00529B] lg:text-[2.2vw]">
              You're all set!
            </div>
            <div className="w-full text-[4vw] text-[rgba(0,0,0,0.20)] lg:text-[1.7vw]">
              Your attendance has been confirmed.
            </div>
          </div>
          {/* intro */}
          <div className="w-full text-[3vw] text-black lg:text-[1.5vw]">
            Hi [First Name],
            <p>
              <br />
              You've successfully signed up for one of our upcoming events and your name has been
              added to our list of attendees. We can’t wait to see you there.
            </p>
          </div>
          {/* Membership Details */}
          <div className="w-full flex-col gap-[24px]">
            <div className="lg:text-[1.5vw font-600 gap-[24px] text-[3.5vw] text-[#249AFF]">
              EVENT DETAILS
              <div className="w-full flex-row">
                <div className="flex w-full justify-between pt-5">
                  <div className="left-0 text-[3vw] text-[#A1A1A1] lg:text-[1.vw]">Event Name</div>
                  <div className="left-0 text-[3vw] text-[#005EAF] lg:text-[1.vw]">
                    [Event Name]
                  </div>
                </div>
                <div className="h-[24px] w-full border-b-[0.8px] border-[#A1A1A1] bg-white"></div>
                <div className="flex w-full justify-between pt-4">
                  <div className="left-0 text-[3vw] text-[#A1A1A1] lg:text-[1.vw]">Date</div>
                  <div className="left-0 text-right text-[3vw] text-[#005EAF] lg:text-[1.vw]">
                    [Date]
                    <p>[Start Time - End Time]</p>
                  </div>
                </div>
                <div className="h-[24px] w-full border-b-[0.8px] border-[#A1A1A1] bg-white"></div>
              </div>
              <div className="flex w-full justify-between pt-4">
                <div className="left-0 text-[3vw] text-[#A1A1A1] lg:text-[1.vw]">Location</div>
                <div className="left-0 text-[3vw] text-[#005EAF] lg:text-[1.vw]">[Address]</div>
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
                    <div className="w-full text-[3vw] text-black md:text-lg">Save the date</div>
                    <div className="w-full text-[2.5vw] text-black opacity-50 md:text-sm">
                      Mark your calendars, organise your schedules and find the location, if needed.
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
                      Can’t make it anymore?
                    </div>
                    <div className="w-full text-[2.5vw] text-black opacity-50 md:text-sm">
                      We totally understand — just make sure to cancel your spot by emailing us, so
                      we can offer your spot to someone else.
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
                      Keep an eye on your inbox
                    </div>
                    <div className="w-full text-[2.5vw] text-black opacity-50 md:text-sm">
                      We may email you additional details closer to the event.
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
export default EventEmail;
