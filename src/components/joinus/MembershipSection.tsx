'use client';
import Image from "next/image";
import PerksGrid from "./PerksGrid";

const MembershipSection = () => {
  return (
    <div
      className="
        bg-[radial-gradient(70%_60%_at_50%_50%,rgba(20,92,169,0.2)_60%,rgba(255,255,255,0.2)_80%)]
        sm:bg-[radial-gradient(70%_60%_at_50%_55%,rgba(20,92,169,0.4)_0%,rgba(255,255,255,0.2)_80%)]
        pl-3 pr-3 sm:pl-10 sm:pr-10
      "
    >
      {/* Membership Title */}
      <h1
        className="
          mt-10 md:pl-10 px-4
          text-header
          font-bold text-darkBlue
        "
      >
        Membership
      </h1>
      <hr className="mx-auto w-[95%] border-t border-grey-200" />

      {/* Membership Description */}
      <div
        className="
          mt-6 md:pl-10 px-4 self-center
          text-body font-normal leading-relaxed text-darkBlue
        "
      >
        <p>
          Memberships for 2025 will be active from the sign-up date to the end of the year. To become a member of UAIC for 2025, click the image below and fill in the form!
        </p>

        {/* uaic 2025 Membership Image Button */}
        <div className="flex justify-center">
          <button
            onClick={() =>
              alert("The hardest thing to learn in life is which bridge to cross and which to burn.")
            }
          >
            <Image
              src="/assets/joinus/uaic2025Membership.webp"
              alt="UAIC Membership 2025 Sign Up Image"
              width={200}
              height={300}
              className="transition ease-linear hover:brightness-75 pt-10 pb-5"
            />
          </button>
        </div>

        <PerksGrid />
      </div>
    </div>
  );
};

export default MembershipSection;
