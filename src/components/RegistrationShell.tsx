"use client";

import { useRef, type FormEventHandler, type ReactNode } from "react";
import Link from "next/link";
import ArrowButton from "@/components/ArrowButton";

type RegistrationShellProps = {
  header?: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  title?: string;
  submitLabel?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

/** Shared registration layout; callers supply the header, fields, and action. */
export default function RegistrationShell({
  header,
  children,
  action,
  title = "Event Sign Up",
  submitLabel = "Complete Registration",
  onSubmit,
}: RegistrationShellProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="from-primary to-primary-light relative flex min-h-svh flex-col justify-center bg-gradient-to-l px-4 pt-28 pb-10 sm:px-6 sm:pb-28">
      <header className="absolute top-0 left-0 w-full px-6">
        <Link href="/" aria-label="UAIC home" className="inline-block">
          <div
            aria-hidden="true"
            className="m-0 h-[86px] w-[140px] bg-white mask-[url('/assets/logos/uaic.webp')] [mask-size:100%] mask-center mask-no-repeat lg:ml-10 lg:h-[100px]"
          />
        </Link>
      </header>

      <main className="text-ink shadow-card mx-auto flex min-h-[527px] w-full max-w-[544px] flex-col gap-[44px] rounded-lg border-[0.5px] border-slate-200 bg-white px-6 py-[28px] sm:px-8">
        <h1 className="text-[30px] leading-tight font-bold">{title}</h1>
        {header && <div className="border-border border-b pb-4">{header}</div>}
        <form
          ref={formRef}
          aria-label={title}
          className="flex flex-1 flex-col gap-[44px]"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(event);
          }}
        >
          {children}
          <div className="mt-auto w-full">
            {action ?? (
              <ArrowButton
                text={submitLabel}
                fullWidth
                onClick={() => formRef.current?.requestSubmit()}
              />
            )}
          </div>
          {/* Enables native Enter-key submission when multiple text fields are present. */}
          <button type="submit" hidden tabIndex={-1} aria-hidden="true" />
        </form>
      </main>
    </div>
  );
}
