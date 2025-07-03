import { MdEmail, MdOutlineMail } from "react-icons/md";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaPhoneAlt,
} from "react-icons/fa";
import { TiLocation } from "react-icons/ti";

const Footer = () => {
  return (
    <footer
      className="w-full flex flex-col items-center justify-center gap-8 pb-6 pt-4
    bg-darkBlue text-white
    lg:p-10 "
    >
      <div
        className="p-4 w-full grid grid-cols-1 items-start text-center gap-y-8 gap-x-16 px-16 pb-0
      lg:grid-cols-3 
      "
      >
        {/* Col 1 */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start text-left gap-4">
            <h1 className="hidden lg:block text-[2rem] lg:text-[1.4rem] xl:text-[2.5rem] 2xl:text-[4rem] font-bold whitespace-nowrap">
              Links
            </h1>

            <div className="hidden lg:flex lg:flex-col underline text-[2rem] lg:text-[1.4rem] xl:text-[1.4rem] 2xl:text-[2rem] font-light whitespace-nowrap">
              <h2>Home</h2>
              <h2>About</h2>
              <h2>Events</h2>
              <h2>Investments</h2>
              <h2>Articles</h2>
              <h2>Contact</h2>
            </div>
          </div>
        </div>

        {/* Col 2 */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start text-left gap-4">
            <h1 className="hidden lg:block text-[2rem] lg:text-[1.4rem] xl:text-[2.5rem] 2xl:text-[4rem] font-bold whitespace-nowrap">
              Contact Us
            </h1>

            <div className="hidden lg:flex lg:flex-col text-[2rem] lg:text-[1.4rem] xl:text-[1.4rem] 2xl:text-[2rem] font-light whitespace-nowrap gap-5">
              <div className="flex flex-row gap-8">
                <FaPhoneAlt className="text-3xl" />

                <h2>0800 838 383</h2>
              </div>
              <div className="flex flex-row gap-8">
                <MdEmail className="text-3xl" />
                <h2>president@uaic.co.nz</h2>
              </div>
              <div className="flex flex-row gap-8">
                <TiLocation className="text-3xl" />

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
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start text-left gap-4">
            <h1 className="hidden lg:block text-[2rem] lg:text-[1.4rem] xl:text-[2.5rem] 2xl:text-[4rem] font-bold whitespace-nowrap">
              Follow Us
            </h1>

            <div className="hidden lg:flex lg:flex-col text-[2rem] lg:text-[1.4rem] xl:text-[1.4rem] 2xl:text-[2rem] font-light whitespace-nowrap gap-5">
              <div className="flex flex-row gap-8">
                <FaInstagram className="text-3xl" />

                <h2>@officialuaic</h2>
              </div>
              <div className="flex flex-row gap-8">
                <FaFacebook className="text-3xl" />
                <h2>@officialUAIC</h2>
              </div>
              <div className="flex flex-row gap-8">
                <FaLinkedin className="text-3xl" />

                <div>
                  <h2>officialUAIC</h2>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-4 gap-12 justify-self-center order-2 
        lg:grid-cols-2 lg:gap-8  lg:order-1
        ">
          <a
            className="hover:scale-105 hover:text-white transition-all duration-250 order-2 
            lg:order-1"
            href="https://www.instagram.com/officialuaic/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="size-12" />
          </a>
          <a
            className="hover:scale-105 thover:scale-110 hover:text-white transition-all duration-250 order-3 
            lg:order-2"
            href="https://www.linkedin.com/company/officialuaic/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="size-11" />
          </a>

          
          <a
            className="hover:scale-105 hover:text-white transition-all duration-250 order-4 
            lg:order-3"
            href="mailto:president@uaic.co.nz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="President's Email"
          >
            <MdOutlineMail className="size-12" />
          </a>
          <a
            className="hover:scale-105 hover:text-white transition-all duration-250 order-1 
            lg:order-4"
            href="https://www.facebook.com/officialUAIC"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook className="size-11" />
          </a>
        </div> */}
      </div>

      <hr className="w-[100%] border-t border-gray-300 my-1" />

      <div className="flex justify-between w-full pl-12 pr-12">
        <h1 className="lg:text-[1.4rem] ">
          © Copyright 2025 University of Auckland Investment Club
        </h1>
        <div className="max-w-[8rem]  justify-self-center">
          <img src="/assets/uaic-white.png" alt="" />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
