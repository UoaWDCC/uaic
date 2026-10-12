"use client";
import React from "react";

export interface SelectOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  name: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  error?: string;
}

const RadioGroup = ({
  name,
  options,
  value,
  onChange,
  label,
  required = false,
  error,
}: RadioGroupProps) => {
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
          const isSelected = value === option.value;

          return (
            <label key={option.value} className="gap-tight flex cursor-pointer items-center">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <span
                className={`peer-focus-visible:ring-ring duration-fast flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 ${
                  error ? "border-destructive" : isSelected ? "border-primary" : "border-slate-300"
                }`}
              >
                {isSelected && <span className="bg-primary h-2.5 w-2.5 rounded-full" />}
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

export default RadioGroup;
