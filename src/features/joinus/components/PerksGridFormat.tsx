import React from "react";

type SignupPerksFormatProps = {
  title: string;
  icon: React.ReactNode;
  text: string;
};

const PerksGridFormat: React.FC<SignupPerksFormatProps> = ({ title, icon, text }) => {
  return (
    <div className="flex flex-col gap-[7px]">
      <div className="text-3xl">{icon}</div>
      <h2 className="text-header font-bold">{title}</h2>
      <p className="text-body font-light">{text}</p>
    </div>
  );
};

export default PerksGridFormat;
