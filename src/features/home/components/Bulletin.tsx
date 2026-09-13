import Image from "next/image";
import React from "react";
import { GoBook } from "react-icons/go";
import { LuExternalLink } from "react-icons/lu";

const Bulletin = () => {
  return (
    <div className="relative mx-auto hidden aspect-4/3 max-w-5xl grid-cols-5 grid-rows-4 gap-6 bg-white p-6 lg:visible lg:grid">
      <div className="bg-lightBlue relative col-span-2 row-span-3 flex justify-center rounded-2xl p-8 hover:cursor-pointer">
        <Image
          src="/assets/bulletins/bulletin_cover.webp"
          alt="Cover Image"
          className="w-full rounded-xl"
          width={260}
          height={366}
        />
      </div>

      <span className="bg-lightBlue absolute -right-[1rem] z-2 col-start-1 col-end-3 row-start-1 row-end-2 h-[1rem] w-[2rem]" />
      <span className="bg-lightBlue absolute -right-[1rem] bottom-0 z-2 col-start-1 col-end-3 row-start-2 row-end-3 h-[1rem] w-[1rem]" />
      <span className="absolute -right-[1rem] -bottom-[1rem] z-2 col-start-1 col-end-3 row-start-2 row-end-3 h-[1rem] w-[1rem] [background-image:radial-gradient(circle_at_100%_100%,transparent_1rem,#EBF7FE_1rem)]" />

      {/* Most recent (MAIN) */}
      <div className="text-darkBlue bg-lightBlue relative col-span-3 row-span-2 -ml-6 flex flex-col justify-between rounded-2xl p-6 hover:cursor-pointer">
        <div className="mt-2 ml-4 flex h-full flex-col justify-start font-semibold">
          <h2 className="text-xl">Issue #79</h2>
          <p className="mt-2 text-[28px] leading-[1.2]">
            Isn't There Something Wrong with a World Where Everything is For Sale?
          </p>
          <p className="text-m mt-4 max-w-[85%] font-normal">
            A collection of thought-provoking articles and opinion pieces exploring the ethics of
            commodification, the sale of IC's Spark, the value of fine art as an investment, and
            Rivian's dramatic industry shift. Includes a partner column from Forsyth Barr on
            tackling New Zealand's water quality challenges.
          </p>
        </div>

        <GoBook className="absolute right-6 bottom-6 w-10" size={25} />
      </div>

      {/* MINI 1 */}
      <div className="bg-darkBlue/50 relative col-span-3 row-span-1 flex cursor-pointer flex-col justify-between rounded-2xl bg-[url('/assets/bulletins/article1.webp')] bg-cover bg-center p-6 text-white bg-blend-multiply transition hover:cursor-pointer hover:brightness-90">
        <div className="ml-4 flex h-full max-w-[85%] flex-col justify-center font-semibold">
          <p className="text-xl">Issue #78</p>
          <p className="mt-2 text-3xl">Measuring Up? New Zealand's Standardised Testing Debate</p>
        </div>

        <GoBook className="absolute right-6 bottom-6 w-10 text-white" size={25} />
      </div>

      {/* MINI 2 */}
      <div className="bg-darkBlue/50 relative col-span-3 row-span-1 flex cursor-pointer flex-col justify-between rounded-2xl bg-[url('/assets/bulletins/article2.webp')] bg-cover bg-center p-6 text-white bg-blend-multiply transition hover:cursor-pointer hover:brightness-90">
        <div className="ml-4 flex h-full max-w-[85%] flex-col justify-center font-semibold">
          <p className="text-xl">Issue #77</p>
          <p className="mt-2 text-3xl">A House of Cards: The History of Fletcher Building</p>
        </div>

        <GoBook className="absolute right-6 bottom-6 w-10 text-white" size={25} />
      </div>

      {/* Want to see more */}
      <div className="justify-left bg-darkBlue relative col-span-2 row-span-1 flex cursor-pointer items-center rounded-2xl p-6 font-semibold text-white transition hover:cursor-pointer hover:brightness-90">
        <div className="ml-4">
          <p className="text-3xl leading-[0.9]">
            Want to <br /> see more?
          </p>
          <p className="mt-3 text-xl underline">Click to View All</p>
        </div>
        <LuExternalLink className="absolute right-6 bottom-6 w-10" size={25} />
      </div>
    </div>
  );
};

export default Bulletin;
