import { GoArrowRight, GoArrowLeft, GoArrowUpRight } from "react-icons/go";
import Image from "next/image";

type FeaturedArticle = {
  image: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
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
  },
  {
    image: "/assets/bulletins/temparticlecard.png",
    category: "Category Name",
    title: "Exploring DCT Investing",
    description:
      "A look into how DCT, why investors use it, and how consistent investing can reduce impact of market fluctuations.",
    date: "Nov 24",
    readTime: "4 Min read",
  },
  {
    image: "/assets/bulletins/temparticlecard.png",
    category: "Category Name",
    title: "Exploring DCT Investing",
    description:
      "A look into how DCT, why investors use it, and how consistent investing can reduce impact of market fluctuations.",
    date: "Nov 24",
    readTime: "4 Min read",
  },
];

const ArticleCard = ({ contentToDisplay }: { contentToDisplay: FeaturedArticle }) => {
  return (
    <div className="overflow-hidden rounded-[16px] shadow-[0_10px_22px_rgba(0,0,0,0.25)]">
      <Image
        src={contentToDisplay.image}
        alt="Article Image"
        width={400}
        height={161}
        className="h-[161px] w-full"
      />
      <div className="flex flex-col gap-[8px] p-[24px]">
        <div className="w-[139px] rounded-[100px] bg-gradient-to-l from-[#005EAF] to-[#249AFF] px-[12px] py-[4px]">
          <p className="text-[16px] font-medium text-[#fff]">{contentToDisplay.category}</p>
        </div>
        <div className="flex flex-col gap-[4px]">
          <h2 className="text-[20px] font-semibold">{contentToDisplay.title}</h2>
          <p className="text-[16px] font-normal">{contentToDisplay.description}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-[8px] text-[16px] font-normal opacity-50">
            <p>{contentToDisplay.date}</p>
            <p>•</p>
            <p>{contentToDisplay.readTime}</p>
          </div>
          <GoArrowUpRight className="h-[29px] w-[29px] text-[#145BA7]" />
        </div>
      </div>
    </div>
  );
};

const FeaturedArticlesCarousel = () => {
  return (
    // Main container for articles with Kades padding
    <div className="flex flex-col gap-[24px] border-2 p-[96px]">
      {/* Aeryns Board */}
      <div className="border-1">
        <p>Aeryn</p>
      </div>

      {/* Lucas board*/}
      <div className="flex flex-col gap-[12px] border-1">
        {/* Header row container */}
        <div className="flex h-[72.5px] flex-row items-center justify-between border-1">
          {/* Header Title Container */}
          <div className="flex w-[486px] border-1">
            <p className="w-[251px] text-[32px] font-semibold text-[#005EAF]">Featured Articles</p>
          </div>

          {/* Header Arrows */}
          <div className="flex w-[145px] flex-row justify-center gap-4 border-1">
            <button>
              <GoArrowLeft className="h-[51.27px] w-[51.27px] text-[#005EAF]" />
            </button>
            <button>
              <GoArrowRight className="h-[51.27px] w-[51.27px] text-[#005EAF]" />
            </button>
          </div>
        </div>

        {/* Components container */}
        <div className="flex h-[373px] flex-row gap-[24px]">
          {featuredArticles.map((item, index) => (
            <ArticleCard key={index} contentToDisplay={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticlesCarousel;
