import { MdEmail } from "react-icons/md";
import { FaInstagram, FaLinkedin, FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-darkBlue flex w-full flex-col items-center justify-center gap-4 px-4 pt-4 pb-4 text-white sm:px-6 md:px-10 lg:p-10 lg:pb-5">
      <div className="grid w-full grid-cols-2 items-start gap-x-8 gap-y-6 px-4 pb-4 text-center sm:gap-x-12 sm:px-8 md:gap-x-16 md:px-12 lg:grid-cols-3">
        {/* Col 1 */}
        <div className="order-1 flex flex-col items-center lg:order-0">
          <div className="flex flex-col items-start gap-1.5 text-left lg:gap-4">
            <h1 className="flex text-[1.25rem] font-bold whitespace-nowrap lg:block lg:text-[30px]">
              Links
            </h1>

            {/* TODO add routes to other pages from footer */}
            <div className="flex flex-col gap-[2px] text-[1rem] font-light whitespace-nowrap underline lg:flex lg:text-[16px]">
              <Link href="/" className="hover:cursor-pointer">
                Home
              </Link>
              <Link href="/about" className="hover:cursor-pointer">
                About
              </Link>
              <Link href="/events" className="hover:cursor-pointer">
                Events
              </Link>
              <Link href="/investmentportfolio" className="hover:cursor-pointer">
                Investments
              </Link>
              <Link href="/bulletin" className="hover:cursor-pointer">
                Articles
              </Link>
              <Link href="/contact" className="hover:cursor-pointer">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Col 2 */}
        <div className="order-0 flex flex-col items-center lg:order-1">
          <div className="flex flex-col items-start gap-2.5 text-left lg:gap-4">
            <h1 className="flex text-[1.25rem] font-bold whitespace-nowrap lg:block lg:text-[30px]">
              Contact Us
            </h1>

            <div className="flex flex-col gap-1.5 text-[0.95rem] font-light whitespace-nowrap lg:flex lg:gap-5 lg:text-[1.4rem] xl:text-[1.4rem] 2xl:text-[2rem]">
              <div className="flex flex-row gap-2 lg:gap-8 lg:text-[16px]">
                <FaPhoneAlt className="text-[1.25rem] lg:text-[1.3rem]" />
                <h2>0800 838 383</h2>
              </div>
              <div className="flex flex-row gap-2 lg:gap-8 lg:text-[16px]">
                <Link
                  className="transition-all duration-250 hover:scale-105 hover:cursor-pointer hover:text-white"
                  href="mailto:president@uaic.co.nz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="President's Email"
                >
                  <MdEmail className="text-[1.25rem] lg:text-[1.3rem]" />
                </Link>
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

        <div className="order-2 flex flex-col items-center">
          <div className="flex flex-col items-start gap-2.5 text-left lg:gap-4">
            <h1 className="flex text-[1.25rem] font-bold whitespace-nowrap lg:block lg:text-[30px]">
              Follow Us
            </h1>

            <div className="flex flex-col gap-1.5 text-[0.95rem] font-light whitespace-nowrap lg:flex lg:gap-5 lg:text-[1.4rem] xl:text-[1.4rem] 2xl:text-[2rem]">
              <div className="flex flex-row gap-2 lg:gap-8">
                <Link
                  className="transition-all duration-250 hover:scale-105 hover:cursor-pointer hover:text-white"
                  href="https://www.instagram.com/officialuaic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-3xl lg:text-[1.3rem]" />
                </Link>
                <div className="lg:text-[16px]">
                  <h2>@officialuaic</h2>
                </div>
              </div>
              <div className="flex flex-row gap-2 lg:gap-8">
                <Link
                  className="transition-all duration-250 hover:scale-105 hover:cursor-pointer hover:text-white"
                  href="https://www.facebook.com/officialUAIC"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebook className="text-3xl lg:text-[1.3rem]" />
                </Link>
                <div className="flex flex-row lg:text-[16px]">
                  <h2>@officialUAIC</h2>
                  <h2 className="invisible">IIIIIII</h2>
                </div>
              </div>
              <div className="flex flex-row gap-2 lg:gap-8">
                <Link
                  className="transition-all duration-250 hover:scale-105 hover:cursor-pointer hover:text-white"
                  href="https://www.linkedin.com/company/officialuaic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-3xl lg:text-[1.3rem]" />
                </Link>
                <div>
                  <h2 className="lg:text-[16px]">officialUAIC</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Logo */}
        <div className="order-3 flex h-full w-full flex-col items-center lg:hidden">
          <div className="flex h-full w-full max-w-[16rem] items-center justify-center">
            <Image
              src="/assets/logos/uaic-white.webp"
              alt="uaic white logo"
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>

      <hr className="my-0 w-[90%] border-t border-gray-300 lg:w-[100%]" />

      <div className="flex w-full justify-center px-4 pt-0 sm:px-8 md:px-12 lg:justify-between">
        <h1 className="flex items-center text-center text-[0.75rem] sm:text-[0.85rem] lg:text-[16px]">
          © Copyright 2025 University of Auckland Investment Club
        </h1>
        <div className="hidden max-w-[8rem] justify-self-center lg:flex">
          <Image
            src="/assets/logos/uaic-white.webp"
            alt="uaic white logo"
            width={150}
            height={150}
          />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
