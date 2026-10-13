"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

const INPUT_HEIGHT_CLASS = "h-[52px]";
const REQUIRED_MESSAGE = "Please select an option";

type DropdownProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  ariaLabel,
  placeholder,
  required = false,
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [validationFailed, setValidationFailed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const errorId = useId();
  const canClear = !required;
  const menuOptions = canClear ? ["", ...options.filter((option) => option !== "")] : options;
  const isMissing = required && validationFailed && (!value || !options.includes(value));
  const errorMessage = error || (isMissing ? REQUIRED_MESSAGE : undefined);
  const isInvalid = Boolean(errorMessage);
  const placeholderText = placeholder || "Select an option";

  useEffect(() => {
    if (!isOpen) return;

    const dismiss = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [isOpen]);

  const focusOption = (index: number) => {
    rootRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]')[index]?.focus();
  };

  useEffect(() => {
    if (isOpen) focusOption(Math.max(0, menuOptions.indexOf(value)));
    // Focus only on open; options/value changes must not steal focus mid-navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSelect = (option: string) => {
    setValidationFailed(false);
    if (option !== value) {
      onChange(option);
    }
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div
      ref={rootRef}
      className="text-ink relative block w-full text-base leading-[1.1] font-normal"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
      onKeyDown={(event) => {
        if (disabled) return;
        if (event.key === "Escape" && isOpen) {
          event.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
        }
        if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          return;
        }
        const buttons = Array.from(
          event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="option"]'),
        );
        if (!buttons.length) return;
        const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
        const next =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? buttons.length - 1
              : (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
        focusOption(next);
      }}
    >
      {/* Native form value + `required` check. The browser's popup is suppressed in
          onInvalid and the error is shown below the trigger instead, matching the
          other form primitives. Do not use hidden/display:none - a hidden control
          is skipped by constraint validation. */}
      <select
        value={value}
        required={required}
        disabled={disabled}
        tabIndex={-1}
        aria-label={`${ariaLabel} form value`}
        onChange={(event) => {
          setValidationFailed(false);
          onChange(event.target.value);
        }}
        onInvalid={(event) => {
          event.preventDefault();
          setValidationFailed(true);
          setIsOpen(false);
          // Suppressing the popup also stops the browser focusing the field, so
          // focus the trigger - but only for the form's first invalid control
          const firstInvalid = event.currentTarget.form?.querySelector(
            ":is(input, select, textarea):invalid",
          );
          if (!firstInvalid || firstInvalid === event.currentTarget) triggerRef.current?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
        className={`peer pointer-events-none absolute top-0 left-0 ${INPUT_HEIGHT_CLASS} w-full opacity-0`}
      >
        <option value="">{placeholderText}</option>
        {options.map((option, index) => (
          <option key={option + index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* Positioning context for the options panel, so it opens under the trigger
          rather than under the error message */}
      <div className={`relative ${isInvalid ? "" : "peer-focus:[&>button]:border-primary-light"}`}>
        {/* Trigger */}
        <button
          type="button"
          role="combobox"
          ref={triggerRef}
          aria-label={ariaLabel}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={isOpen ? listId : undefined}
          aria-required={required || undefined}
          aria-invalid={isInvalid || undefined}
          aria-describedby={errorMessage ? errorId : undefined}
          disabled={disabled}
          className={`focus-visible:outline-ring flex ${INPUT_HEIGHT_CLASS} duration-fast w-full items-center justify-between gap-2 rounded-[40px] border-[0.5px] px-4 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
            disabled
              ? "cursor-not-allowed border-neutral-200 bg-neutral-100"
              : `hover:bg-surface-faint cursor-pointer bg-white ${isInvalid ? "border-destructive" : `focus:border-primary-light ${isOpen ? "border-primary-light" : "border-slate-200"}`}`
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span
            className={`min-w-0 truncate ${disabled ? "text-neutral-400" : value ? "" : "text-placeholder-foreground"}`}
          >
            {value || placeholderText}
          </span>
          <GoArrowUpRight
            aria-hidden="true"
            className={`${disabled ? "text-neutral-400" : "text-primary"} h-6 w-6 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : "rotate-0"}`}
          />
        </button>

        {/* Options */}
        {isOpen && (
          <div
            id={listId}
            role="listbox"
            aria-label={ariaLabel}
            className="z-dropdown border-border absolute top-full mt-1 max-h-64 w-full overflow-y-auto rounded-xl border bg-white py-2 shadow-sm"
          >
            {menuOptions.map((option, i) => (
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                key={option + i}
                onClick={() => handleSelect(option)}
                className={`hover:bg-surface-faint focus-visible:bg-surface-faint block w-full cursor-pointer px-4 py-2 text-left break-words ${option === value ? "bg-surface-faint" : ""}`}
              >
                {canClear && option === "" ? "None" : option}
              </button>
            ))}
          </div>
        )}
      </div>

      {errorMessage && (
        <p id={errorId} className="text-destructive mt-2 text-sm">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
