import ArticleList from "@/components/home/ArticleList";
import UpdatedBulletin from "@/components/home/Bulletin";
import HomePage from "@/components/home/HomePage";
import EventsSection from "@/components/EventsSection";
import { getUpcomingEvents, getRecentEvents } from "@/features/users/data/getEvents";
import SponsorsBanner from "@/components/home/SponsorsBanner";

import { getHeroSectionCarousel } from "@/features/home/data/getHeroSectionCarousel";

export default async function Home() {
  const upcomingEvents = await getUpcomingEvents();
  const recentEvents = await getRecentEvents();
  const heroSlides = await getHeroSectionCarousel();
  const heroImages = heroSlides.map((slide) => slide.imageUrl);

  return (
    <div>
      {/* Build Homepage Here */}

      <HomePage images={heroImages} />
      <SponsorsBanner />

      <EventsSection upcomingEvents={upcomingEvents} recentEvents={recentEvents} />
      <ArticleList />
      <UpdatedBulletin />
    </div>
  );
}
