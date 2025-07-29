'use client';
import Image from "next/image";

const SignupSection = () => (
  <section>
    <h1 className="mt-6 md:pl-10 text-darkBlue font-bold px-4 text-[19px] md:text-[20px]">
      Sign Up to Join Competitions
    </h1>
    <hr className="border-t border-grey-200 w-[95%] mx-auto" />

    <div className="mt-6 md:pl-10 px-4 text-darkBlue leading-relaxed text-[13px] font-normal self-center">
      <p>
        Sign up to register competitions Lorem ipsum dolor sit amet...
        <br />
        <br />
      </p>
    </div>

    <div className="flex justify-center py-10">
      <button onClick={() => alert("The hardest thing to learn in life is which bridge to cross and which to burn.")}>
        <Image
          src="/assets/joinus/membershipDisplayImage.webp"
          alt="UAIC Membership Display Image"
          width={300}
          height={400}
          className="transition ease-linear hover:brightness-65"
        />
      </button>
    </div>

    <div className="flex justify-center gap-4">
      {["Sign Up", "Login"].map((label) => (
        <a
          key={label}
          href="/signup"
          className="w-32 h-10 flex items-center justify-center border border-darkBlue bg-darkBlue text-white rounded-4xl text-sm font-light text-center hover:bg-white hover:text-darkBlue"
        >
          {label}
        </a>
      ))}
    </div>
  </section>
);

export default SignupSection;
