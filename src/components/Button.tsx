"use client";

// You can change the color variant of the button using the 'variant' prop
// This button component takes up the size of the parent container
// If there is no set height and width from the parent container, it resets to a default size (using defaultSize prop)
// Use defaultSize prop, if you wish to use default size without a parent container

import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  link?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
  defaultSize?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  link,
  variant = "primary",
  disabled = false,
  className = "",
  defaultSize = false,
}) => {
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-[#44a6fc] to-sky-600 text-white
      hover:bg-gradient-to-r hover:from-[#8bc7fc] hover:to-sky-400
    `,
    secondary: `
      bg-white text-darkBlue border-2 border-darkBlue
      hover:bg-darkBlue hover:text-white hover:border-transparent
    `,
  };

  // Size classes switch based on defaultSize prop
  const sizeClasses = defaultSize
    ? "lg:w-[180px] h-[50px]"
    : "w-full h-full lg:w-[100px] lg:h-[35px]";

  const baseClasses = `
    inline-flex ${sizeClasses} rounded-full
    items-center justify-center text-lg select-none
    cursor-pointer transition-colors duration-200
    ${variantClasses[variant]}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick();
  };

  if (link) {
    return (
      <Link href={link} className={baseClasses} onClick={handleClick}>
        <h1>{children}</h1>
      </Link>
    );
  }

  return (
    <div className={baseClasses} onClick={handleClick}>
      <h1>{children}</h1>
    </div>
  );
};

export default Button;
