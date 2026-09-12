import { MdEmail } from "react-icons/md";
import { FaInstagram, FaLinkedin, FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import Link from "next/link";
import InvestConnectWork from "./InvestConnectWork";

const Footer = () => {
  return (
    <div>
      {/* CTA Container */}
      <footer className="bg-footer-gradient flex w-full flex-col items-center gap-4 px-4 pt-0 pb-16 text-white sm:px-6 md:px-10 lg:p-10 lg:pb-5">
        <InvestConnectWork />
        <div className="grid w-full grid-cols-1 items-start gap-x-4 gap-y-8 px-4 pb-8 text-left sm:px-8 md:gap-x-6 md:px-12 lg:grid-cols-[2fr_1.2fr_1fr_1fr] lg:gap-x-16">
          {/* Footer slogan */}
          <div className="w-full text-left lg:col-span-1 lg:min-w-[300px]">
            <h1 className="text-center text-[2.1rem] leading-tight font-bold whitespace-nowrap text-white lg:max-w-[350px] lg:text-left lg:text-[3.5rem] lg:whitespace-normal">
              Investing is for anyone.
            </h1>
          </div>
          {/* Col 1 */}
          <div className="order-1 flex flex-col items-start lg:order-2">
            <div className="flex w-full flex-row items-start gap-4 text-left lg:flex-col lg:gap-3">
              <h1 className="flex w-40 shrink-0 text-[1.25rem] font-bold whitespace-nowrap lg:block lg:text-[16px]">
                PAGES
              </h1>

              {/* TODO add routes to other pages from footer */}
              <div className="flex flex-col gap-[2px] text-[1rem] font-light whitespace-nowrap lg:flex lg:text-[16px]">
                <Link href="/" className="hover:cursor-pointer hover:underline">
                  Home
                </Link>
                <Link href="/about" className="hover:cursor-pointer hover:underline">
                  About
                </Link>
                <Link href="/events" className="hover:cursor-pointer hover:underline">
                  Events
                </Link>
                <Link href="/bulletin" className="hover:cursor-pointer hover:underline">
                  Bulletin
                </Link>
                <Link href="/investmentportfolio" className="hover:cursor-pointer hover:underline">
                  Investments
                </Link>
              </div>
            </div>
          </div>

          {/* Col 2 */}
          <div className="order-3 flex flex-col items-start lg:order-1">
            <div className="flex w-full flex-row items-start gap-4 text-left lg:flex-col lg:gap-3">
              <h1 className="flex w-40 shrink-0 text-[1.25rem] font-bold whitespace-nowrap lg:block lg:text-[16px]">
                CONTACT
              </h1>

              <div className="flex flex-col gap-1.5 text-[0.95rem] font-light whitespace-nowrap lg:flex lg:gap-5 lg:text-[1.4rem] xl:text-[1.4rem] 2xl:text-[2rem]">
                <div className="flex flex-row gap-2 lg:gap-3 lg:text-[16px]">
                  <FaPhoneAlt className="text-[1rem] lg:text-[1.3rem]" />
                  <h2>0800 838 383</h2>
                </div>
                <div className="flex flex-row gap-2 lg:gap-3 lg:text-[16px]">
                  <Link
                    className="transition-all duration-250 hover:scale-105 hover:cursor-pointer hover:text-white"
                    href="mailto:president@uaic.co.nz"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="President's Email"
                  >
                    <MdEmail className="text-[1rem] lg:text-[1.3rem]" />
                  </Link>
                  <h2>president@uaic.co.nz</h2>
                </div>
                <div className="flex flex-row gap-2 lg:gap-3 lg:text-[16px]">
                  <TiLocation className="text-[1rem] lg:text-[1.3rem]" />
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

          <div className="order-2 flex flex-col items-start lg:order-3">
            <div className="flex w-full flex-row items-start gap-4 text-left lg:flex-col lg:gap-3">
              <h1 className="flex w-40 shrink-0 text-[1.25rem] font-bold whitespace-nowrap lg:block lg:text-[16px]">
                SOCIALS
              </h1>

              <div className="flex flex-col gap-1.5 text-[0.95rem] font-light whitespace-nowrap lg:flex lg:gap-5 lg:text-[1.4rem] xl:text-[1.4rem] 2xl:text-[2rem]">
                <div className="flex flex-row gap-2 lg:gap-3">
                  <Link
                    className="transition-all duration-250 hover:scale-105 hover:cursor-pointer hover:text-white"
                    href="https://www.instagram.com/officialuaic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-xl lg:text-[1.3rem]" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/officialuaic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg:text-[16px]"
                  >
                    @officialuaic
                  </Link>
                </div>
                <div className="flex flex-row gap-2 lg:gap-3">
                  <Link
                    className="transition-all duration-250 hover:scale-105 hover:cursor-pointer hover:text-white"
                    href="https://www.facebook.com/officialUAIC"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="text-xl lg:text-[1.3rem]" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/officialUAIC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg:text-[16px]"
                  >
                    @officialUAIC
                  </Link>
                </div>
                <div className="flex flex-row gap-2 lg:gap-3">
                  <Link
                    className="transition-all duration-250 hover:scale-105 hover:cursor-pointer hover:text-white"
                    href="https://www.linkedin.com/company/officialuaic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-xl lg:text-[1.3rem]" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/officialuaic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg:text-[16px]"
                  >
                    officialUAIC
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center gap-4 px-4 pt-0 opacity-65 sm:px-8 md:px-12">
          <h1 className="w-full text-center text-[0.75rem] whitespace-nowrap sm:text-[0.85rem] lg:w-auto lg:text-center lg:text-[16px]">
            © 2026 University of Auckland Investment Club
          </h1>
          <hr className="hidden w-full border-t border-gray-300 lg:block" />
        </div>
      </footer>
    </div>
  );
};
export default Footer;
