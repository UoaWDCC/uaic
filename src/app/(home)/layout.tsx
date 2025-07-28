import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import "../globals.css";

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
        <main className="mt-[131.75px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
