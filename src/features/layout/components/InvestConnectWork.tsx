"use client";
import ArrowButton from "@/components/ArrowButton";
import { useSession } from "@/lib/auth-client";

const InvestConnectWork = () => {
  const { data: session } = useSession();

  return (
    <div className="my-10 w-full max-w-[1250px] px-4 md:mx-auto md:px-0 lg:my-20">
      <div className="mx-auto flex flex-col items-center justify-center rounded-xl bg-white p-5 shadow-md md:p-11 lg:p-14">
        <h1 className="text-primary p-5 text-center text-[clamp(1rem,5.7vw,8rem)] leading-snug font-[700]">
          Invest, Connect And Work With Us.
        </h1>
        <div className="flex w-full justify-center pb-5">
          {session ? (
            <ArrowButton text="Go To Dashboard" link="/dashboard" />
          ) : (
            <ArrowButton text="Become A Member" link="/login" />
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestConnectWork;
