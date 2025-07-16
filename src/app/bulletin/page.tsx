import React from "react";
import BulletinHeroSection from "@/components/BulletinHeroSection";
import BulletinInfoSection from "@/components/BulletinInfoSection";
import LatestArticle from "@/components/LatestArticle";

const page = () => {
  return (
    <div className="">
      <BulletinHeroSection />
      <BulletinInfoSection />
      <LatestArticle
        issueNumber={79}
        imageSrc="/assets/issue-79-cover.png"
        title="Isn’t There Something Wrong with a World Where Everything is For Sale?"
        description="A collection of thought-provoking articles and opinion pieces exploring the ethics of commodification, the sale of IC’s Spark, the value of fine art as an investment, and Rivian’s dramatic industry shift. Includes a partner column from Forsyth Barr on tackling New Zealand’s water quality challenges."
        pdfUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Replace with actual PDF URL
      />
    </div>
  );
};

export default page;
