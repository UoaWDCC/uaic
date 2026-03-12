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
    <div className="flex max-w-[160px] flex-col items-center text-center">
      <Image
        height={100}
        width={100}
        src={imageSrc}
        alt={name}
        className="mb-2 h-32 w-32 rounded-full object-cover"
      />
      <p className="text-darkBlue font-bold">
        {name} | {title}
      </p>
      <p className="text-darkBlue text-body">{degree}</p>
    </div>
  );
};

export default ProfileCard;
