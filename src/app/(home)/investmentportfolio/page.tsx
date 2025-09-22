import OurPortfolio from "@/components/investments/OurPortfolio";
import StockView from "@/components/investments/StockView";

const InvestmentPortfolio = () => {
  return (
    <div className="px-6 py-10">
      {/* Top section heading */}
      <h1 className="text-2xl font-bold text-blue-900 mb-8 border-b border-gray-200 pb-2">
        Our Portfolio
      </h1>

      <div className="space-y-12">
        <StockView symbol="BER-5NZ" title="Real Time NZX Graph" />
        <StockView symbol="ASX" title="Real Time ASX Graph" />
      </div>
    </div>
  );
};

export default InvestmentPortfolio;
