import Dropdown from "@/components/Dropdown";
import ArticleListItem from "./ArticleListItem";
import { getBulletins } from "@/features/bulletins/data/getBulletins";

const ArticleList = async () => {
  // fetch bulletins server-side
  const bulletins: Bulletin[] = await getBulletins();

  return (
    <div
      className="
        bg-[radial-gradient(circle_at_center,rgba(20,92,169,0.4)_10%,rgba(255,255,255,0.2)_80%)]
        lg:bg-[radial-gradient(circle_at_center,rgba(20,92,169,0.4)_10%,rgba(255,255,255,0.2)_60%)]
        flex flex-col items-center 
        w-full
        gap-[20px]
        pt-[50px] pb-[100px]
        lg:gap-[70px]
      "
    >
      <h1 className="text-darkBlue font-[590] lg:text-2xl">All Articles</h1>

      {/* Dropdown Container */}
      <div
        className="
          grid grid-cols-2 relative z-10
          w-[308px] h-[25px]
          gap-[27px]
          lg:w-[514px]
        "
      >
        <Dropdown options={["2025", "2024", "2023", "2022"]} />
        <Dropdown options={["Latest", "Oldest"]} />
      </div>

      {/* Scrollable Article List Container */}
      <div
        className="
          flex flex-col 
          overflow-y-auto article-scrollbar
          rounded-xl pr-[8px]
          w-[308px] max-h-[280px]  
          gap-[6px]
          lg:w-[802px] lg:max-h-[710px] 
          lg:gap-[13px]
        "
      >
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