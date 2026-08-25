"use client";
import React, { useState, useEffect } from "react";
import ArrowButton from "@/components/ArrowButton";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

const FAQPage = ({ faqs }: { faqs: FAQ[] }) => {
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const updateOpenFaqs = () => {
      const shouldOpen = window.innerWidth >= 1024;
      const newState: Record<string, boolean> = {};
      faqs.forEach((faq) => (newState[faq.id] = shouldOpen));
      setOpenFaqs(newState);
    };

    updateOpenFaqs();
    window.addEventListener("resize", updateOpenFaqs);
    return () => window.removeEventListener("resize", updateOpenFaqs);
  }, [faqs]);

  const toggleFaq = (id: string) => {
    if (window.innerWidth < 1024) {
      setOpenFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  return (
    /* Header section of FAQ page*/
    <div className="lg:px-16">
      <div className="container mx-auto p-6">
        <div className="text-[34.27px] font-bold text-[#249AFF]">Got Questions?</div>
        <div className="text-[64px] font-bold text-black lg:pt-0">FAQ</div>
        <div className="max-w-[328px] lg:max-w-[732px]">
          Connect with the team behind New Zealand's sovereign wealth fund and gain firsthand
          insights into long-term investing, portfolio management, and the role the Fund plays in
          shaping New Zealand's financial future.
        </div>
        <div className="w-full py-[24px] lg:w-fit lg:py-[16px]">
          <ArrowButton text="View Upcoming Events" link="\events" fullWidth />
        </div>
      </div>
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="m-4 mb-4 rounded-lg p-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:shadow-none"
        >
          <button
            onClick={() => toggleFaq(faq.id)}
            className="text-darkBlue flex w-full items-center justify-between text-left hover:cursor-pointer"
          >
            <span className="text-header font-bold">{faq.question}</span>
            {openFaqs[faq.id] ? (
              <IoIosArrowDown className="inline-block h-7 w-7 flex-shrink-0 lg:hidden" />
            ) : (
              <IoIosArrowUp className="inline-block h-7 w-7 flex-shrink-0 lg:hidden" />
            )}
          </button>
          {openFaqs[faq.id] && (
            <div className="text-darkBlue text-sm hover:cursor-pointer">
              <div className="w-full">
                <p className="text-body mt-4 font-normal">{faq.answer}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQPage;
