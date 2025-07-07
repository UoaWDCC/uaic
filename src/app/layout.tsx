import Navbar from "@/components/Navbar";
import RecentEvents from "@/components/RecentEvents";
import UpcomingEvents from "@/components/UpcomingEvents";
import EventsSection from "@/components/EventsSection";
import type { Metadata } from "next";
import "./globals.css";

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
        
      </body>
    </html>
  );
}
