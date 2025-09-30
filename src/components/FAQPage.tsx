"use client";
import React, { useState, useEffect } from "react";
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
    <div className="lg:px-16">
      <div className="px-8 py-4 text-title font-bold text-darkBlue lg:pt-0">
        FAQ
      </div>

      <hr className="mb-2 w-screen border-t border-gray-300 lg:mx-4 lg:w-auto" />

      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="m-4 mb-4 rounded-lg p-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:shadow-none"
        >
          <button
            onClick={() => toggleFaq(faq.id)}
            className="flex w-full items-center justify-between text-left text-darkBlue hover:cursor-pointer"
          >
            <span className="text-header font-bold">
              {faq.question}
            </span>
            {openFaqs[faq.id] ? (
              <IoIosArrowDown className="inline-block h-7 w-7 flex-shrink-0 lg:hidden" />
            ) : (
              <IoIosArrowUp className="inline-block h-7 w-7 flex-shrink-0 lg:hidden" />
            )}
          </button>
          {openFaqs[faq.id] && (
            <div className="text-sm text-darkBlue hover:cursor-pointer">
              <div className="w-full">
                <p className="mt-4 text-body font-normal">
                  {faq.answer}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQPage;
