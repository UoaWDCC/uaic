import { MdEmail } from "react-icons/md";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaPhoneAlt,
} from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="w-full flex flex-col items-center justify-center gap-4 pt-4
    bg-darkBlue text-white
    px-4 sm:px-6 md:px-10 lg:p-10 lg:pb-5"
    >
      <div
        className="w-full grid grid-cols-2 items-start text-center gap-y-6 gap-x-8 sm:gap-x-12 md:gap-x-16
        px-4 sm:px-8 md:px-12 lg:grid-cols-3 pb-4"
      >
        {/* Col 1 */}
        <div className="flex flex-col items-center order-1 lg:order-0">
          <div className="flex flex-col items-start text-left gap-1.5 lg:gap-4">
            <h1 className="
              flex lg:block text-[1.25rem] font-bold whitespace-nowrap
              lg:text-[30px]
            ">
              Links
            </h1>

            {/* TODO add routes to other pages from footer */}
            <div className="
              flex lg:flex flex-col underline text-[1rem] font-light whitespace-nowrap gap-[2px]
              lg:text-[16px]
            ">
              
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/events">Events</Link>
              <Link href="/investmentportfolio">Investments</Link>
              <Link href="/bulletin">Articles</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>

        {/* Col 2 */}
        <div className="flex flex-col items-center order-0 lg:order-1">
          <div className="flex flex-col items-start text-left gap-2.5 lg:gap-4">
            <h1 className="
              flex lg:block text-[1.25rem] font-bold whitespace-nowrap
              lg:text-[30px]
            ">
              Contact Us
            </h1>

            <div className="flex lg:flex flex-col text-[0.95rem] lg:text-[1.4rem] xl:text-[1.4rem] 2xl:text-[2rem] font-light whitespace-nowrap gap-1.5 lg:gap-5">
              <div className="flex flex-row gap-2 lg:gap-8 lg:text-[16px]">
                <FaPhoneAlt className="text-[1.25rem] lg:text-[1.3rem]" />
                <h2>0800 838 383</h2>
              </div>
              <div className="flex flex-row gap-2 lg:gap-8 lg:text-[16px]">
                <a
                  className="hover:scale-105 hover:text-white transition-all duration-250"
                  href="mailto:president@uaic.co.nz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="President's Email"
                >
                  <MdEmail className="text-[1.25rem] lg:text-[1.3rem]" />
                </a>
                <h2>president@uaic.co.nz</h2>
              </div>
              <div className="flex flex-row gap-2 lg:gap-8 lg:text-[16px]">
                <TiLocation className="text-[1.25rem] lg:text-[1.3rem]" />
                <div>
                  <h2>34 Princess Street</h2>
                  <h2>Auckland Central,</h2>
                  <h2>Auckland 1010</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Col 3 */}
        
<div className="flex flex-col items-center order-2">
  <div className="flex flex-col items-start text-left gap-2.5 lg:gap-4">
    <h1 className="
      flex lg:block text-[1.25rem] font-bold whitespace-nowrap
      lg:text-[30px]
    ">
      Follow Us
    </h1>

    <div className="flex lg:flex flex-col text-[0.95rem] lg:text-[1.4rem] xl:text-[1.4rem] 2xl:text-[2rem] font-light whitespace-nowrap gap-1.5 lg:gap-5">
      <div className="flex flex-row gap-2 lg:gap-8">
        <a
          className="hover:scale-105 hover:text-white transition-all duration-250"
          href="https://www.instagram.com/officialuaic/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram className="text-3xl lg:text-[1.3rem]" />
        </a>
        <div className="lg:text-[16px]">
          <h2>@officialuaic</h2>
        </div>
      </div>
      <div className="flex flex-row gap-2 lg:gap-8">
        <a
          className="hover:scale-105 hover:text-white transition-all duration-250"
          href="https://www.facebook.com/officialUAIC"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebook className="text-3xl lg:text-[1.3rem]" />
        </a>
        <div className="flex flex-row lg:text-[16px]">
          <h2>@officialUAIC</h2>
          <h2 className="invisible">IIIIIII</h2>
        </div>
      </div>
      <div className="flex flex-row gap-2 lg:gap-8">
        <a
          className="hover:scale-105 hover:text-white transition-all duration-250"
          href="https://www.linkedin.com/company/officialuaic/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="text-3xl lg:text-[1.3rem]" />
        </a>
        <div>
          <h2 className="lg:text-[16px]">officialUAIC</h2>
        </div>
      </div>
    </div>
  </div>
</div>


        {/* Mobile Logo */}
        <div className="flex-col items-center lg:hidden flex order-3 h-full w-full">
          <div className="max-w-[16rem] justify-center items-center flex h-full w-full">
            <img src="/assets/uaic-white.png" alt="" />
          </div>
        </div>
      </div>

      <hr className="lg:w-[100%] w-[90%] border-t border-gray-300 my-0" />

      <div className="flex justify-center lg:justify-between w-full px-4 sm:px-8 md:px-12 pt-0">
        <h1 className="sm:text-[0.85rem] text-[0.75rem] lg:text-[16px] items-center flex text-center">
          © Copyright 2025 University of Auckland Investment Club
        </h1>
        <div className="max-w-[8rem] justify-self-center hidden lg:flex">
          <img src="/assets/uaic-white.png" alt="" />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
