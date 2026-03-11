import Image from "next/image";
import Button from "../Button";
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
  const imageSrc = latest.bulletinCover?.url || "/assets/bulletins/placeholder-bulletin-cover.png";
  const pdfUrl = latest.bulletinPDF?.url || "#";

  return (
    <div className="flex w-full flex-col items-center gap-[47px] bg-[radial-gradient(70%_70%_at_50%_55%,rgba(20,92,169,0.2)_60%,rgba(255,255,255,0.2)_80%)] p-20 lg:bg-[radial-gradient(70%_60%_at_50%_55%,rgba(20,92,169,0.4)_0%,rgba(255,255,255,0.2)_80%)]">
      <h1 className="text-darkBlue text-title hidden font-bold lg:block lg:text-2xl">
        Latest Article
      </h1>

      <div className="h-auto w-[330px] overflow-hidden rounded-4xl bg-white lg:h-[423px] lg:w-[805px]">
        {/* Desktop layout */}
        <div className="text-darkBlue hidden gap-[75px] p-7 lg:flex lg:flex-row">
          {/* Image Container */}
          <div className="relative h-[366px] w-[259px] overflow-hidden rounded-3xl">
            <Image src={imageSrc} alt={latest.title} fill className="object-cover" />
          </div>

          {/* Text */}
          <div className="flex-1 pt-6 pr-4">
            <h2 className="mb-2 text-sm font-light">Issue #{latest.issueNumber}</h2>
            <h1 className="mb-4 text-xl leading-tight font-bold">{truncatedTitle}</h1>
            <p className="text-darkBlue mb-6 font-light">{truncatedDescription}</p>
            <div className="h-[35px] w-[224px]">
              <Button link={pdfUrl} className="text-body">
                Read More
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="relative flex h-[561px] w-[330px] flex-col items-center gap-[14px] overflow-hidden rounded-3xl bg-white lg:hidden">
          <h1 className="text-darkBlue mt-6 text-xl font-bold lg:text-2xl">Latest Article</h1>

          <div
            className="relative flex h-[417px] w-[295px] flex-col justify-end gap-[9px] rounded-3xl bg-cover bg-center p-6 text-white"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(20,92,169,1) 0%, rgba(20,92,169,1) 50%, rgba(255,255,255,0) 75%), url('${imageSrc}')`,
            }}
          >
            <h2 className="text-xs font-light">Issue #{latest.issueNumber}</h2>
            <h1 className="text-sm leading-tight font-bold">{truncatedTitle}</h1>
            <p className="text-xs font-light">{truncatedDescription}</p>
          </div>

          <div className="h-[37px] w-[295px]">
            <Button link={pdfUrl}>Read More</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
