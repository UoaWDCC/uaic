import Image from "next/image";
import { FaInstagram, FaFacebook, FaLinkedin, FaTiktok } from "react-icons/fa";
import Link from "next/link";

const ContactPage = () => {
  return (
    <div className="mx-auto w-full pt-8">
      <div className="mt-5 grid grid-cols-1 gap-8 px-8 lg:grid-cols-2">
        {/* Left Column - Contact Info */}
        <div>
          <h1 className="text-title text-primary mb-8 font-bold">Contact</h1>

          {/* Email Inquiries */}
          <div className="mb-8">
            <h2 className="text-header text-primary mb-4 font-bold">Email Inquiries</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-primary text-body font-bold">General Inquiries</h3>
                <Link
                  href="mailto:president@uaic.co.nz"
                  className="text-primary text-body underline"
                >
                  president@uaic.co.nz
                </Link>
              </div>
              <div>
                <h3 className="text-primary text-body font-bold">Event Inquiries</h3>
                <Link
                  href="mailto:marketing@uaic.co.nz"
                  className="text-primary text-body underline"
                >
                  marketing@uaic.co.nz
                </Link>
              </div>
              <div>
                <h3 className="text-primary text-body font-bold">Competitions Inquiries</h3>
                <Link
                  href="mailto:competitions@uaic.co.nz"
                  className="text-primary text-body underline"
                >
                  competitions@uaic.co.nz
                </Link>
              </div>
              <div>
                <h3 className="text-primary text-body font-bold">Bulletin Inquiries</h3>
                <Link
                  href="mailto:education@uaic.co.nz"
                  className="text-primary text-body underline"
                >
                  education@uaic.co.nz
                </Link>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="mb-8">
            <h2 className="text-header text-primary mb-4 font-semibold">Find Us on Social Media</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaInstagram className="text-primary h-5 w-5" />
                <Link
                  href="https://www.instagram.com/officialuaic/"
                  target="_blank"
                  className="text-primary text-body underline"
                >
                  @officialuaic
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <FaFacebook className="text-primary h-5 w-5" />
                <Link
                  href="https://www.facebook.com/officialUAIC"
                  target="_blank"
                  className="text-primary text-body underline"
                >
                  University of Auckland Investment Club
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <FaLinkedin className="text-primary h-5 w-5" />
                <Link
                  href="https://www.linkedin.com/company/officialuaic/"
                  target="_blank"
                  className="text-primary text-body underline"
                >
                  University of Auckland Investment Club
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <FaTiktok className="text-primary text-body h-5 w-5" />
                <Link
                  href="https://www.tiktok.com/@officialuaic"
                  target="_blank"
                  className="text-primary text-body underline"
                >
                  @officialuaic UoA Investment Club
                </Link>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mb-8">
            <h2 className="text-header text-primary mb-4 font-semibold">Address</h2>
            <div className="text-primary text-body font-bold">
              <p>University of Auckland Investment Club</p>
              <p>Level 1, Owen G. Glenn Building</p>
              <p>12 Grafton Road, Auckland CBD</p>
              <p>Auckland 1010</p>
              <p>New Zealand</p>
            </div>
          </div>
        </div>

        {/* Right Column - Image (Desktop only) */}
        <div className="hidden lg:block">
          <div className="flex h-96 items-center justify-center rounded-lg">
            <div className="text-center">
              <Image
                src="/assets/execs/contact-image.webp"
                width={580}
                height={387}
                alt="contactImage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
