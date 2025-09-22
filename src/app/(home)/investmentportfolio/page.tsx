import BlueGradient from "@/components/BlueGradient";
import OurPortfolio from '@/components/investments/OurPortfolio';
import StockView from '@/components/investments/StockView';

const InvestmentPortfolio = () => {
    return (
        <div>
            <OurPortfolio />
            <StockView market="NZX" />
            <StockView market="ASX" />
        </div>
    );
};

export default InvestmentPortfolio;