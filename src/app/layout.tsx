import Navbar from "@/components/Navbar";
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
        <div className="fixed w-full">
            <Navbar />
        </div>

        {/* Invisible Navbar for layout purposes */}
        <div className="w-full invisible">
            <Navbar />
        </div>

        {children}

      </body>
    </html>
  );
}
