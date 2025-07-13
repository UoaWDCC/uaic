"use client";
import React from "react";

interface ProfileCardProps {
  name: string;
  title: string;
  degree: string;
  imageSrc: string;
}

const ProfileCard = ({ name, title, degree, imageSrc }: ProfileCardProps) => {
  return (
    <div className="flex flex-col items-center text-center max-w-[160px]">
      <img
        src={imageSrc}
        alt={name}
        className="rounded-full w-32 h-32 object-cover mb-2"
      />
      <p className="text-[#145CA9] font-bold">{name} | {title}</p>
      <p className="text-[#145CA9] text-sm">{degree}</p>
    </div>
  );
};

export default ProfileCard;
