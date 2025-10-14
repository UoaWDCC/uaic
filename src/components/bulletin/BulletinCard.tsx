import React from "react";

interface BulletinCardProps {
  issueNumber: number;
  title: string;
  description: string;
  imageSrc: string;
  pdfUrl: string;
}

const BulletinCard: React.FC<BulletinCardProps> = ({ issueNumber, title, description, imageSrc, pdfUrl}) => {
  return (
    <a
      className="relative w-[295px] h-[417px] flex flex-col gap-[9px] p-6 bg-cover bg-center text-white justify-end rounded-3xl"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(20,92,169,1) 0%, rgba(20,92,169,1) 50%, rgba(255,255,255,0) 75%), url('${imageSrc}')`,
      }}
      href={pdfUrl}
    >
      <h2 className="text-xs font-light">Issue #{issueNumber}</h2>
      <h1 className="font-bold text-sm leading-tight">{title}</h1>
      <p className="font-light text-xs">{description}</p>
    </a>
  );
};

export default BulletinCard;
