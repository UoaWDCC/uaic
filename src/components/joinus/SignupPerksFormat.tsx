import React from "react";

type SignupPerksFormatProps = {
  title: string;
  icon: React.ReactNode;
  text: string;
};

const SignupPerksFormat: React.FC<SignupPerksFormatProps> = ({
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

export default SignupPerksFormat;
