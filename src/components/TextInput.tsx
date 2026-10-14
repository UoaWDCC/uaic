"use client";
import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";

// Shared by both primitives. Native attributes (name, type, autoComplete,
// maxLength, rows, aria-label, ...) pass straight through to the element.
interface FieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  /** Greyed out, not focusable, and left out of form submission */
  disabled?: boolean;
  /** Greyed out and can't be edited, but still focusable, copyable and submitted -
      e.g. a name prefilled from the member's account */
  readOnly?: boolean;
}

type TextInputProps = FieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof FieldProps>;

type TextAreaProps = FieldProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof FieldProps>;

// The two primitives differ only in shape (pill vs rounded box), so the
// border/colour states live here once. They go on a wrapper box rather than
// the element itself, so the overflow fade on TextInput only fades the text,
// never the border.
const boxStateClasses = (error: string | undefined, locked: boolean) =>
  locked
    ? "cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-400"
    : `bg-white text-ink hover:bg-surface-faint ${
        error ? "border-destructive" : "border-slate-200 focus-within:border-primary-light"
      }`;

const boxClasses =
  "flex w-full min-w-0 border-[0.5px] transition-colors duration-fast has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring";

const fieldClasses = (locked: boolean) =>
  `w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted-foreground ${
    locked ? "cursor-not-allowed placeholder:text-neutral-400" : ""
  }`;

const FADE_WIDTH = "48px";

// Tracks whether a single-line input has hidden text off either edge, so it
// can fade that edge. Native listeners (not React props) so a caller's own
// onScroll/onBlur/... passed through `rest` are never overridden.
const useOverflowFade = (ref: React.RefObject<HTMLInputElement | null>, value: string) => {
  const [fade, setFade] = useState({ left: false, right: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft > 1;
    const right = el.scrollLeft < max - 1;
    setFade((prev) => (prev.left === left && prev.right === right ? prev : { left, right }));
  }, [ref]);

  useLayoutEffect(update, [value, update]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Caret moves and clicks scroll the input after the event, so measure next frame
    const schedule = () => requestAnimationFrame(update);
    const events = ["scroll", "input", "keyup", "select", "selectionchange", "focus", "blur"];
    events.forEach((name) => el.addEventListener(name, schedule));
    const resize = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(update);
    resize?.observe(el);
    return () => {
      events.forEach((name) => el.removeEventListener(name, schedule));
      resize?.disconnect();
    };
  }, [ref, update]);

  if (!fade.left && !fade.right) return undefined;
  const mask = `linear-gradient(to right, ${fade.left ? "transparent" : "#000"}, #000 ${
    fade.left ? FADE_WIDTH : "0px"
  }, #000 calc(100% - ${fade.right ? FADE_WIDTH : "0px"}), ${fade.right ? "transparent" : "#000"})`;
  return { maskImage: mask, WebkitMaskImage: mask };
};

interface FieldShellProps {
  id: string;
  errorId: string;
  label?: string;
  required: boolean;
  error?: string;
  children: React.ReactNode;
}

const FieldShell = ({ id, errorId, label, required, error, children }: FieldShellProps) => (
  <div className="gap-tight flex w-full min-w-0 flex-col">
    {label && (
      <label htmlFor={id} className="text-body text-ink font-medium">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-destructive ml-0.5">
              *
            </span>{" "}
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>
    )}
    {children}
    {error && (
      <p id={errorId} className="text-destructive text-sm">
        {error}
      </p>
    )}
  </div>
);

const REQUIRED_MESSAGE = "Please fill out this field";

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

// Builds the attributes and handlers both elements share, so the a11y and
// validation wiring can't drift between them
const useField = <T extends FieldElement>({
  id: idProp,
  value,
  onChange,
  onInvalid,
  required,
  error,
  disabled,
  readOnly,
  describedBy,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onInvalid?: React.FormEventHandler<T>;
  required: boolean;
  error?: string;
  disabled: boolean;
  readOnly: boolean;
  describedBy?: string;
}) => {
  const generatedId = useId();
  const errorId = useId();
  const id = idProp ?? generatedId;
  // Message from the browser's own check (required, type="email", minLength, ...),
  // stored with the value that failed and shown only while the value is unchanged -
  // so it clears whether the user types or the parent sets the value (prefill,
  // reset). A caller's `error` always wins.
  const [nativeError, setNativeError] = useState<{ message: string; value: string } | null>(null);
  const errorMessage =
    error || (nativeError?.value === value ? nativeError.message : undefined) || undefined;
  const describedByIds = [describedBy, errorMessage ? errorId : undefined]
    .filter(Boolean)
    .join(" ");

  return {
    id,
    errorId,
    errorMessage,
    locked: disabled || readOnly,
    attrs: {
      id,
      required,
      disabled,
      readOnly,
      "aria-invalid": errorMessage ? true : undefined,
      "aria-describedby": describedByIds || undefined,
      onChange: (e: React.ChangeEvent<T>) => onChange(e.target.value),
      onInvalid: (e: React.FormEvent<T>) => {
        onInvalid?.(e);
        // Suppress the browser popup and show the message under the field
        // instead, matching the other form primitives
        e.preventDefault();
        const field = e.currentTarget;
        setNativeError({
          message: field.validity.valueMissing ? REQUIRED_MESSAGE : field.validationMessage,
          value: field.value,
        });
        // Suppressing the popup also stops the browser focusing the field, so
        // focus it - but only for the form's first invalid control
        const firstInvalid = field.form?.querySelector(":is(input, select, textarea):invalid");
        if (!firstInvalid || firstInvalid === field) field.focus();
      },
    },
  };
};

export const TextInput = ({
  value,
  onChange,
  label,
  placeholder,
  required = false,
  error,
  disabled = false,
  readOnly = false,
  type = "text",
  className = "",
  "aria-describedby": describedBy,
  onInvalid,
  ...rest
}: TextInputProps) => {
  const { id, errorId, errorMessage, locked, attrs } = useField({
    id: rest.id,
    value,
    onChange,
    onInvalid,
    required,
    error,
    disabled,
    readOnly,
    describedBy,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const fadeStyle = useOverflowFade(inputRef, value);

  return (
    <FieldShell id={id} errorId={errorId} label={label} required={required} error={errorMessage}>
      <div
        className={`${boxClasses} rounded-pill h-[52px] px-4 ${boxStateClasses(errorMessage, locked)} ${className}`}
      >
        <input
          {...rest}
          {...attrs}
          ref={inputRef}
          type={type}
          value={value}
          placeholder={placeholder}
          style={{ ...rest.style, ...fadeStyle }}
          className={`${fieldClasses(locked)} h-full`}
        />
      </div>
    </FieldShell>
  );
};

export const TextArea = ({
  value,
  onChange,
  label,
  placeholder,
  required = false,
  error,
  disabled = false,
  readOnly = false,
  // Height comes from rows (6 = about 168px at text-base), so callers can size it
  rows = 6,
  className = "",
  "aria-describedby": describedBy,
  onInvalid,
  ...rest
}: TextAreaProps) => {
  const { id, errorId, errorMessage, locked, attrs } = useField({
    id: rest.id,
    value,
    onChange,
    onInvalid,
    required,
    error,
    disabled,
    readOnly,
    describedBy,
  });

  return (
    <FieldShell id={id} errorId={errorId} label={label} required={required} error={errorMessage}>
      <div
        className={`${boxClasses} rounded-lg ${boxStateClasses(errorMessage, locked)} ${className}`}
      >
        <textarea
          {...rest}
          {...attrs}
          rows={rows}
          value={value}
          placeholder={placeholder}
          // Vertical resize only, so a user can't drag it wider than the form.
          // Padding and radius sit on the textarea (not the box) so the resize
          // handle lands in the box's actual corner.
          className={`${fieldClasses(locked)} resize-y rounded-lg px-4 py-3`}
        />
      </div>
    </FieldShell>
  );
};

export default TextInput;
