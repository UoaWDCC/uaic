import Link from "next/link";

const InvestConnectWork = () => {
    return ( 
        <div className="
            flex flex-col pb-[12em] pt-[4em]
            border-solid border-2 border-red-500
            bg-[linear-gradient(to_top,_var(--darkBlue)_0%,_#89ADD4_50%,_white_85%)] h-96 w-full
            md:h-[450px]
        ">
            <h1 className="
                text-center text-[35px] font-black leading-12 w-[10em] mx-auto
                bg-gradient-to-r from-darkBlue to-[#5FB4FF] text-transparent bg-clip-text

                md:text-[50px] md:leading-15
            ">Invest, Connect and Work with us</h1>
            <Link href="/joinus">
                <button className="
                mx-auto flex justify-center mt-[1em] font-semibold
                bg-[#f1f8ff] text-darkBlue px-[1.8em] py-[0.3em] rounded-[1em] hover:cursor-pointer

                md:text-[1.2em] md:mt-[2em] md:px-[2.5em] md:py-[0.8em] md:rounded-[2em]
                ">Join Us</button>
            </Link>
        </div>
     );
}
 
export default InvestConnectWork;