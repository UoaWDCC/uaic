import React from "react";
import BulletinHeroSection from "@/components/bulletin/BulletinHeroSection";
import LatestArticle from "@/components/bulletin/LatestArticle";
import BulletinInfosection from "@/components/bulletin/BulletinInfoSection";
import Bulletin from "@/components/home/Bulletin";
import ArticleList from "@/components/home/ArticleList";
import BlueGradient from "@/components/BlueGradient";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="order-1 lg:order-1 w-full">
        <BulletinHeroSection />
      </div>

      <div className="order-5 lg:order-2 w-full">
        <BulletinInfosection />
      </div>

      <div className="order-2 lg:order-3 w-full">
        <LatestArticle
          issueNumber={79}
          imageSrc="/assets/bulletins/bulletin_cover.webp"
          title="Isn’t There Something Wrong with a World Where Everything is For Sale?"
          description="A collection of thought-provoking articles and opinion pieces exploring the ethics of commodification, the sale of IC’s Spark, the value of fine art as an investment, and Rivian’s dramatic industry shift. Includes a partner column from Forsyth Barr on tackling New Zealand’s water quality challenges. A collection of thought-provoking articles and opinion pieces exploring the ethics of commodification, the sale of IC’s Spark, the value of fine art as an investment, and Rivian’s dramatic industry shift. Includes a partner column from Forsyth Barr on tackling New Zealand’s water quality challenges."
          pdfUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
      </div>

      <div className="order-3 lg:order-4 w-full">
        <Bulletin />
      </div>

      <div className="order-4 lg:order-5 w-full">
        <ArticleList />
        <BlueGradient/>
      </div>
    </div>
  );
};

export default page;
