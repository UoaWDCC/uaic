"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

const INPUT_HEIGHT_CLASS = "h-[52px]";

type DropdownProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  placeholder?: string;
  required?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  ariaLabel,
  placeholder,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [validationFailed, setValidationFailed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const canClear = !required;
  const menuOptions = canClear ? ["", ...options.filter((option) => option !== "")] : options;
  const isInvalid = required && validationFailed && (!value || !options.includes(value));
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
      {/* Native validation needs a rendered, focusable form control. Keep this
          select aligned with the trigger so the browser anchors its popup here.
          It is excluded from normal tab navigation, but remains available when
          the browser focuses the invalid field. Do not use hidden/display:none. */}
      <select
        value={value}
        required={required}
        tabIndex={-1}
        aria-label={`${ariaLabel} form value`}
        onChange={(event) => {
          setValidationFailed(false);
          onChange(event.target.value);
        }}
        onInvalid={() => {
          setValidationFailed(true);
          setIsOpen(false);
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
      <div className="peer-focus:[&>button]:border-primary-light">
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
          className={`focus:border-primary-light focus-visible:outline-ring flex ${INPUT_HEIGHT_CLASS} w-full cursor-pointer items-center justify-between gap-2 rounded-[40px] border-[0.5px] bg-white px-4 py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 ${isOpen ? "border-primary-light" : "border-slate-200"}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={value ? undefined : "text-placeholder-foreground"}>
            {value || placeholderText}
          </span>
          <GoArrowUpRight
            aria-hidden="true"
            className={`text-primary h-6 w-6 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : "rotate-0"}`}
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
                className={`hover:bg-surface-faint focus-visible:bg-surface-faint block w-full cursor-pointer px-4 py-2 text-left ${option === value ? "bg-surface-faint" : ""}`}
              >
                {canClear && option === "" ? "None" : option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
