import HomePage from "@/features/home/components/HomePage";
import UpcomingEventsSection from "@/features/home/components/UpcomingEventsSection";
import RecentEventsSection from "@/features/home/components/RecentEventsSection";
import NewestArticle from "@/features/bulletins/components/NewestArticle";
import SponsorsBanner from "@/features/home/components/SponsorsBanner";

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
    </div>
  );
}
