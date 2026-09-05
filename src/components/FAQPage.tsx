"use client";
import React, { useState } from "react";
import ArrowButton from "@/components/ArrowButton";
import { GoArrowUpRight } from "react-icons/go";
import PageHeader from "@/components/PageHeader";

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

const FAQPage = ({ faqs }: { faqs: FAQ[] }) => {
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({});
  const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
  const rightFaqs = faqs.filter((_, i) => i % 2 === 1);

  const toggleFaq = (id: string) => {
    setOpenFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const renderFaq = (faq: FAQ) => (
    <div key={faq.id} className="rounded-[28px] p-4 outline-1 outline-[#DCE6F2]">
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
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          openFaqs[faq.id] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden text-sm text-black">
          <div className="w-full">
            <p className="text-body mt-4">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    /* Header section of FAQ page*/
    <div className="px-[23.5px] pt-18 lg:px-24.5">
      <PageHeader
        kicker="Got Questions?"
        title="FAQ"
        description="Connect with the team behind New Zealand's sovereign wealth fund and gain firsthand insights into long-term investing, portfolio management, and the role the Fund plays in shaping New Zealand's financial future."
        action={<ArrowButton text="View Upcoming Events" link="events" />}
      />

      <div className="pt-10 pb-16">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">{leftFaqs.map(renderFaq)}</div>
          <div className="flex flex-col gap-6">{rightFaqs.map(renderFaq)}</div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
