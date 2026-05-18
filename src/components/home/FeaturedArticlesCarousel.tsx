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
    <Link
      href={contentToDisplay.link}
      className="group [container-type:inline-size] block w-full overflow-hidden rounded-[16px] shadow-[0_10px_22px_rgba(0,0,0,0.25)]"
    >
      <div className="aspect-[400/161] w-full overflow-hidden">
        <Image
          src={contentToDisplay.image}
          alt="Article Image"
          width={400}
          height={161}
          className="h-full w-full scale-120 object-cover transition-transform duration-300 group-hover:scale-100"
        />
      </div>
      <div className="flex flex-col gap-[2cqw] p-[6cqw]">
        <div className="inline-flex min-h-[6.75cqw] w-fit items-center justify-center rounded-[100px] bg-gradient-to-l from-[#005EAF] to-[#249AFF] px-[3cqw] py-[1cqw]">
          <p className="text-[4cqw] leading-none font-normal text-white">
            {contentToDisplay.category}
          </p>
        </div>
        <div className="flex flex-col gap-[1.5cqw]">
          <h2 className="text-[5cqw] leading-[1.15] font-semibold">{contentToDisplay.title}</h2>
          <p className="max-w-full text-[4cqw] leading-tight font-normal">
            {contentToDisplay.description}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between gap-[4cqw]">
          <div className="flex flex-row gap-[2cqw] text-[4cqw] font-normal opacity-50">
            <p>{contentToDisplay.date}</p>
            <p>•</p>
            <p>{contentToDisplay.readTime}</p>
          </div>
          <GoArrowUpRight className="h-[7.25cqw] w-[7.25cqw] shrink-0 text-[#145BA7] transition-transform duration-400 group-hover:rotate-45" />
        </div>
      </div>
    </Link>
  );
};

const FeaturedArticlesCarousel = () => {
  return (
    // Main container for articles with Kades padding
    <div className="flex flex-col gap-[24px] border-2 p-10 min-[1025px]:p-[58px]">
      {/* Aeryns Board */}
      <div className="border-1">
        <p>Aeryn</p>
      </div>

      {/* Lucas board*/}
      <div className="flex flex-col gap-[12px]">
        {/* Header row container */}
        <div className="[container-type:inline-size] flex flex-row items-center justify-between gap-[2cqw]">
          {/* Header Title Container */}
          <div className="flex w-full sm:w-auto">
            <p className="text-[max(22px,5cqw)] font-semibold text-[#005EAF] min-[1025px]:text-[max(24px,2.65cqw)]">
              Featured Articles
            </p>
          </div>

          {/* Header Arrows */}
          <div className="flex flex-row gap-[2cqw] sm:justify-center">
            <button className="cursor-pointer">
              <GoArrowLeft className="h-[max(34px,8cqw)] w-[max(34px,8cqw)] text-[#005EAF] min-[1025px]:h-[max(40px,4.25cqw)] min-[1025px]:w-[max(40px,4.25cqw)]" />
            </button>
            <button className="cursor-pointer">
              <GoArrowRight className="h-[max(34px,8cqw)] w-[max(34px,8cqw)] text-[#005EAF] min-[1025px]:h-[max(40px,4.25cqw)] min-[1025px]:w-[max(40px,4.25cqw)]" />
            </button>
          </div>
        </div>

        {/* Components container */}
        <div className="grid grid-cols-1 gap-[24px] min-[1025px]:grid-cols-3">
          {featuredArticles.slice(0, 3).map((item, index) => (
            <ArticleCard key={index} contentToDisplay={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticlesCarousel;
