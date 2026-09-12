import React from "react";

type BulletinInfoCardProps = {
  title: string;
  icon: React.ReactNode;
  text: string;
};

const BulletinInfoCard: React.FC<BulletinInfoCardProps> = ({ title, icon, text }) => {
  return (
    <div className="flex flex-col gap-[7px]">
      <div className="text-5xl">{icon}</div>
      <h1 className="text-header font-bold">{title}</h1>
      <p className="text-body font-light">{text}</p>
    </div>
  );
};

export default BulletinInfoCard;
