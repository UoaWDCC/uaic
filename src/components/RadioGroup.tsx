"use client";
import React, { useId } from "react";

export interface SelectOption {
  label: string;
  value: string;
  /** Greys out just this option, e.g. an activity that's full */
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  error?: string;
  /** Disables every option (and the "Other" text box) */
  disabled?: boolean;
  /** Option value that reveals a free-text box when picked, e.g. "other" */
  otherValue?: string;
  otherText?: string;
  onOtherTextChange?: (text: string) => void;
  otherPlaceholder?: string;
}

const RadioGroup = ({
  name,
  options,
  value,
  onChange,
  label,
  required = false,
  error,
  disabled = false,
  otherValue,
  otherText = "",
  onOtherTextChange,
  otherPlaceholder = "Please specify",
}: RadioGroupProps) => {
  const showOther = otherValue !== undefined && value === otherValue;

  const errorId = useId();

  // Moving off the "Other" option clears its text, so a parent can't end up
  // saving free text for an option that's no longer selected
  const handleChange = (next: string) => {
    if (otherValue !== undefined && value === otherValue && next !== otherValue) {
      onOtherTextChange?.("");
    }
    onChange(next);
  };

  return (
    <fieldset
      role="radiogroup"
      aria-required={required || undefined}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
      disabled={disabled}
      className="gap-tight flex w-full min-w-0 flex-col"
    >
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
          const isSelected = value === option.value;
          const isDisabled = disabled || option.disabled;

          return (
            <label
              key={option.value}
              className={`gap-cozy rounded-pill duration-fast relative flex w-full min-w-0 items-center border bg-white px-4 py-2 transition-colors ${
                error ? "border-destructive" : "border-border"
              } ${isDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-surface-faint cursor-pointer"}`}
            >
              {/* `required` on every radio sharing a name means "pick one" - the browser enforces it */}
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => handleChange(option.value)}
                required={required}
                aria-describedby={error ? errorId : undefined}
                disabled={isDisabled}
                className="peer sr-only"
              />
              <span
                className={`peer-focus-visible:ring-ring duration-fast flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 ${
                  error
                    ? "border-destructive"
                    : isSelected
                      ? "border-primary-light"
                      : "border-muted-foreground"
                }`}
              >
                {isSelected && <span className="bg-primary-light h-2.5 w-2.5 rounded-full" />}
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

        {/* TODO(#427): swap for the shared text input primitive once it lands -
            this is a stand-in styled to match Figma so the "Other" flow works now */}
        {showOther && (
          <input
            type="text"
            name={`${name}-other`}
            value={otherText}
            onChange={(e) => onOtherTextChange?.(e.target.value)}
            placeholder={otherPlaceholder}
            aria-label={`${label ?? "Other"} - please specify`}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={`rounded-pill text-body text-foreground placeholder:text-muted-foreground focus-visible:ring-ring w-full min-w-0 border bg-white px-4 py-2 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              error ? "border-destructive" : "border-border"
            }`}
          />
        )}
      </div>

      {error && (
        <p id={errorId} className="text-destructive text-sm">
          {error}
        </p>
      )}
    </fieldset>
  );
};

export default RadioGroup;
