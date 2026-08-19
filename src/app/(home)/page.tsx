import HomePage from "@/components/home/HomePage";
import UpcomingEventsSection from "@/components/home/UpcomingEventsSection";
import RecentEventsSection from "@/components/home/RecentEventsSection";
import NewestArticle from "@/components/NewestArticle";
import FeaturedArticlesCarousel from "@/components/home/FeaturedArticlesCarousel";
import SponsorsBanner from "@/components/home/SponsorsBanner";

import { getHeroSectionCarousel } from "@/features/home/data/getHeroSectionCarousel";

export default async function Home() {
  const heroSlides = await getHeroSectionCarousel();
  const heroImages = heroSlides.map((slide) => slide.imageUrl);

  return (
    <div>
      {/* Build Homepage Here */}

      <HomePage images={heroImages} />
      <SponsorsBanner />
      <UpcomingEventsSection />
      <RecentEventsSection />
      <NewestArticle />
      <FeaturedArticlesCarousel />
    </div>
  );
}
