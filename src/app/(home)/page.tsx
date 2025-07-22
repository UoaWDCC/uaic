

import Image from "next/image";

import ArticleList from "@/components/ArticleList";
import InvestConnectWork from "@/components/InvestConnectWork";
import UpdatedBulletin from "@/components/Bulletin";
import HomePage from "@/components/HomePage";
import SponsorsBanner from "@/components/SponsorsBanner";



export default function Home() {
  return (
    <div>
      {/* Build Homepage Here */}
      <HomePage/>
      <SponsorsBanner/>
      <ArticleList/>
      <UpdatedBulletin/>
      <InvestConnectWork/>
    </div>
  );
}
