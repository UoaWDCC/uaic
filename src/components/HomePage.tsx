import React from "react";
import Image from "next/image";
import Link from 'next/link';

const HomePage = () => {
    return (

        <>
            <header className="
            items-center flex justify-center bg-[#F0F8FF] 
            h-[50px]
            lg:h-[50px] ">  
                <h2 className="text-[18px] leading-[22px]">Live market update of current stocks</h2>
            </header>

            <div
                className="
                bg-no-repeat bg-cover bg-center 
                h-[488px] mt-[24px] bg-custom
                lg:h-[695px] lg:mt-[27px] lg:mb-[27px] lg:pt-[102px] lg:pl-[56px]"
                style={{
                    backgroundImage: "url('/assets/homepage.png')"
                }}>
                <div
                    className="
                    bg-[#D9D9D9] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] border-[#CBC6C6]
                    h-[442px] pt-[29px] pb-[29px] px-[27px] 
                    lg:w-[417px] lg:h-[476px] lg:rounded-[10px] lg:border-[1px] 
                    "
                    style={{ backgroundColor: 'rgba(217, 217, 217, 0.925)' }}>

                    <h1 className="text-[19px] leading-[22px] h-[70px]">
                        UNIVERSITY OF AUCKLAND INVESTMENT CLUB
                    </h1>
                    <h3 className="text-[19px] leading-[22px] h-[50px]">
                        Investing is for Everyone
                    </h3>
                    <p className="text-[16px] leading-[24px] h-[181px] ">
                        The University of Auckland Investment Club was founded in 2009 and is a student-run incorporated society.
                        <br />
                        <br />
                        We welcome members from all academic backgrounds and stages at the University of Auckland.
                    </p>

                    <div className="pt-[10px] flex justify-evenly">
                        <button className="text-[20px] leading-[22px] w-[110px] h-[56px] 
                        bg-[#FAFAFA] border-[1px] border-[#CBC6C6] rounded-[50px]
                        shadow-[0_4px_4px_0_#00000040]">
                            <Link href="/signup">
                                Sign Up
                            </Link>
                        </button>
                        <button className="text-[20px] leading-[22px] w-[110px] h-[56px] 
                        bg-[#FAFAFA] border-[1px] border-[#CBC6C6] rounded-[50px]
                        shadow-[0_4px_4px_0_#00000040]">
                            {/* <span className="scale-[1.1] origin-center block"> */}
                            <Link href="/login">
                                Login
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default HomePage;