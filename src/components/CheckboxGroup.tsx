"use client";
import React from "react";
import { FiCheck } from "react-icons/fi";
import type { SelectOption } from "./RadioGroup";

interface CheckboxGroupProps {
  options: SelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  required?: boolean;
  error?: string;
}

const CheckboxGroup = ({
  options,
  value,
  onChange,
  label,
  required = false,
  error,
}: CheckboxGroupProps) => {
  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <fieldset className="gap-tight flex flex-col">
      {label && (
        <legend className="text-body text-foreground font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </legend>
      )}

      <div className="gap-tight flex flex-col">
        {options.map((option) => {
          const isSelected = value.includes(option.value);

          return (
            <label key={option.value} className="gap-tight flex cursor-pointer items-center">
              <input
                type="checkbox"
                value={option.value}
                checked={isSelected}
                onChange={() => toggleOption(option.value)}
                className="peer sr-only"
              />
              <span
                className={`peer-focus-visible:ring-ring duration-fast flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 ${
                  error
                    ? "border-destructive"
                    : isSelected
                      ? "border-primary bg-primary"
                      : "border-slate-300"
                }`}
              >
                {isSelected && <FiCheck size={12} className="text-white" strokeWidth={3} />}
              </span>
              <span className="text-body text-foreground">{option.label}</span>
            </label>
          );
        })}
      </div>

      {error && <p className="text-destructive text-sm">{error}</p>}
    </fieldset>
  );
};

export default CheckboxGroup;
