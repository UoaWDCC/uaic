import Image from "next/image"
import Button from "../Button"
import { getLatestBulletin } from "@/features/bulletins/data/getBulletins";

export default async function LatestArticle() {
  const latest = await getLatestBulletin()

  if (!latest) return null

  const maxDescriptionLength = 380
  const truncatedDescription =
    latest.description && latest.description.length > maxDescriptionLength
      ? latest.description.slice(0, maxDescriptionLength) + "..."
      : latest.description || ""

  const maxTitleLength = 70
  const truncatedTitle =
    latest.title.length > maxTitleLength
      ? latest.title.slice(0, maxTitleLength) + "..."
      : latest.title

  // create a placeholder cover page and add here
  const imageSrc = latest.bulletinCover?.url || "/assets/bulletins/placeholder-bulletin-cover.png"
  const pdfUrl = latest.bulletinPDF?.url || "#"

  return (
    <div
      className="
        w-full
        flex flex-col items-center gap-[47px]
        p-20
        bg-[radial-gradient(70%_70%_at_50%_55%,rgba(20,92,169,0.2)_60%,rgba(255,255,255,0.2)_80%)]
        lg:bg-[radial-gradient(70%_60%_at_50%_55%,rgba(20,92,169,0.4)_0%,rgba(255,255,255,0.2)_80%)]
      "
    >
      <h1 className="text-darkBlue font-bold hidden text-title lg:block lg:text-2xl">
        Latest Article
      </h1>

      <div className="bg-white rounded-4xl w-[330px] lg:w-[805px] h-auto lg:h-[423px] overflow-hidden">
        {/* Desktop layout */}
        <div className="hidden lg:flex lg:flex-row gap-[75px] p-7 text-darkBlue">
          {/* Image Container */}
          <div className="relative w-[259px] h-[366px] rounded-3xl overflow-hidden">
            <Image src={imageSrc} alt={latest.title} fill className="object-cover" />
          </div>

          {/* Text */}
          <div className="flex-1 pt-6 pr-4">
            <h2 className="text-sm mb-2 font-light">Issue #{latest.issueNumber}</h2>
            <h1 className="text-xl font-bold mb-4 leading-tight">{truncatedTitle}</h1>
            <p className="mb-6 text-darkBlue font-light">{truncatedDescription}</p>
            <div className="w-[224px] h-[35px]">
              <Button link={pdfUrl} className="text-body">Read More</Button>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col lg:hidden relative w-[330px] h-[561px] rounded-3xl overflow-hidden bg-white items-center gap-[14px]">
          <h1 className="text-darkBlue text-xl font-bold lg:text-2xl mt-6">Latest Article</h1>

          <div
            className="relative w-[295px] h-[417px] flex flex-col gap-[9px] p-6 bg-cover bg-center text-white justify-end rounded-3xl"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(20,92,169,1) 0%, rgba(20,92,169,1) 50%, rgba(255,255,255,0) 75%), url('${imageSrc}')`,
            }}
          >
            <h2 className="text-xs font-light">Issue #{latest.issueNumber}</h2>
            <h1 className="font-bold text-sm leading-tight">{truncatedTitle}</h1>
            <p className="font-light text-xs">{truncatedDescription}</p>
          </div>

          <div className="w-[295px] h-[37px]">
            <Button link={pdfUrl}>Read More</Button>
          </div>
        </div>
      </div>
    </div>
  )
}