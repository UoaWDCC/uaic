

import Image from "next/image";

import ArticleList from "@/components/ArticleList";
import Footer from "@/components/Footer";
import InvestConnectWork from "@/components/InvestConnectWork";
import UpdatedBulletin from "@/components/UpdatedBulletin";



export default function Home() {
  return (
    <div>
      {/* Build Homepage Here */}
      <ArticleList/>
      <UpdatedBulletin/>
      <InvestConnectWork/>
    </div>
  );
}
