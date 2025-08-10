'use client';

import React from "react";

type PrimaryButtonProps = {
  label: string;
  handleClick: () => void;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className="
        inline-flex h-[40px] px-8 bg-darkBlue rounded-2xl 
        items-center justify-center
        text-white text-lg cursor-pointer select-none
      "
    >
      <h1>{label}</h1>
    </div>
  );
};

export default PrimaryButton;