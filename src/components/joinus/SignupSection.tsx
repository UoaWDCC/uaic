"use client";
import Image from "next/image";
import Button from "../Button";

const SignupSection = () => {
  return (
    <div className="bg-[radial-gradient(70%_60%_at_50%_55%,rgba(20,92,169,0.2)_60%,rgba(255,255,255,0.2)_80%)] py-10 pr-3 pl-3 sm:py-0 sm:pr-10 sm:pl-10 lg:bg-[radial-gradient(70%_60%_at_50%_55%,rgba(20,92,169,0.4)_0%,rgba(255,255,255,0.2)_80%)]">
      <h1 className="text-darkBlue text-header mt-6 px-4 font-bold md:pl-10">
        Sign Up to Join Competitions
      </h1>
      <hr className="border-grey-200 mx-auto w-[95%] border-t" />

      <div className="text-darkBlue text-body mt-6 self-center px-4 leading-relaxed font-normal md:pl-10">
        <p>
          Sign up to register competitions Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>

      <div className="flex justify-center py-5">
        <button
          onClick={() =>
            alert("The hardest thing to learn in life is which bridge to cross and which to burn.")
          }
        >
          <Image
            src="/assets/joinus/membershipDisplayImage.webp"
            alt="UAIC Membership Display Image"
            width={300}
            height={400}
            className="pt-5 transition ease-linear hover:brightness-75"
          />
        </button>
      </div>

      <div className="flex justify-center gap-2">
        <Button link="/payment" defaultSize>
          Membership Payment
        </Button>
      </div>
    </div>
  );
};

export default SignupSection;
