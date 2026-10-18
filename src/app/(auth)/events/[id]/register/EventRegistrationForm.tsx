"use client";

import type { ReactNode } from "react";
import RegistrationShell from "@/components/RegistrationShell";

// Client wrapper so the server page can hand RegistrationShell an onSubmit.
// The fields come from the event's signupForm blocks (#457), and saving the
// signup is wired up in #212.
export default function EventRegistrationForm({ header }: { header: ReactNode }) {
  return <RegistrationShell header={header} onSubmit={() => {}} />;
}
