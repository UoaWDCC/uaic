"use client";

import React, { useState } from "react";

type DropdownProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
};

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, ariaLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    if (option !== value) {
      onChange(option);
    }
    setIsOpen(false);
  };

  return (
    <div className="text-darkBlue relative block w-full text-sm font-light lg:text-base">
      {/* Expanding container */}
      <div
        className={`overflow-hidden rounded-2xl bg-white transition-[max-height] duration-500 ease-in-out ${isOpen ? "shadow-sm" : "shadow-none"} ${isOpen ? "max-h-[500px]" : "max-h-[44px] lg:max-h-[56px]"} `}
      >
        {/* Header */}
        <button
          type="button"
          aria-label={ariaLabel}
          aria-expanded={isOpen}
          className="flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-1 text-left lg:rounded-2xl lg:px-4 lg:py-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>{value}</span>
          <span className={`ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>

        {/* Options */}
        <div role="listbox" aria-label={ariaLabel} className="transition-opacity duration-200">
          {isOpen &&
            options.map((option, i) => (
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                key={option + i}
                onClick={() => handleSelect(option)}
                className={`hover:bg-lightBlue block w-full cursor-pointer px-4 py-2 text-left ${option === value ? "cursor-default text-gray-400" : ""} `}
              >
                {option}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
