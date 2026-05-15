import { GoArrowRight, GoArrowLeft } from "react-icons/go";

type FeaturedArticle = {
  title: string;
  category: string;
  description: string;
  date: string;
  readTime: string;
};

const featuredArticles: FeaturedArticle[] = [
  {
    title: "Exploring DCT Investing",
    category: "Category Name",
    description:
      "A look into how DCT, why investors use it, and how consistent investing can reduce impact of market fluctuations.",
    date: "Nov 24",
    readTime: "4 Min read",
  },
  {
    title: "Exploring DCT Investing",
    category: "Category Name",
    description:
      "A look into how DCT, why investors use it, and how consistent investing can reduce impact of market fluctuations.",
    date: "Nov 24",
    readTime: "4 Min read",
  },
  {
    title: "Exploring DCT Investing",
    category: "Category Name",
    description:
      "A look into how DCT, why investors use it, and how consistent investing can reduce impact of market fluctuations.",
    date: "Nov 24",
    readTime: "4 Min read",
  },
];

const ArticleCard = ({ contentToDisplay }: { contentToDisplay: FeaturedArticle }) => {
  return (
    <div className="h-full flex-1 rounded-[10px] border-1 p-4">
      <p>{contentToDisplay.category}</p>
      <h3>{contentToDisplay.title}</h3>
      <p>{contentToDisplay.description}</p>
      <p>
        {contentToDisplay.date} • {contentToDisplay.readTime}
      </p>
    </div>
  );
};

const FeaturedArticlesCarousel = () => {
  return (
    // Main container for articles with Kades padding
    <div className="flex flex-col gap-[24px] border-2 p-[98px]">
      {/* Aeryns Board */}
      <div className="border-2">
        <p>Aeryn</p>
      </div>

      {/* Lucas board*/}
      <div className="border-2">
        {/* Header row container */}
        <div className="flex h-[72.5px] flex-row items-center justify-between border-1">
          {/* Header Title Container */}
          <div className="flex h-[35px] w-[486px] items-center">
            <p className="w-[251px] text-[32px] font-semibold text-[#005EAF]">Featured Articles</p>
          </div>

          {/* Header Arrows */}
          <div className="flex w-[145px] flex-row justify-center gap-4">
            <button>
              <GoArrowLeft className="h-[51.27px] w-[51.27px] text-[#005EAF]" />
            </button>
            <button>
              <GoArrowRight className="h-[51.27px] w-[51.27px] text-[#005EAF]" />
            </button>
          </div>
        </div>

        {/* Components container */}
        <div className="flex h-[373px] flex-row gap-[16px] border-1">
          {featuredArticles.map((item, index) => (
            <ArticleCard key={index} contentToDisplay={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticlesCarousel;
