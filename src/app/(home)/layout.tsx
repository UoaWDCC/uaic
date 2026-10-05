import Navbar from "@/features/layout/components/Navbar";
import type { Metadata } from "next";
import Footer from "@/features/layout/components/Footer";
import "../globals.css";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const metadata: Metadata = {
  title: "Investment Club",
  description: "Investment Club Website",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getPayload({ config: configPromise });
  const tickerGlobal = await payload.findGlobal({ slug: "ticker" });

  const symbols = (tickerGlobal?.tickers || []).map((item) => ({
    proName: item.proName,
    title: item.title,
  }));

  return (
    <html lang="en">
      <body>
        {/* Visible Navbar */}
        <div className="z-modal fixed top-0 left-0 w-full">
          <Navbar symbols={symbols} />
        </div>

        {/* Margin height to match Navbar */}
        <main className="mt-[131.75px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
