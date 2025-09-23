import OurInvestments from "@/components/investments/OurInvestments";
import InvestmentCommittees from "@/components/investments/InvestmentCommittees";
import StockView from "@/components/investments/StockView";

const InvestmentPortfolio = () => {
  return (
    <>
      <div className="px-6 py-10">
        {/* Top section heading */}
        <div className="lg:px-80">
          <h1 className="text-2xl font-bold text-darkBlue mb-8 border-b border-gray-200 pb-2">
            Our Portfolio
          </h1>
        </div>

        <div className="space-y-12">
          <StockView symbol="BER-5NZ" title="Real Time 5NZ Graph" />
          <StockView symbol="ASX" title="Real Time ASX Graph" />
        </div>
      </div>

      <OurInvestments />
      <InvestmentCommittees />
    </>
  );
};

export default InvestmentPortfolio;
