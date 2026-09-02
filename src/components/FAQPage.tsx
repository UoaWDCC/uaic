"use client";
import React, { useState } from "react";
import ArrowButton from "@/components/ArrowButton";
import { GoArrowUpRight } from "react-icons/go";

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

const FAQPage = ({ faqs }: { faqs: FAQ[] }) => {
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({});

  const toggleFaq = (id: string) => {
    setOpenFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
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
        <div key={faq.id} className="m-4 mb-4 rounded-full p-4 outline-1 outline-[#DCE6F2]">
          <button
            onClick={() => toggleFaq(faq.id)}
            className="flex w-full items-center justify-between text-left text-black hover:cursor-pointer"
          >
            <span className="text-body">{faq.question}</span>
            <GoArrowUpRight
              className={`h-7 w-7 flex-shrink-0 fill-[#005EAF] transition-transform duration-200 ${
                openFaqs[faq.id] ? "rotate-45" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-1000 ease-in-out ${
              openFaqs[faq.id] ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            <div className="text-sm text-black hover:cursor-pointer">
              <div className="w-full">
                <p className="text-body mt-4 font-medium">{faq.answer}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQPage;
