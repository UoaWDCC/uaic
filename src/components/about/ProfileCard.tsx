"use client";
import Image from "next/image";
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
      <Image
        height={100}
        width={100}
        src={imageSrc}
        alt={name}
        className="rounded-full w-32 h-32 object-cover mb-2"
      />
      <p className="text-darkBlue font-bold">
        {name} | {title}
      </p>
      <p className="text-darkBlue text-body">{degree}</p>
    </div>
  );
};

export default ProfileCard;
