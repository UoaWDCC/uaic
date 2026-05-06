import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import "../globals.css";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-figtree",
  display: "swap",
});

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
    <html lang="en" className={figtree.className}>
      <body>
        {/* Visible Navbar */}
        <div className="fixed top-0 left-0 z-50 w-full">
          <Navbar />
        </div>

        {/* Margin height to match Navbar */}
        <main className="mt-[131.75px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
