import InvestConnectWork from "@/components/InvestConnectWork";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaLinkedin, FaTiktok } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="w-full mx-auto pt-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5 px-8">
        {/* Left Column - Contact Info */}
        <div>
          <h1 className="text-3xl font-bold text-darkBlue mb-8">Contact</h1>

          {/* Email Inquiries */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-darkBlue mb-4">
              Email Inquiries
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-darkBlue">General Inquiries</h3>
                <a
                  href="mailto:president@uaic.co.nz"
                  className="text-darkBlue underline"
                >
                  president@uaic.co.nz
                </a>
              </div>
              <div>
                <h3 className="font-bold text-darkBlue">Event Inquiries</h3>
                <a
                  href="mailto:marketing@uaic.co.nz"
                  className="text-darkBlue underline"
                >
                  marketing@uaic.co.nz
                </a>
              </div>
              <div>
                <h3 className="font-bold text-darkBlue">
                  Competitions Inquiries
                </h3>
                <a
                  href="mailto:competitions@uaic.co.nz"
                  className="text-darkBlue underline"
                >
                  competitions@uaic.co.nz
                </a>
              </div>
              <div>
                <h3 className="font-bold text-darkBlue">
                  Bulletin Inquiries
                </h3>
                <a
                  href="mailto:education@uaic.co.nz"
                  className="text-darkBlue underline"
                >
                  education@uaic.co.nz
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-darkBlue mb-4">
              Find Us on Social Media
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaInstagram className="h-5 w-5 text-darkBlue" />
                <a href="https://www.instagram.com/officialuaic/" target="_blank" className="text-darkBlue underline">
                  @officialuaic
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaFacebook className="h-5 w-5 text-darkBlue" />
                <a href="https://www.facebook.com/officialUAIC" target="_blank" className="text-darkBlue underline">
                  University of Auckland Investment Club
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaLinkedin className="h-5 w-5 text-darkBlue" />
                <a href="https://www.linkedin.com/company/officialuaic/" target="_blank" className="text-darkBlue underline">
                  University of Auckland Investment Club
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaTiktok className="h-5 w-5 text-darkBlue" />
                <a href="https://www.tiktok.com/@officialuaic" target="_blank" className="text-darkBlue underline">
                  @officialuaic UoA Investment Club
                </a>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-darkBlue mb-4">
              Address
            </h2>
            <div className="text-darkBlue font-bold">
              <p>
                University of Auckland Investment Club
              </p>
              <p>Level 1, Owen G. Glenn Building</p>
              <p>12 Grafton Road, Auckland CBD</p>
              <p>Auckland 1010</p>
              <p>New Zealand</p>
            </div>
          </div>
        </div>

        {/* Right Column - Image (Desktop only) */}
        <div className="hidden lg:block">
          <div className= "rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <Image src="/assets/execs/contact-image.webp" width={580} height={387} alt="contactImage"/>
            </div>
          </div>
        </div>
      </div>
      <InvestConnectWork/>
    </div>
  );
};

export default ContactPage;
