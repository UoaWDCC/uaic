import React from "react";
import BulletinHeroSection from "@/components/BulletinHeroSection";
import LatestArticle from "@/components/LatestArticle";
import BulletinInfosection from "@/components/BulletinInfoSection";
import UpdatedBulletin from "@/components/Bulletin";
import ArticleList from "@/components/ArticleList";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center gap-[200px]">
      <BulletinHeroSection />
      <BulletinInfosection />
      <LatestArticle
        issueNumber={79}
        imageSrc="/assets/bulletin_cover.jpg"
        title="Isn’t There Something Wrong with a World Where Everything is For Sale?"
        description="A collection of thought-provoking articles and opinion pieces exploring the ethics of commodification, the sale of IC’s Spark, the value of fine art as an investment, and Rivian’s dramatic industry shift. Includes a partner column from Forsyth Barr on tackling New Zealand’s water quality challenges. A collection of thought-provoking articles and opinion pieces exploring the ethics of commodification, the sale of IC’s Spark, the value of fine art as an investment, and Rivian’s dramatic industry shift. Includes a partner column from Forsyth Barr on tackling New Zealand’s water quality challenges."
        pdfUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      />
      <UpdatedBulletin />
      <ArticleList />
    </div>
  );
};

export default page;
