import { getBulletins } from "@/features/bulletins/data/getBulletins";
import type { Bulletin } from "@/features/bulletins/data/getBulletins";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";

const NewestArticle = async () => {
  // fetch bulletins server-side
  const bulletins: Bulletin[] = await getBulletins();
  const newest = bulletins.slice(0, 4);

  return (
    <div className="ps-5 pe-5 lg:ps-30 lg:pe-30">
      <p className="text-darkBlue pb-1 text-3xl font-semibold lg:pb-3">Newest Articles</p>

      <div className="grid grid-rows-2 flex-col gap-2 lg:grid-cols-6 lg:grid-rows-1 lg:gap-10">
        {/* Main Featured Newest Article */}
        {newest[0] && (
          <Link
            href={`/bulletin/${newest[0].id}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl ps-2 pb-2 lg:col-span-4 lg:ps-5 lg:pe-5 lg:pb-5"
          >
            <Image
              src={
                newest[0].bulletinCover?.url || "/assets/bulletins/placeholder-bulletin-cover.png"
              }
              alt={newest[0].title}
              fill
              className="z-0 scale-110 object-cover transition-all duration-500 ease-in-out group-hover:scale-100"
            />

            <div className="z-10 mt-auto w-fit rounded-2xl bg-gradient-to-r from-[#44a6fc] to-sky-600 ps-2 pe-2 text-white">
              Issue {newest[0].issueNumber}
            </div>

            <p className="z-10 pt-1 pb-2 text-base text-white lg:text-3xl">{newest[0].title}</p>

            <p className="z-10 pb-3 text-xs text-white">
              {new Date(newest[0].publishDate).toLocaleDateString("en-NZ", {
                month: "short",
                day: "numeric",
              })}{" "}
              · 5 Min read
            </p>
          </Link>
        )}

        {/* Sidebar List */}
        <div className="pt-5 lg:col-span-2 lg:pt-0">
          {newest.slice(1).map((b) => (
            <Link
              key={b.id}
              href={`/bulletin/${b.id}`}
              className="group grid grid-cols-[1fr_3fr] gap-3 pb-3 xl:gap-5"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={b.bulletinCover?.url || "/assets/bulletins/placeholder-bulletin-cover.png"}
                  alt={b.title}
                  fill
                  className="scale-105 object-cover object-center blur-[0.3px] transition-all duration-500 ease-in-out group-hover:scale-100"
                />
              </div>

              <div>
                <p className="text-[15px] font-semibold text-black group-hover:text-[#2d67d2] lg:pb-0 lg:text-lg xl:pb-3 xl:text-2xl">
                  {b.title}
                </p>

                <p className="text-[9px] text-[#778189] lg:text-[12px] xl:text-base">
                  {new Date(b.publishDate).toLocaleDateString("en-NZ", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  · 5 Min read
                </p>
              </div>
            </Link>
          ))}

          <Link
            href="/bulletin"
            className="group inline-flex w-full flex-row items-center justify-start gap-3 rounded-full bg-gradient-to-l from-[#005eaf] to-[#249AFF] py-2.5 pr-4.5 pl-3.5 text-sm whitespace-nowrap text-white transition-colors duration-200 hover:bg-white hover:text-[#005eaf] sm:text-xl"
          >
            <span className="relative flex size-5 items-center justify-center 2xl:size-9">
              <GoArrowUpRight className="absolute size-8 transition-transform duration-200 group-hover:rotate-45 2xl:size-8" />
            </span>
            <span className="text-xs lg:text-lg">View All Articles</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewestArticle;
