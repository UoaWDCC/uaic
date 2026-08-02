import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MemberSignupButton from "@/components/MemberSignupButton";
import "./globals.css";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-[#EFF4FA] text-gray-900">
        <div className="fixed top-0 left-0 z-50 w-full">
          <Navbar theme="blue" />
        </div>

        <main className="mt-[131.75px] flex flex-1 items-center justify-center px-6 py-[75px] lg:px-[98px]">
          <section className="flex min-h-[506px] w-full max-w-[1244px] flex-col items-center justify-between gap-[26px] rounded-[16px] border border-[#DCE6F2] bg-white p-8 shadow-[0_1px_4px_0_rgba(12,12,13,0.05)] lg:flex-row lg:gap-[104px] lg:p-[100px]">
            <div className="flex min-h-[282px] w-full max-w-[470px] flex-col items-center justify-center gap-[26px] text-center lg:items-start lg:text-left">
              <div className="flex flex-col gap-[10px]">
                <div>
                  <p className="mb-[6px] text-[20px] leading-[27.16px] font-bold tracking-normal text-[#249AFF]">
                    404 Not Found
                  </p>
                  <h1 className="text-[40px] leading-[52px] font-bold tracking-normal text-[#172741] sm:text-[52px] sm:leading-[68px]">
                    Oops! We Couldn't Find That Page.
                  </h1>
                </div>
                <p className="max-w-[450px] text-[20px] leading-[20px] font-normal tracking-normal text-[#6B7A8D]">
                  This investment didn't diversify very well. The page you're looking for isn't
                  available.
                </p>
              </div>

              <MemberSignupButton />
            </div>

            <div className="order-first flex w-full max-w-[470px] flex-col items-center justify-center gap-[26px] lg:order-last lg:min-h-[282px]">
              <p
                aria-label="Error 404"
                className="text-[150px] leading-none font-bold tracking-normal text-[#005EAF] sm:text-[200px] lg:text-[240px]"
              >
                404
              </p>
            </div>
          </section>
        </main>

        <div className="w-full">
          <Footer />
        </div>
      </body>
    </html>
  );
}
