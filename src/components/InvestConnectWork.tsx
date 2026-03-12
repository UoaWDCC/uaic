import Button from "./Button";

const InvestConnectWork = () => {
  return (
    <div className="flex flex-col pt-[4em] md:pt-[9em]">
      <h1 className="from-darkBlue to-babyBlue mx-auto w-[10em] bg-gradient-to-r bg-clip-text text-center text-[35px] leading-12 font-black text-transparent md:text-[50px] md:leading-15">
        Invest, Connect and Work with us
      </h1>
      <div className="flex h-[250px] w-full justify-center bg-[linear-gradient(to_top,_var(--darkBlue)_0%,_#89ADD4_50%,_white_100%)] bg-top bg-no-repeat md:h-[400px] lg:pt-[40px]">
        <Button link="/joinus" defaultSize={true}>
          Join Us
        </Button>
      </div>
    </div>
  );
};

export default InvestConnectWork;
