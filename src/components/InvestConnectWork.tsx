import Button from "./MemberSignupButton";

const InvestConnectWork = () => {
  return (
    <div className="m-5 mx-auto mb-10 w-full">
      <div className="mx-auto flex max-w-5/6 flex-col items-center justify-center rounded-xl bg-white shadow-md md:p-11 lg:p-14">
        <h1 className="p-5 text-center text-[clamp(1rem,5.7vw,8rem)] leading-snug font-[700] text-[#145BA7]">
          Invest, Connect and Work with us.
        </h1>
        <div className="flex w-full justify-center pb-5">
          <Button link="/joinus" defaultSize={true}>
            Join Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvestConnectWork;
