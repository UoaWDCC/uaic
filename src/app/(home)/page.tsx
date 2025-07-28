import ArticleList from "@/components/home/ArticleList";
import InvestConnectWork from "@/components/InvestConnectWork";
import UpdatedBulletin from "@/components/home/Bulletin";
import HomePage from "@/components/home/HomePage";
import SponsorsBanner from "@/components/home/SponsorsBanner";
import EventsSection from "@/components/EventsSection";
import JoinUs from "@/components/JoinUs";

export default function Home() {
  return (
    <div>
      {/* Build Homepage Here */}
      <HomePage />
      <SponsorsBanner />
      <EventsSection />
      <ArticleList />
      <UpdatedBulletin />
      <InvestConnectWork />
      <JoinUs />
    </div>
  );
}
