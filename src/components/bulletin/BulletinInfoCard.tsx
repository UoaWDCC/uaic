import React from "react";
import Image from "next/image";

type BulletinInfoCardProps = {
  title: string;
  icon: React.ReactNode;
  text: string;
};

const BulletinInfoCard: React.FC<BulletinInfoCardProps> = ({
  title,
  icon,
  text,
}) => {
  return (
    <div
      className="
    flex flex-col gap-[7px]
    "
    >
      <div className="text-5xl">{icon}</div>
      <h1
        className="
        font-bold
        text-header
      "
      >
        {title}
      </h1>
      <p
        className="
        font-light text-body
      "
      >
        {text}
      </p>
    </div>
  );
};

export default BulletinInfoCard;
