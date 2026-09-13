import Navbar from "@/features/layout/components/Navbar";
import type { Metadata } from "next";
import Footer from "@/features/layout/components/Footer";
import "../globals.css";

export const metadata: Metadata = {
  title: "Investment Club",
  description: "Investment Club Website",
};

// Match Fly behaviour: pages are rendered on demand, never prerendered at
// build. Also lets `next build` run without a database, the way Fly's
// `next build --experimental-build-mode compile` does.
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
