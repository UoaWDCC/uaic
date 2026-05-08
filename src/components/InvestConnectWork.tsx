import Button from "./Button";

const InvestConnectWork = () => {
  return (
    <div className="m-5 mx-auto mb-10 w-full md:h-[200px] lg:h-[300px]">
      <div className="mx-auto flex max-w-5/6 flex-col items-center justify-center rounded-xl bg-white p-14 shadow-md">
        <h1 className="mx-auto w-[10em] shrink bg-clip-text text-center text-[1.5rem] leading-15 font-[700] text-[#145BA7] md:text-[3rem] md:leading-25 lg:text-[5rem]">
          Invest, Connect and Work with us.
        </h1>
        <div className="flex w-full justify-center pt-10">
          <Button link="/joinus" defaultSize={true}>
            Join Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvestConnectWork;
