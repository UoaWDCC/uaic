//import React, { useState } from "react";
import MembershipEmail from "@/features/email/components/MembershipEmail";
import EventEmail from "@/features/email/components/EventEmail";

export default function emailConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <MembershipEmail />
      <EventEmail />
    </div>
  );
}
