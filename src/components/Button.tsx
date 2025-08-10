'use client';

// You can change the color variant of the button using the 'variant' prop
// This button component takes up the size of the parent container
// If there is no set height and width from the parent container, it resets to a default size

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  link?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  link,
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  const variantClasses = {
    primary: `
      bg-darkBlue text-white border-2 border-transparent
      hover:bg-white hover:text-darkBlue hover:border-darkBlue
    `,
    secondary: `
      bg-white text-darkBlue border-2 border-darkBlue
      hover:bg-darkBlue hover:text-white hover:border-transparent
    `,
  };

  const baseClasses = `
    inline-flex w-full h-full lg:w-[180px] lg:h-[50px] px-8 rounded-3xl
    items-center justify-center text-xl select-none
    cursor-pointer transition-colors duration-200
    ${variantClasses[variant]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

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