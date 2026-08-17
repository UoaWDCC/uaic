import AllArticles from "@/components/bulletin/AllArticles";
import { getBulletins } from "@/features/bulletins/data/getBulletins";

const page = async () => {
  const bulletins = await getBulletins();

  return (
    <div className="flex w-full flex-col items-center">
      <AllArticles bulletins={bulletins} />
    </div>
  );
};

export default page;
