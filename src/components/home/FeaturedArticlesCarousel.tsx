import { GoArrowRight, GoArrowLeft, GoArrowUpRight } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";

type FeaturedArticle = {
  image: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  link: string;
};

const featuredArticles: FeaturedArticle[] = [
  {
    image: "/assets/bulletins/temparticlecard.png",
    category: "Category Name",
    title: "Exploring DCT Investing",
    description:
      "A look into how DCT, why investors use it, and how consistent investing can reduce impact of market fluctuations.",
    date: "Nov 24",
    readTime: "4 Min read",
    link: "/joinus",
  },
  {
    image: "/assets/bulletins/temparticlecard.png",
    category: "Category Name ",
    title: "Exploring DCT Investing",
    description:
      "A look into how DCT, why investors use it, and how consistent investing can reduce impact of market fluctuations.",
    date: "Nov 24",
    readTime: "4 Min read",
    link: "/joinus",
  },
  {
    image: "/assets/bulletins/temparticlecard.png",
    category: "Category Name",
    title: "Exploring DCT Investing",
    description:
      "A look into how DCT, why investors use it, and how consistent investing can reduce impact of market fluctuations. ",
    date: "Nov 24",
    readTime: "4 Min read",
    link: "/about",
  },
  {
    image: "/assets/bulletins/temparticlecard.png",
    category: "Category Name",
    title: "Exploring DCT Investing",
    description:
      "A look into how DCT, why investors use it, and how consistent investing can reduce impact of market fluctuations. ",
    date: "Nov 24",
    readTime: "4 Min read",
    link: "/about",
  },
];

const ArticleCard = ({ contentToDisplay }: { contentToDisplay: FeaturedArticle }) => {
  return (
    <div className="w-full overflow-hidden rounded-[16px] shadow-[0_10px_22px_rgba(0,0,0,0.25)]">
      <Image
        src={contentToDisplay.image}
        alt="Article Image"
        width={400}
        height={161}
        className="aspect-[400/161] w-full object-cover"
      />
      <div className="flex flex-col gap-[8px] p-4 sm:p-5 lg:p-[24px]">
        <div className="inline-flex min-h-[27px] w-fit items-center justify-center rounded-[100px] bg-gradient-to-l from-[#005EAF] to-[#249AFF] px-[12px] py-[4px]">
          <p className="text-sm font-normal text-white sm:text-[16px]">
            {contentToDisplay.category}
          </p>
        </div>
        <div className="flex flex-col gap-[6px]">
          <h2 className="text-lg font-semibold sm:text-[20px]">{contentToDisplay.title}</h2>
          <p className="max-w-full text-sm leading-tight font-normal sm:text-[16px]">
            {contentToDisplay.description}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-row gap-[8px] text-sm font-normal opacity-50 sm:text-[16px]">
            <p>{contentToDisplay.date}</p>
            <p>•</p>
            <p>{contentToDisplay.readTime}</p>
          </div>
          <Link href={contentToDisplay.link}>
            <GoArrowUpRight className="h-7 w-7 text-[#145BA7] duration-400 hover:rotate-45 sm:h-[29px] sm:w-[29px]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedArticlesCarousel = () => {
  return (
    // Main container for articles with Kades padding
    <div className="flex flex-col gap-[24px] border-2 p-4 sm:p-8 md:p-12 lg:p-[96px]">
      {/* Aeryns Board */}
      <div className="border-1">
        <p>Aeryn</p>
      </div>

      {/* Lucas board*/}
      <div className="flex flex-col gap-[12px]">
        {/* Header row container */}
        <div className="flex flex-row items-center justify-between gap-4">
          {/* Header Title Container */}
          <div className="flex w-full sm:w-auto">
            <p className="text-2xl font-semibold text-[#005EAF] sm:text-[32px]">
              Featured Articles
            </p>
          </div>

          {/* Header Arrows */}
          <div className="flex flex-row gap-4 sm:justify-center">
            <button className="cursor-pointer">
              <GoArrowLeft className="h-10 w-10 text-[#005EAF] sm:h-[51.27px] sm:w-[51.27px]" />
            </button>
            <button className="cursor-pointer">
              <GoArrowRight className="h-10 w-10 text-[#005EAF] sm:h-[51.27px] sm:w-[51.27px]" />
            </button>
          </div>
        </div>

        {/* Components container */}
        <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 xl:grid-cols-3">
          {featuredArticles.slice(0, 3).map((item, index) => (
            <ArticleCard key={index} contentToDisplay={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticlesCarousel;
