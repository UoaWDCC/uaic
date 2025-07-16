import React from "react";
import Image from "next/image";

type BulletinInfoCardProps = {
  title: string;
  imageSrc: string;
  text: string;
};

const BulletinInfoCard: React.FC<BulletinInfoCardProps> = ({
  title,
  imageSrc,
  text,
}) => {
  return (
    <div
      className="
    flex flex-col gap-[7px]
    "
    >
      <Image
        src={imageSrc}
        alt="Group Icon"
        width={50}
        height={50}
        className="w-[50px] h-[50px] mr-4"
      />
      <h1
        className="
        font-bold
        text-xl
      "
      >
        {title}
      </h1>
      <p
        className="
        font-light text-sm
      "
      >
        {text}
      </p>
    </div>
  );
};

export default BulletinInfoCard;
