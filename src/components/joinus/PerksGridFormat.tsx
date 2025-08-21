import React from "react";

type SignupPerksFormatProps = {
  title: string;
  icon: React.ReactNode;
  text: string;
};

const PerksGridFormat: React.FC<SignupPerksFormatProps> = ({
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
      <div className="text-3xl">{icon}</div>
      <h2
        className="
        font-bold
        text-header
      "
      >
        {title}
      </h2>
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

export default PerksGridFormat;
