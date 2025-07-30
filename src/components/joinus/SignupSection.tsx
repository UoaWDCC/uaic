'use client';
import Image from "next/image";

const SignupSection = () => {
  return (
    <div className="
    bg-[radial-gradient(70%_60%_at_50%_55%,rgba(20,92,169,0.2)_60%,rgba(255,255,255,0.2)_80%)]
    lg:bg-[radial-gradient(70%_60%_at_50%_55%,rgba(20,92,169,0.4)_0%,rgba(255,255,255,0.2)_80%)]
    
    pl-3 pr-3 py-10
    sm:pl-10 sm:pr-10 sm:py-0"
    >

      <h1 className="mt-6 md:pl-10 text-darkBlue font-bold px-4 text-[19px] md:text-[20px]">
        Sign Up to Join Competitions
      </h1>
      <hr className="border-t border-grey-200 w-[95%] mx-auto" />

      <div className="mt-6 md:pl-10 px-4 text-darkBlue leading-relaxed text-sm font-normal self-center">
        <p>
          Sign up to register competitions Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          <br />
          <br />
        </p>
      </div>

      <div className="flex justify-center py-5">
        <button onClick={() => alert("The hardest thing to learn in life is which bridge to cross and which to burn.")}>
          <Image
            src="/assets/joinus/membershipDisplayImage.webp"
            alt="UAIC Membership Display Image"
            width={300}
            height={400}
            className="transition ease-linear hover:brightness-75"
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
    </div>
  )
};

export default SignupSection;
