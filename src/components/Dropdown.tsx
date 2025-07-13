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
    <div
      className="
    relative block w-full 
    text-darkBlue font-light
    
    text-sm 
    
    lg:text-base"
    >
      {/* Expanding container */}
      <div
        className={`
          overflow-hidden 
          bg-white rounded-2xl
          transition-[max-height] duration-500 ease-in-out
          ${isOpen ? "shadow-sm" : "shadow-none"}
          ${isOpen ? "max-h-[500px]" : "max-h-[44px] lg:max-h-[56px]"}
        `}
      >
        {/* Header */}
        <div
          className="
          flex justify-between items-center 
          cursor-pointer 

          px-4 py-1 rounded-xl 
          
          lg:px-4 lg:py-2 lg:rounded-2xl"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>{selected}</span>
          <span
            className={`ml-2 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
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
                className={`px-4 py-2 cursor-pointer hover:bg-lightBlue 
                ${option === selected ? "text-gray-400 cursor-default" : ""}
                `}
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
