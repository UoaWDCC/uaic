import ArticleList from "@/components/home/ArticleList";
import InvestConnectWork from "@/components/InvestConnectWork";
import UpdatedBulletin from "@/components/home/Bulletin";
import HomePage from "@/components/home/HomePage";
import SponsorsBanner from "@/components/home/SponsorsBanner";
import EventsSection from "@/components/EventsSection";
import { getUpcomingEvents, getRecentEvents } from "@/features/users/data/getEvents";

export default async function Home() {
  const upcomingEvents = await getUpcomingEvents();
  const recentEvents = await getRecentEvents();

  return (
    <div>
      {/* Build Homepage Here */}
      <HomePage />
      <SponsorsBanner />
      <EventsSection upcomingEvents={upcomingEvents} recentEvents={recentEvents} />
      <ArticleList />
      <UpdatedBulletin />
      <InvestConnectWork />
    </div>
  );
}