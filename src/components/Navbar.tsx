import React from "react";
import Image from "next/image";
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="
        flex justify-evenly h-[123px] border-b-[1px] border-[#EDECEA]
        lg:block lg:justify-normal lg:bg-[#F0F8FF] lg:h-[118px]
        lg:p-[20px] lg:gap-[20px]
        ">
            
        <Link href="/targetpage">
        <Image
        src="/assets/quill-hamburger.png"
        alt="quill-hamburger"
        width={35}
        height={35}
        className="
        mt-[70px] ml-[26px]   
        lg:hidden w-[35px] h-[35px] 
        block object-contain"/>
        </Link>

        <Link href="/homepage">
        <Image
        src="/assets/uaic.png"
        alt="uaic-logo"
        width={229.84}
        height={76}
        className="
        mt-[58px] ml-[170px] w-[139px] h-[60px] 
        lg:mt-[0px] lg:ml-[0px] lg:w-[229.84px] lg:h-[76px] lg:bg-[#F0F8FF] 
        block object-contain"/>
        </Link>
        
        <div>
            <nav>
                <a>Home</a>
                <a>About</a>
                <a>Events</a>
                <a>Investment Portfolio</a>
                <a>Bulletin</a>
                <a>Contact</a>
            </nav>
        </div>
        
        </div>

        );
    };
    
export default Navbar;