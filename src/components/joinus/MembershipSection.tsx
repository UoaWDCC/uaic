'use client';
import Image from "next/image";
import PerksGrid from "./PerksGrid";

const MembershipSection = () => (
  <section>
    <h1 className="mt-10 md:pl-10 text-darkBlue font-bold px-4 text-[19px] md:text-[20px]">
      Membership
    </h1>
    <hr className="border-t border-grey-200 w-[95%] mx-auto" />

    <div className="mt-6 md:pl-10 px-4 text-darkBlue leading-relaxed text-[13px] font-normal self-center">
      <p>
        Memberships for 2025 will be active from the sign-up date to the end of the year.
        <br />
        <br />
      </p>

      <div className="flex justify-center">
        <button onClick={() => alert("The hardest thing to learn in life is which bridge to cross and which to burn.")}>
          <Image
            src="/assets/joinus/uaic2025Membership.webp"
            alt="UAIC Membership 2025 Sign Up Image"
            width={200}
            height={300}
            className="transition ease-linear hover:brightness-75"
          />
        </button>
      </div>

      <div className="flex justify-center font-bold mt-6">
        <p>NZ$21.58</p>
      </div>

      <p className="pt-8 text-[13px] font-normal">
        Fill in this form to be a member of UAIC for 2025! 
        <br />
        <br />
      </p> 

      <PerksGrid />
    </div>
  </section>
);

export default MembershipSection;
