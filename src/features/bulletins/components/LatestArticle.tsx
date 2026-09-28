import Image from "next/image";
import Button from "@/components/Button";
import { getLatestBulletin } from "@/features/bulletins/data/getBulletins";

export default async function LatestArticle() {
  const latest = await getLatestBulletin();

  if (!latest) return null;

  const maxDescriptionLength = 380;
  const truncatedDescription =
    latest.description && latest.description.length > maxDescriptionLength
      ? latest.description.slice(0, maxDescriptionLength) + "..."
      : latest.description || "";

  const maxTitleLength = 70;
  const truncatedTitle =
    latest.title.length > maxTitleLength
      ? latest.title.slice(0, maxTitleLength) + "..."
      : latest.title;

  // create a placeholder cover page and add here
  const imageSrc = latest.bulletinCover?.url || "/assets/bulletins/placeholder-bulletin-cover.webp";
  const pdfUrl = latest.bulletinPDF?.url || "#";

  return (
    <div className="flex w-full flex-col items-center gap-[47px] bg-[radial-gradient(70%_70%_at_50%_55%,rgba(20,92,169,0.2)_60%,rgba(255,255,255,0.2)_80%)] p-20 lg:bg-[radial-gradient(70%_60%_at_50%_55%,rgba(20,92,169,0.4)_0%,rgba(255,255,255,0.2)_80%)]">
      <h1 className="text-primary text-title hidden font-bold lg:block lg:text-2xl">
        Latest Article
      </h1>

      <div className="h-auto w-[330px] overflow-hidden rounded-4xl bg-white lg:h-[423px] lg:w-[805px]">
        {/* Desktop layout */}
        <div className="text-primary hidden gap-[75px] p-7 lg:flex lg:flex-row">
          {/* Image Container */}
          <div className="relative h-[366px] w-[259px] overflow-hidden rounded-3xl">
            <Image src={imageSrc} alt={latest.title} fill sizes="259px" className="object-cover" />
          </div>

          {/* Text */}
          <div className="flex-1 pt-6 pr-4">
            <h2 className="mb-2 text-sm font-light">Issue #{latest.issueNumber}</h2>
            <h1 className="mb-4 text-xl leading-tight font-bold">{truncatedTitle}</h1>
            <p className="text-primary mb-6 font-light">{truncatedDescription}</p>
            <div className="h-[35px] w-[224px]">
              <Button link={pdfUrl} className="text-body">
                Read More
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="relative flex h-[561px] w-[330px] flex-col items-center gap-[14px] overflow-hidden rounded-3xl bg-white lg:hidden">
          <h1 className="text-primary mt-6 text-xl font-bold lg:text-2xl">Latest Article</h1>

          <div className="relative flex h-[417px] w-[295px] flex-col justify-end overflow-hidden rounded-3xl p-6 text-white">
            <Image
              src={imageSrc}
              alt={latest.title}
              fill
              sizes="295px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,92,169,1)_0%,rgba(20,92,169,1)_50%,rgba(255,255,255,0)_75%)]" />
            <div className="relative flex flex-col gap-[9px]">
              <h2 className="text-xs font-light">Issue #{latest.issueNumber}</h2>
              <h1 className="text-sm leading-tight font-bold">{truncatedTitle}</h1>
              <p className="text-xs font-light">{truncatedDescription}</p>
            </div>
          </div>

          <div className="h-[37px] w-[295px]">
            <Button link={pdfUrl}>Read More</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
