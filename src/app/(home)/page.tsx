

import Image from "next/image";

import ArticleList from "@/components/home/ArticleList";
import InvestConnectWork from "@/components/InvestConnectWork";
import UpdatedBulletin from "@/components/home/Bulletin";
import HomePage from "@/components/home/HomePage";
import SponsorsBanner from "@/components/home/SponsorsBanner";



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
