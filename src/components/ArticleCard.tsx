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

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="inline-flex w-fit items-center justify-center rounded-full bg-gradient-to-l from-[#005EAF] to-[#249AFF] px-3 py-1 lg:min-h-[25px] lg:px-4">
          <p className="text-[11px] leading-none font-normal text-white lg:text-[13px]">
            {contentToDisplay.category}
          </p>
        </div>

        <h2 className="line-clamp-2 text-[16px] leading-[1.35] font-semibold text-[#0A0A0A] lg:text-[20px]">
          {contentToDisplay.title}
        </h2>

        <p className="line-clamp-3 max-w-full text-[13px] leading-[1.3] font-normal text-black lg:text-[16px] lg:leading-[1.2]">
          {contentToDisplay.description}
        </p>

        <div className="mt-auto flex flex-row items-center justify-between gap-2 pt-2">
          <div className="flex flex-row gap-2 text-[11px] leading-[1.2] font-normal text-black/50 lg:text-[16px]">
            <p>{contentToDisplay.date}</p>
            {contentToDisplay.readTime && (
              <>
                <p>•</p>
                <p>{contentToDisplay.readTime}</p>
              </>
            )}
          </div>
          <GoArrowUpRight className="h-5 w-5 shrink-0 text-[#145BA7] transition-transform duration-300 group-hover:rotate-45 lg:h-[29px] lg:w-[29px]" />
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
