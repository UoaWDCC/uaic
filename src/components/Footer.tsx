import { MdOutlineMail } from "react-icons/md";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center justify-center gap-8 pb-6 pt-4
    bg-[#145CA9] text-white
    lg:p-10 ">
      <div className="p-4 w-full grid grid-cols-1 items-center text-center gap-y-8 gap-x-12 px-16 pb-0
      lg:grid-cols-4
      ">
        <div className="max-w-[20rem]  justify-self-center">
          <img src="/assets/uaic-white.png" alt="" />
        </div>

        <h1 className="hidden text-[2rem]justify-self-center whitespace-nowrap
        lg:block lg:text-[1.4rem]  xl:text-[1.8rem] 2xl:text-[2rem] 
        ">
          Investing is for Everyone
        </h1>

        <h1 className="text-lg justify-self-center order-1 
         lg:text-[1.4rem] xl:text-[1.8rem] 2xl:text-[2rem] lg:order-2
        ">
          Email Address
        </h1>

        <div className="grid grid-cols-4 gap-12 justify-self-center order-2 
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

          {/* Not sure if this mail link works, this is what their current website links to */}
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
        </div>
      </div>

      <h1 className="lg:text-[1.6rem] ">Copyright 2025 or something</h1>
    </footer>
  );
};
export default Footer;
