import { getBulletins } from "@/features/bulletins/data/getBulletins";
import type { Bulletin } from "@/features/bulletins/data/getBulletins";
import FilterableArticleList from "./FilterableArticleList";

const ArticleList = async () => {
  // fetch bulletins server-side
  const bulletins: Bulletin[] = await getBulletins();

  return (
    <div className="flex w-full flex-col items-center gap-[20px] bg-[radial-gradient(circle_at_center,rgba(20,92,169,0.4)_10%,rgba(255,255,255,0.2)_80%)] pt-[50px] pb-[100px] lg:gap-[70px] lg:bg-[radial-gradient(circle_at_center,rgba(20,92,169,0.4)_10%,rgba(255,255,255,0.2)_60%)]">
      <h1 className="text-darkBlue font-[590] lg:text-2xl">All Articles</h1>
      <FilterableArticleList bulletins={bulletins} />
    </div>
  );
};

export default ArticleList;
