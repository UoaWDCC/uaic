import ArticleList from "@/components/ArticleList";
import Footer from "@/components/Footer";
import InvestConnectWork from "@/components/InvestConnectWork";


export default function Home() {
  return (
    <div>
      {/* Build Homepage Here */}
      <ArticleList/>
      <InvestConnectWork/>
      <Footer/>
    </div>
  );
}
