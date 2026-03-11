import Dropdown from "@/components/Dropdown";
import ArticleListItem from "./ArticleListItem";
import { Bulletin, getBulletins } from "@/features/bulletins/data/getBulletins";

const ArticleList = async () => {
  // fetch bulletins server-side
  const bulletins: Bulletin[] = await getBulletins();

  return (
    <div className="flex w-full flex-col items-center gap-[20px] bg-[radial-gradient(circle_at_center,rgba(20,92,169,0.4)_10%,rgba(255,255,255,0.2)_80%)] pt-[50px] pb-[100px] lg:gap-[70px] lg:bg-[radial-gradient(circle_at_center,rgba(20,92,169,0.4)_10%,rgba(255,255,255,0.2)_60%)]">
      <h1 className="text-darkBlue font-[590] lg:text-2xl">All Articles</h1>
      {/* Dropdown Container */}
      <div className="relative z-10 grid h-[25px] w-[308px] grid-cols-2 gap-[27px] lg:w-[514px]">
        <Dropdown options={["2025", "2024", "2023", "2022"]} />
        <Dropdown options={["Latest", "Oldest"]} />
      </div>

      {/* Scrollable Article List Container */}
      <div className="article-scrollbar flex max-h-[280px] w-[308px] flex-col gap-[6px] overflow-y-auto rounded-xl pr-[8px] lg:max-h-[710px] lg:w-[802px] lg:gap-[13px]">
        {bulletins.map((bulletin) => (
          <ArticleListItem
            key={bulletin.id}
            issueNumber={bulletin.issueNumber}
            date={[
              new Date(bulletin.publishDate).getDate(),
              new Date(bulletin.publishDate).getMonth() + 1,
              new Date(bulletin.publishDate).getFullYear(),
            ]}
            // change this to an error page
            link={bulletin.bulletinPDF?.url || "#"}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
