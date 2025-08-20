import Dropdown from "@/components/Dropdown";
import ArticleListItem from "./ArticleListItem";

const ArticleList: React.FC = () => {
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
      <h1
        className="
        text-darkBlue 
        font-[590] 
        
        lg:text-2xl
      "
      >
        All Articles
      </h1>
      {/* Dropdown Container */}
      <div
        className="
        grid grid-cols-2 relative z-10

        w-[308px] h-[25px]
        gap-[27px]
        
        lg:w-[514]"
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
        <ArticleListItem
          issueNumber={84}
          date={[8, 7, 2025]}
          link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
        <ArticleListItem
          issueNumber={83}
          date={[1, 6, 2025]}
          link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
        <ArticleListItem
          issueNumber={82}
          date={[25, 5, 2025]}
          link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
        <ArticleListItem
          issueNumber={81}
          date={[10, 4, 2025]}
          link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
        <ArticleListItem
          issueNumber={80}
          date={[15, 3, 2025]}
          link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
        <ArticleListItem
          issueNumber={79}
          date={[20, 2, 2025]}
          link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
        <ArticleListItem
          issueNumber={78}
          date={[5, 1, 2025]}
          link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
        <ArticleListItem
          issueNumber={77}
          date={[30, 12, 2024]}
          link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
      </div>
    </div>
  );
};

export default ArticleList;
