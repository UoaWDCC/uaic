import Link from "next/link";
import Button from "./Button";

const InvestConnectWork = () => {
  return (
    <div
      className="
            flex flex-col pt-[4em]
            md:pt-[9em]
        "
    >
      <h1
        className="
                text-center text-[35px] font-black leading-12 w-[10em] mx-auto
                bg-gradient-to-r from-darkBlue to-babyBlue text-transparent bg-clip-text

                md:text-[50px] md:leading-15
            "
      >
        Invest, Connect and Work with us
      </h1>
      <div
        className="
                bg-[linear-gradient(to_top,_var(--darkBlue)_0%,_#89ADD4_50%,_white_100%)] w-full
                h-[250px] bg-no-repeat bg-top
                md:h-[400px]
                flex justify-center lg:pt-[40px]
            "
      >
        <Button link="/signup" defaultSize={true}>Join Us</Button>
      </div>
    </div>
  );
};

export default InvestConnectWork;
