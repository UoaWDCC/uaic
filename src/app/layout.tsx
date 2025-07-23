import Navbar from "@/components/Navbar";
import RecentEvents from "@/components/events/RecentEvents";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import EventsSection from "@/components/EventsSection";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Investment Club",
  description: "Investment Club Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Visible Navbar */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        {/* Margin height to match Navbar */}
        <div className="mt-[131.75px]">{children}</div>
        <Footer/>
      </body>
    </html>
  );
}
