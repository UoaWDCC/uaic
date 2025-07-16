"use client";
import React, { useState, useEffect } from "react";

const FAQPage = () => {
  const [isFaqOneOpen, setIsFaqOneOpen] = useState(false);
  const [isFaqTwoOpen, setIsFaqTwoOpen] = useState(false);
  const [isFaqThreeOpen, setIsFaqThreeOpen] = useState(false);
  const [isFaqFourOpen, setIsFaqFourOpen] = useState(false);
  const [isFaqFiveOpen, setIsFaqFiveOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const shouldOpen = window.innerWidth >= 1024;
      setIsFaqOneOpen(shouldOpen);
      setIsFaqTwoOpen(shouldOpen);
      setIsFaqThreeOpen(shouldOpen);
      setIsFaqFourOpen(shouldOpen);
      setIsFaqFiveOpen(shouldOpen);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="lg:p-16">
      <div className="lg:pt-0 lg:text-[35px] p-4 mt-[35px] text-[23px] text-darkBlue font-bold">
        FAQ
      </div>

      <hr className="w-screen lg:w-auto lg:mx-4 border-t border-gray-300 mb-2" />

      {/* FAQ 1 */}
      <div className="m-4 p-4 rounded-lg mb-10 shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:shadow-none">
        <button
          onClick={() => {
            if (window.innerWidth < 1024) {
              setIsFaqOneOpen((prev) => !prev);
            }
          }}
          className="w-full flex justify-between items-center text-left text-darkBlue"
        >
          <span className="font-bold text-[18px] lg:text-[32px]">What is UIAC?</span>
          <img
            src={`/assets/${isFaqOneOpen ? "arrow-down" : "arrow-up"}.png`}
            alt="Toggle FAQ"
            className="lg:hidden w-7 h-7 inline-block"
          />
        </button>
        {isFaqOneOpen && (
          <div className="text-sm text-darkBlue">
            <div className="w-full">
              <p className="lg:text-[28px] text-[16px] mt-4 font-normal">
                The University of Auckland Investment Club was founded in 2009 and is a
                student-run incorporated society. We welcome members from all academic
                backgrounds and stages at the University of Auckland.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FAQ 2 */}
      <div className="m-4 p-4 rounded-lg mb-10 shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:shadow-none">
        <button
          onClick={() => {
            if (window.innerWidth < 1024) {
              setIsFaqTwoOpen((prev) => !prev);
            }
          }}
          className="w-full flex justify-between items-center text-left text-darkBlue"
        >
          <span className="font-bold text-[18px] lg:text-[32px]">What does UAIC do?</span>
          <img
            src={`/assets/${isFaqTwoOpen ? "arrow-down" : "arrow-up"}.png`}
            alt="Toggle FAQ"
            className="lg:hidden w-7 h-7 inline-block"
          />
        </button>
        {isFaqTwoOpen && (
          <div className="text-sm text-darkBlue">
            <div className="w-full">
              <p className="lg:text-[28px] text-[16px] mt-4 font-normal">
                UAIC runs a plethora of events throughout the year as part of our core
                offering such as competitions, educational events, and social events
                for its members. Additionally, there are two more branches of UAIC:
                the Bulletin team and the Investment Committee. The Bulletin team is
                in charge of publishing the edition of the club's newsletter - find out
                more here. The Investment Committee is in charge of running the club's fund
                by researching, analysing, and delivering stock pitches to update the fund
                - find out more here.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FAQ 3 */}
      <div className="m-4 p-4 rounded-lg mb-10 shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:shadow-none">
        <button
          onClick={() => {
            if (window.innerWidth < 1024) {
              setIsFaqThreeOpen((prev) => !prev);
            }
          }}
          className="w-full flex justify-between items-center text-left text-darkBlue"
        >
          <span className="font-bold text-[18px] lg:text-[32px]">How do I become a member of UAIC?</span>
          <img
            src={`/assets/${isFaqThreeOpen ? "arrow-down" : "arrow-up"}.png`}
            alt="Toggle FAQ"
            className="lg:hidden w-7 h-7 inline-block"
          />
        </button>
        {isFaqThreeOpen && (
          <div className="text-sm text-darkBlue">
            <div className="w-full">
              <p className="lg:text-[28px] text-[16px] mt-4 font-normal">
                Becoming a member is simple. Sign up online at [www.uaic.co.nz/membership].
                The sign-up cost is $20 to become a registered member for the remainder of
                the year. The full $20 fee is put towards the administration of the club.
                All events and competitions that we run are free for members, so you won’t
                have to pay any more fees after this.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FAQ 4 */}
      <div className="m-4 p-4 rounded-lg mb-10 shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:shadow-none">
        <button
          onClick={() => {
            if (window.innerWidth < 1024) {
              setIsFaqFourOpen((prev) => !prev);
            }
          }}
          className="w-full flex justify-between items-center text-left text-darkBlue"
        >
          <span className="font-bold text-[18px] lg:text-[32px]">What events does UAIC hold?</span>
          <img
            src={`/assets/${isFaqFourOpen ? "arrow-down" : "arrow-up"}.png`}
            alt="Toggle FAQ"
            className="lg:hidden w-7 h-7 inline-block"
          />
        </button>
        {isFaqFourOpen && (
          <div className="text-sm text-darkBlue">
            <div className="w-full">
              <p className="lg:text-[28px] text-[16px] mt-4 font-normal">
                Check out our Instagram at [www.instagram.com/officialuaic] to
                learn more. All our events are advertised there, or alternatively,
                check out our Events page.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FAQ 5 */}
      <div className="m-4 p-4 rounded-lg mb-10 shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:shadow-none">
        <button
          onClick={() => {
            if (window.innerWidth < 1024) {
              setIsFaqFiveOpen((prev) => !prev);
            }
          }}
          className="w-full flex justify-between items-center text-left text-darkBlue"
        >
          <span className="font-bold text-[18px] lg:text-[32px]">How do I become a part of the UAIC executive leadership team?</span>
          <img
            src={`/assets/${isFaqFiveOpen ? "arrow-down" : "arrow-up"}.png`}
            alt="Toggle FAQ"
            className="lg:hidden w-7 h-7 inline-block"
          />
        </button>
        {isFaqFiveOpen && (
          <div className="text-sm text-darkBlue">
            <div className="w-full">
              <p className="lg:text-[28px] text-[16px] mt-4 font-normal">
                Applications to be a part of the Executive team, Bulletin team, and
                Investment Committee open towards the end of each semester as
                vacancies open. Keep an eye out on our Instagram page for the most
                up-to-date information regarding hiring!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage;
