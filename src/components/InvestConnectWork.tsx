import MemberSignupButton from "./MemberSignupButton";

const InvestConnectWork = () => {
  return (
    <div className="my-10 w-full max-w-[1250px] px-4 md:mx-auto md:px-0 lg:my-20">
      <div className="mx-auto flex flex-col items-center justify-center rounded-xl bg-white p-5 shadow-md md:p-11 lg:p-14">
        <h1 className="p-5 text-center text-[clamp(1rem,5.7vw,8rem)] leading-snug font-[700] text-[#145BA7]">
          Invest, Connect And Work With Us.
        </h1>
        <div className="flex w-full justify-center pb-5">
          <MemberSignupButton link="/joinus" defaultSize={true}>
            Join Us
          </MemberSignupButton>
        </div>
      </div>
    </div>
  );
};

export default InvestConnectWork;
