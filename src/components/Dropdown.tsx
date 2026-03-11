"use client";

import React, { useState } from "react";

type DropdownProps = {
  options: string[];
};

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    if (option !== selected) {
      setSelected(option);
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
        <div
          className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-1 lg:rounded-2xl lg:px-4 lg:py-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>{selected}</span>
          <span className={`ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
            ▼
          </span>
        </div>

        {/* Options */}
        <div className="transition-opacity duration-200">
          {isOpen &&
            options.map((option, i) => (
              <div
                key={option + i}
                onClick={() => handleSelect(option)}
                className={`hover:bg-lightBlue cursor-pointer px-4 py-2 ${option === selected ? "cursor-default text-gray-400" : ""} `}
              >
                {option}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
