import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

export type ArticleCardContent = {
  image: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readTime?: string;
  link: string;
  openInNewTab?: boolean;
};

// Type follows the Figma card (Figtree — 13px category, 20px/34.78 SemiBold
// title, 16px body) at desktop, stepping down on narrow screens so the card
// still reads when two of them sit side by side on a phone.
const ArticleCard = ({ contentToDisplay }: { contentToDisplay: ArticleCardContent }) => {
  return (
    <Link
      href={contentToDisplay.link}
      target={contentToDisplay.openInNewTab ? "_blank" : undefined}
      rel={contentToDisplay.openInNewTab ? "noopener noreferrer" : undefined}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_2.5px_10px_rgba(0,0,0,0.25)]"
    >
      {/* Cover runs edge to edge, flush with the top of the card */}
      <div className="aspect-[400/161] w-full overflow-hidden">
        <Image
          src={contentToDisplay.image}
          alt={contentToDisplay.title}
          width={400}
          height={161}
          className="h-full w-full scale-110 object-cover transition-transform duration-300 group-hover:scale-100"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-4">
        <div className="inline-flex w-fit items-center justify-center rounded-full bg-gradient-to-l from-[#005EAF] to-[#249AFF] px-2.5 py-1 sm:px-3 lg:min-h-[25px] lg:px-4">
          <p className="text-[9px] leading-none font-normal text-white sm:text-[11px] lg:text-[13px]">
            {contentToDisplay.category}
          </p>
        </div>

        <h2 className="line-clamp-2 text-[13px] leading-[1.35] font-semibold text-[#0A0A0A] sm:text-[16px] lg:text-[20px] lg:leading-[34.78px]">
          {contentToDisplay.title}
        </h2>

        <p className="line-clamp-3 max-w-full text-[11px] leading-[1.2] font-normal text-black sm:text-[13px] lg:text-[16px]">
          {contentToDisplay.description}
        </p>

        <div className="mt-auto flex flex-row items-center justify-between gap-2 pt-2">
          <div className="flex flex-row gap-1.5 text-[9px] leading-[1.2] font-normal text-black/50 sm:gap-2 sm:text-[11px] lg:text-[16px]">
            <p>{contentToDisplay.date}</p>
            {contentToDisplay.readTime && (
              <>
                <p>•</p>
                <p>{contentToDisplay.readTime}</p>
              </>
            )}
          </div>
          <GoArrowUpRight className="h-4 w-4 shrink-0 text-[#145BA7] transition-transform duration-300 group-hover:rotate-45 sm:h-5 sm:w-5 lg:h-[29px] lg:w-[29px]" />
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
