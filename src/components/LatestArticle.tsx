"use client";

import React from "react";
import Image from "next/image";

type LatestArticleProps = {
  issueNumber: number;
  imageSrc: string;
  title: string;
  description: string;
  pdfUrl: string;
};

const LatestArticle: React.FC<LatestArticleProps> = ({
  issueNumber,
  imageSrc,
  title,
  description,
  pdfUrl,
}) => {
  const readMoreFunction = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div
      className="
        w-full
        flex flex-col items-center gap-[47px]
        p-20
        bg-[radial-gradient(70%_70%_at_50%_55%,rgba(20,92,169,0.2)_60%,rgba(255,255,255,0.2)_80%)]
        lg:bg-[radial-gradient(70%_60%_at_50%_55%,rgba(20,92,169,0.4)_0%,rgba(255,255,255,0.2)_80%)]
      "
    >
      <h1 className="text-darkBlue font-[590] hidden text-xl lg:block lg:text-2xl">
        Latest Article
      </h1>

      <div className="bg-white rounded-4xl w-[330px] lg:w-[805px] h-auto lg:h-[423px] overflow-hidden">
        {/* Large screen layout: row with image + text */}
        <div className="hidden lg:flex lg:flex-row gap-[75px] p-7 text-darkBlue">
          {/* Image Container */}
          <div className="relative w-[259px] h-[366px] rounded-3xl overflow-hidden hidden lg:block">
            <Image
              src={imageSrc}
              alt="Article Cover"
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex-1 pt-6 pr-4">
            <h2 className="text-sm mb-2 font-light">Issue #{issueNumber}</h2>
            <h1 className="text-xl font-bold mb-4 leading-tight">{title}</h1>
            <p className="mb-6 text-darkBlue font-light">{description}</p>
            <button
              onClick={readMoreFunction}
              className="bg-darkBlue text-white px-4 py-1 w-[224px] h-[37px] rounded-xl"
            >
              Read More
            </button>
          </div>
        </div>

        {/* Small screen layout: vertical image background + gradient + text */}
        <div className="flex flex-col lg:hidden relative w-[330px] h-[561px] rounded-3xl overflow-hidden bg-white items-center gap-[14px]">
          {/* Title */}
          <h1 className="text-darkBlue text-xl font-bold lg:text-2xl mt-6">
            Latest Article
          </h1>

          {/* Content */}
          <div
            className="relative w-[295px] h-[417px] flex flex-col gap-[9px] p-6 bg-cover bg-center text-white justify-end rounded-3xl"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(20,92,169,1) 0%, rgba(20,92,169,1) 50%, rgba(255,255,255,0) 75%), url('${imageSrc}')`,
            }}
          >
            <h2 className="text-xs font-light">Issue #{issueNumber}</h2>
            <h1 className="font-bold text-sm leading-tight">{title}</h1>
            <p className="font-light text-xs">{description}</p>
          </div>

          {/* Button */}
          <button
            onClick={readMoreFunction}
            className="bg-darkBlue text-white px-4 py-1 w-[295px] h-[37px] rounded-xl hover:cursor-pointer"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestArticle;
