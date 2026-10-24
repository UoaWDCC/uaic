"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import RegistrationShell from "@/components/RegistrationShell";
import { TextInput } from "@/components/TextInput";
import { requestPasswordReset } from "@/lib/auth-client";

const SEND_ERROR = "We couldn't send the reset link. Check your connection and try again.";

// Better Auth answers 200 whether or not the email has an account, so an error
// here only ever means the request itself failed (network, rate limit, server)
// and showing it can't reveal which emails are registered.
const sendResetLink = async (email: string) => {
  try {
    const { error } = await requestPasswordReset(email);
    return !error;
  } catch {
    return false;
  }
};

const linkClasses = "text-primary hover:text-primary-light underline";

// Gradient pill that fades to white on hover, as on LoginForm. not-disabled
// rather than enabled so the same classes work on the Link version.
const pillClasses =
  "group relative flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-white text-[18px] font-medium text-white transition-colors duration-fast not-disabled:hover:text-primary disabled:cursor-not-allowed disabled:opacity-50";

const PillContent = ({ loading = false, children }: { loading?: boolean; children: ReactNode }) => (
  <>
    <span className="from-primary to-primary-light duration-fast absolute inset-0 rounded-full bg-linear-to-l transition-opacity group-not-disabled:group-hover:opacity-0" />
    {loading && (
      <span
        aria-hidden="true"
        className="z-dropdown relative size-5 animate-spin rounded-full border-2 border-current border-t-transparent"
      />
    )}
    <span className="z-dropdown relative">{children}</span>
  </>
);

const ErrorMessage = ({ children }: { children: ReactNode }) => (
  <p role="alert" className="text-destructive text-sm">
    {children}
  </p>
);

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    setError("");
    const trimmed = email.trim();
    if (await sendResetLink(trimmed)) setSentTo(trimmed);
    else setError(SEND_ERROR);
    setLoading(false);
  };

  if (sentTo) {
    return (
      <CheckEmail
        email={sentTo}
        onUseDifferentEmail={() => {
          setEmail("");
          setSentTo(null);
        }}
      />
    );
  }

  return (
    <RegistrationShell
      title="Forgot password?"
      onSubmit={handleSubmit}
      action={
        <div className="flex flex-col items-center gap-4">
          <button type="submit" disabled={loading} className={pillClasses}>
            <PillContent loading={loading}>
              {loading ? "Sending..." : "Send reset link"}
            </PillContent>
          </button>
          <Link href="/login" className={`${linkClasses} text-sm`}>
            Back to log in
          </Link>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <p id="forgot-password-hint" className="text-muted-foreground">
          Enter the email linked to your account and we&apos;ll send you a link to reset your
          password.
        </p>
        <TextInput
          type="email"
          name="email"
          autoComplete="email"
          aria-label="Email"
          aria-describedby="forgot-password-hint"
          placeholder="Email"
          value={email}
          onChange={setEmail}
          disabled={loading}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </RegistrationShell>
  );
}

function CheckEmail({
  email,
  onUseDifferentEmail,
}: {
  email: string;
  onUseDifferentEmail: () => void;
}) {
  const [resending, setResending] = useState(false);
  const [resendResult, setResendResult] = useState<"sent" | "failed" | null>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  // The form (and the focused button) just disappeared, so move focus to the
  // new message - screen readers read it out and keyboard users aren't dropped
  // back at the top of the page.
  useEffect(() => messageRef.current?.focus(), []);

  const handleResend = async () => {
    setResending(true);
    setResendResult(null);
    setResendResult((await sendResetLink(email)) ? "sent" : "failed");
    setResending(false);
  };

  return (
    <RegistrationShell title="Check your email">
      <div ref={messageRef} tabIndex={-1} className="text-muted-foreground outline-none">
        If an account exists for <strong className="text-ink font-semibold">{email}</strong>,
        we&apos;ve sent a link to reset your password.
      </div>

      <div className="mt-auto flex flex-col items-center gap-4 text-center text-sm">
        <Link href="/login" className={pillClasses}>
          <PillContent>Back to log in</PillContent>
        </Link>

        <p className="text-muted-foreground">
          Didn&apos;t get it? Check your spam folder or{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className={`${linkClasses} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {resending ? "Resending..." : "Resend email"}
          </button>
        </p>
        {resendResult === "sent" && (
          <p role="status" className="text-muted-foreground">
            We&apos;ve sent another link.
          </p>
        )}
        {resendResult === "failed" && <ErrorMessage>{SEND_ERROR}</ErrorMessage>}

        <button
          type="button"
          onClick={onUseDifferentEmail}
          className={`${linkClasses} cursor-pointer`}
        >
          Use a different email
        </button>
      </div>
    </RegistrationShell>
  );
}
