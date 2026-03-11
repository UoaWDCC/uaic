import React from "react";
import BulletinHeroSection from "@/components/bulletin/BulletinHeroSection";
import LatestArticle from "@/components/bulletin/LatestArticle";
import BulletinInfosection from "@/components/bulletin/BulletinInfoSection";
import Bulletin from "@/components/home/Bulletin";
import ArticleList from "@/components/home/ArticleList";

const page = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="order-1 w-full lg:order-1">
        <BulletinHeroSection />
      </div>

      <div className="order-5 w-full lg:order-2">
        <BulletinInfosection />
      </div>

      <div className="order-2 w-full lg:order-3">
        <LatestArticle
          issueNumber={79}
          imageSrc="/assets/bulletins/bulletin_cover.webp"
          title="Isn’t There Something Wrong with a World Where Everything is For Sale?"
          description="A collection of thought-provoking articles and opinion pieces exploring the ethics of commodification, the sale of IC’s Spark, the value of fine art as an investment, and Rivian’s dramatic industry shift. Includes a partner column from Forsyth Barr on tackling New Zealand’s water quality challenges. A collection of thought-provoking articles and opinion pieces exploring the ethics of commodification, the sale of IC’s Spark, the value of fine art as an investment, and Rivian’s dramatic industry shift. Includes a partner column from Forsyth Barr on tackling New Zealand’s water quality challenges."
          pdfUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
      </div>

      <div className="order-3 w-full lg:order-4">
        <Bulletin />
      </div>

      <div className="order-4 w-full lg:order-5">
        <ArticleList />
      </div>
    </div>
  );
};

export default page;
