import ArticleList from "@/components/home/ArticleList";
import UpdatedBulletin from "@/components/home/Bulletin";
import HomePage from "@/components/home/HomePage";
import SponsorsBanner from "@/components/home/SponsorsBanner";
import EventsSection from "@/components/EventsSection";
import NewestArticle from "@/components/NewestArticle";
import { getUpcomingEvents, getRecentEvents } from "@/features/users/data/getEvents";
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
      <NewestArticle />
      <EventsSection upcomingEvents={upcomingEvents} recentEvents={recentEvents} />
      <ArticleList />
      <UpdatedBulletin />
    </div>
  );
}
