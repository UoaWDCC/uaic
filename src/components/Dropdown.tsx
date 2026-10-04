"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

type DropdownProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  variant?: "default" | "input";
  placeholder?: string;
  error?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  ariaLabel,
  variant = "default",
  placeholder,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const errorId = useId();
  const isInput = variant === "input";

  useEffect(() => {
    if (!isInput || !isOpen) return;

    const dismiss = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [isInput, isOpen]);

  const focusOption = (index: number) => {
    rootRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]')[index]?.focus();
  };

  useEffect(() => {
    if (isInput && isOpen) focusOption(Math.max(0, options.indexOf(value)));
  }, [isInput, isOpen, options, value]);

  const handleSelect = (option: string) => {
    if (option !== value) {
      onChange(option);
    }
    setIsOpen(false);
    if (isInput) triggerRef.current?.focus();
  };

  return (
    <div
      ref={rootRef}
      className={`relative block w-full ${isInput ? "text-ink text-base leading-[1.1] font-normal" : "text-primary text-sm font-light lg:text-base"}`}
      onBlur={(event) => {
        if (!isInput) return;
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
      onKeyDown={(event) => {
        if (!isInput) return;
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
      {/* Expanding container */}
      <div
        className={
          isInput
            ? ""
            : `overflow-hidden rounded-2xl bg-white transition-[max-height] duration-500 ease-in-out ${isOpen ? "shadow-sm" : "shadow-none"} ${isOpen ? "max-h-[500px]" : "max-h-[44px] lg:max-h-[56px]"}`
        }
      >
        {/* Header */}
        <button
          type="button"
          role={isInput ? "combobox" : undefined}
          ref={triggerRef}
          aria-label={ariaLabel}
          aria-expanded={isOpen}
          aria-haspopup={isInput ? "listbox" : undefined}
          aria-controls={isInput && isOpen ? listId : undefined}
          aria-invalid={isInput && error ? true : undefined}
          aria-describedby={isInput && error ? errorId : undefined}
          className={
            isInput
              ? `focus-visible:outline-ring flex h-[52px] w-full cursor-pointer items-center justify-between gap-2 rounded-[40px] border-[0.5px] bg-white px-4 py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 ${error ? "border-destructive" : isOpen ? "border-primary-light" : "border-slate-200"}`
              : "flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-1 text-left lg:rounded-2xl lg:px-4 lg:py-2"
          }
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={isInput && !value ? "text-[#6B7A8D]" : undefined}>
            {isInput ? value || placeholder : value}
          </span>
          {isInput ? (
            <GoArrowUpRight
              aria-hidden="true"
              className={`text-primary h-6 w-6 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : "rotate-0"}`}
            />
          ) : (
            <span
              className={`duration-fast ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          )}
        </button>

        {/* Options */}
        {(!isInput || isOpen) && (
          <div
            id={isInput ? listId : undefined}
            role="listbox"
            aria-label={ariaLabel}
            className={
              isInput
                ? "z-dropdown border-border absolute top-full mt-1 max-h-64 w-full overflow-y-auto rounded-xl border bg-white py-2 shadow-sm"
                : "duration-fast transition-opacity"
            }
          >
            {isOpen &&
              options.map((option, i) => (
                <button
                  type="button"
                  role="option"
                  aria-selected={option === value}
                  key={option + i}
                  onClick={() => handleSelect(option)}
                  className={`hover:bg-surface-faint ${isInput ? "focus-visible:bg-surface-faint" : ""} block w-full cursor-pointer px-4 py-2 text-left ${option === value ? (isInput ? "bg-surface-faint" : "cursor-default text-gray-400") : ""}`}
                >
                  {option}
                </button>
              ))}
          </div>
        )}
      </div>
      {isInput && error && (
        <p id={errorId} className="text-destructive mt-2 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
