

import Image from "next/image";

import ArticleList from "@/components/ArticleList";
import Footer from "@/components/Footer";
import InvestConnectWork from "@/components/InvestConnectWork";
import UpdatedBulletin from "@/components/Bulletin";
import HomePage from "@/components/HomePage";
import SponsorsBanner from "@/components/SponsorsBanner";
import RecentEvents from "@/components/RecentEvents";



export default function Home() {
  return (
    <div>
      {/* Build Homepage Here */}
      <RecentEvents/>
      <HomePage/>
      <SponsorsBanner/>
      <ArticleList/>
      <UpdatedBulletin/>
      <InvestConnectWork/>
    </div>
  );
}
