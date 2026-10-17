"use client";
import React, { useId } from "react";
import { FiCheck } from "react-icons/fi";
import type { SelectOption } from "./RadioGroup";

interface CheckboxGroupProps {
  name?: string;
  options: SelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  required?: boolean;
  error?: string;
  /** Disables every option (and the "Other" text box) */
  disabled?: boolean;
}

const CheckboxGroup = ({
  name,
  options,
  value,
  onChange,
  label,
  required = false,
  error,
  disabled = false,
}: CheckboxGroupProps) => {
  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const errorId = useId();

  return (
    <fieldset disabled={disabled} className="gap-tight flex w-full min-w-0 flex-col">
      {label && (
        <legend className="text-body text-ink mb-tight font-medium">
          {label}
          {required && (
            <>
              <span aria-hidden="true" className="text-destructive ml-0.5">
                *
              </span>{" "}
              <span className="sr-only">(required)</span>
            </>
          )}
        </legend>
      )}

      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = value.includes(option.value);
          const isDisabled = disabled || option.disabled;

          return (
            <label
              key={option.value}
              className={`gap-cozy rounded-pill duration-fast relative flex w-full min-w-0 items-center border bg-white px-4 py-2 transition-colors ${
                error ? "border-destructive" : "border-border"
              } ${isDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-surface-faint cursor-pointer"}`}
            >
              {/* No native `required` here - on a checkbox it means "this box must be ticked",
                  not "tick at least one", so that check belongs in the form's validation */}
              <input
                type="checkbox"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => toggleOption(option.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                disabled={isDisabled}
                className="peer sr-only"
              />
              <span
                className={`peer-focus-visible:ring-ring duration-fast flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 ${
                  error
                    ? "border-destructive"
                    : isSelected
                      ? "border-primary-light bg-primary-light"
                      : "border-muted-foreground"
                }`}
              >
                {isSelected && <FiCheck size={12} className="text-white" strokeWidth={3} />}
              </span>
              <span
                className={`text-body min-w-0 break-words ${
                  isSelected ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>

      {error && (
        <p id={errorId} className="text-destructive text-sm">
          {error}
        </p>
      )}
    </fieldset>
  );
};

export default CheckboxGroup;
