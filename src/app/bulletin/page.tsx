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
        issueNumber={1}
        imageSrc="/assets/latest-article.jpg"
        title="Exploring the Latest Trends in Technology"
        description="Dive into the latest advancements and trends shaping the tech industry today."
        pdfUrl="/assets/latest-article.pdf"
      />
      <UpdatedBulletin />
      <ArticleList />
    </div>
  );
};

export default page;
