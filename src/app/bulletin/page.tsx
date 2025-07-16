import React from 'react'
import BulletinHeroSection from "@/components/BulletinHeroSection";
import LatestArticle from "@/components/LatestArticle";

const page = () => {
  return (
    <div>
        <BulletinHeroSection />
        <LatestArticle
          issueNumber={1}
          imageSrc="/assets/latest-article.jpg"
          title="Exploring the Latest Trends in Technology"
          description="Dive into the latest advancements and trends shaping the tech industry today."
          pdfUrl="/assets/latest-article.pdf"
        />
    </div>
  )
}

export default page