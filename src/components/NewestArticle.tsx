"use client";

const NewestArticle = () => {
  return (
    <div className="ps-5 pe-5 lg:ps-20 lg:pe-20">
      <p className="text-darkBlue text-2xl font-bold">Newest Articles</p>
      <div className="grid grid-cols-5 gap-10">
        <div className="col-span-3 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-500 ps-2 pt-100 pb-10">
          <div className="w-fit rounded-2xl bg-gradient-to-r from-[#44a6fc] to-sky-600 ps-2 pe-2 text-white hover:bg-gradient-to-r">
            Category Name
          </div>
          <p className="text-3xl text-white">
            Market Signals: Long-Term Investing vs Short-Term Prediction Markest
          </p>
        </div>
        <div className="">
          <h1>events</h1>
        </div>
      </div>
    </div>
  );
};

export default NewestArticle;
