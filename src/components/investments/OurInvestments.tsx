"use client";

import { useState } from "react";

const investments = [
  {
    name: "Nufarm",
    description:
      "Nufarm is an Australian agriculture chemical business that provides crop protection solutions to customers across North America, Europe and Asia Pacific. It has developed a range of crop protection service products for 5 key areas: Soybean, corn, cereals, nuts and pasture. Crop Protection makes up 92% of revenues, whereas its fast growing Seed Technologies business makes up 8% of all revenues. Trends such as the growing population, decrease in arable land for agriculture and shifts toward sustainable farming practices and regenerative farming place strong drivers for revenue expansion within its seed technology business. Nufarm fully owns 100% of its innovations and has begun to achieve regulatory approvals in key markets such as Norway for salmon fishing.",
    date: "October, 2023",
    ticker: "NUF",
    exchange: "ASX",
    industry: "Agriculture",
  },
  {
    name: "Hanson",
    description:
      "Hansen Technologies is an Australian technology company that provides support software to energy and communications companies across more than 80 countries. Their software products range from billing, customer management and pricing to automated market trading and communication network provisioning. Hansen is well-placed to continue its growth, continuing to improve its suite of products, bringing significant customer wins in the past year. Furthermore, its acquisitions team continues to bring value through the 'Hansenisation' process. With a strong balance sheet, cash position and growth, we see great potential in Hansen's future.",
    date: "September, 2022",
    ticker: "HSN",
    exchange: "ASX",
    industry: "Software Application",
  },
  {
    name: "Elders",
    description:
      "Elders is an agribusiness company with a track record stretching back to 1839. Their business ranges across retail farming supplies, real estate, auction services and financial services, providing diverse revenue streams and one-stop solutions for customers. Elders' size, customer service and vertical integration provide significant competitive advantages. As the largest player with an excellent financial position, Elders is well placed to continue an aggressive growth and acquisition strategy to take advantage of a fragmented industry.",
    date: "July, 2022",
    ticker: "ELD",
    exchange: "ASX",
    industry: "Consumer Defensive",
  },
  {
    name: "Shaver Shop Group",
    description:
      "Shaver Shop focuses on 'all things related to hair removal'. Founded in 1986, Shaver Shop is well-established with stores across Australia and New Zealand. This entrenchment in the market, alongside superior customer service, provides Shaver Shop with a wide economic moat and competitive advantage against ecommerce disruptors and their competitors. Future growth lies in Shaver Shops' continued expansion into New Zealand and strong industry tailwinds in the personal grooming space post pandemic.",
    date: "September, 2021",
    ticker: "SSG",
    exchange: "ASX",
    industry: "Specialty Retail",
  },
];

const OurInvestments = () => {
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");

  return (
    <section className="px-6 py-12">
{/* Pills style tab switcher */}
<div className="flex justify-center mb-12 relative">
  <div className="relative flex bg-darkBlue border-5 border-darkBlue rounded-full overflow-hidden w-[400px]">
    {/* Sliding background */}
    <div
      className="absolute top-0 left-0 h-full w-1/2 bg-white rounded-full transition-transform duration-300"
      style={{
        transform:
          activeTab === "current" ? "translateX(0%)" : "translateX(100%)",
      }}
    />
    <button
      onClick={() => setActiveTab("current")}
      className={`relative w-1/2 px-6 py-2 text-sm font-semibold transition-colors duration-300 ${
        activeTab === "current" ? "text-darkBlue" : "text-white"
      }`}
    >
      Current Investments
    </button>
    <button
      onClick={() => setActiveTab("past")}
      className={`relative w-1/2 px-6 py-2 text-sm font-semibold transition-colors duration-300 ${
        activeTab === "past" ? "text-darkBlue" : "text-white"
      }`}
    >
      Past Investments
    </button>
  </div>
</div>

      {/* Investment cards */}
      <div className="grid md:grid-cols-2 gap-10">
        {investments.map((inv, idx) => (
          <div key={idx} className="p-6 hover:shadow-lg transition">
            <h2 className="text-darkBlue font-bold text-lg mb-3">{inv.name}</h2>
            <p className="text-foreground text-body mb-4">{inv.description}</p>

            <div className="grid grid-cols-4 gap-4 text-sm text-foreground">
              <div>
                <p className="font-semibold text-darkBlue">Investment Date</p>
                <p>{inv.date}</p>
              </div>
              <div>
                <p className="font-semibold text-darkBlue">Ticker</p>
                <p>{inv.ticker}</p>
              </div>
              <div>
                <p className="font-semibold text-darkBlue">Exchange</p>
                <p>{inv.exchange}</p>
              </div>
              <div>
                <p className="font-semibold text-darkBlue">Industry</p>
                <p>{inv.industry}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurInvestments;
