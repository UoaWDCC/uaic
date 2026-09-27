//import React, { useState } from "react";
import EventEmail from "@/features/email/components/EventEmail";

export default function eventConfirmationPage() {
  return (
    <div className="from-primary to-primary-light flex min-h-screen flex-col justify-center bg-gradient-to-l py-12">
      <EventEmail />
    </div>
  );
}
