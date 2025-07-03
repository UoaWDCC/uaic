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
      className="w-full flex flex-col items-center justify-center gap-4 pb-6 pt-4
    bg-darkBlue text-white
    lg:p-10 "
    >
      <div
        className="p-4 w-full grid grid-cols-2 items-start text-center gap-y-8 gap-x-16 px-16 
      lg:grid-cols-3 pb-4
      "
      >
        {/* Col 1 */}
        <div className="flex flex-col items-center order-1 lg:order-0">
          <div className="flex flex-col items-start text-left gap-4">
            <h1 className="flex lg:block text-[2rem] lg:text-[1.4rem] xl:text-[2.5rem] 2xl:text-[4rem] font-bold whitespace-nowrap">
              Links
            </h1>

            <div className="flex lg:flex flex-col underline text-[1.4rem] lg:text-[1.4rem] xl:text-[1.4rem] 2xl:text-[2rem] font-light whitespace-nowrap">
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
        <div className="flex flex-col items-center order-0 lg:order-1">
          <div className="flex flex-col items-start text-left gap-4">
            <h1 className="flex lg:block text-[2rem] lg:text-[1.4rem] xl:text-[2.5rem] 2xl:text-[4rem] font-bold whitespace-nowrap">
              Contact Us
            </h1>

            <div className="flex lg:flex flex-col text-[1.4rem] lg:text-[1.4rem] xl:text-[1.4rem] 2xl:text-[2rem] font-light whitespace-nowrap gap-5">
              <div className="flex flex-row gap-8">
                <FaPhoneAlt className="text-3xl" />

                <h2>0800 838 383</h2>
              </div>
              <div className="flex flex-row gap-8">
                <a
                  className="hover:scale-105 hover:text-white transition-all duration-250"
                  href="mailto:president@uaic.co.nz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="President's Email"
                >
                  <MdEmail className="text-3xl" />
                </a>

                <h2>president@uaic.co.nz</h2>
              </div>
              <div className="flex flex-row gap-8 ">
                <TiLocation className="lg:text-3xl" />

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
        <div className="flex flex-col items-center order-2 ">
          <div className="flex flex-col items-start text-left gap-4">
            <h1 className="flex lg:block text-[2rem] lg:text-[1.4rem] xl:text-[2.5rem] 2xl:text-[4rem] font-bold whitespace-nowrap">
              Follow Us
            </h1>

            <div className="flex lg:flex flex-col text-[1.4rem] lg:text-[1.4rem] xl:text-[1.4rem] 2xl:text-[2rem] font-light whitespace-nowrap gap-5">
              <div className="flex flex-row gap-8">
                <a
                  className="hover:scale-105 hover:text-white transition-all duration-250 "
                  href="https://www.instagram.com/officialuaic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-4xl" />
                </a>

                <h2>@officialuaic</h2>
              </div>
              <div className="flex flex-row gap-8">
                <a
                  className="hover:scale-105 hover:text-white transition-all duration-250 "
                  href="https://www.facebook.com/officialUAIC"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebook className="text-4xl" />
                </a>

                <h2>@officialUAIC</h2>
              </div>
              <div className="flex flex-row gap-8">
                <a
                  className="hover:scale-105 thover:scale-110 hover:text-white transition-all duration-250 "
                  href="https://www.linkedin.com/company/officialuaic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-4xl" />
                </a>

                <div>
                  <h2>officialUAIC</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex-col items-center lg:hidden flex order-3 h-full w-full">
          <div className="max-w-[20rem]  justify-center items-center flex h-full w-full">
            <img src="/assets/uaic-white.png" alt="" />
          </div>
        </div>
      </div>

      <hr className="lg:w-[100%] w-[90%] border-t border-gray-300 my-0" />

      <div className="flex justify-between w-full pl-12 pr-12 pt-0">
        <h1 className="lg:text-[1.4rem] ">
          © Copyright 2025 University of Auckland Investment Club
        </h1>
        <div className="max-w-[8rem]  justify-self-center hidden lg:flex">
          <img src="/assets/uaic-white.png" alt="" />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
