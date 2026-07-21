//import React, { useState } from "react";
import MembershipEmail from "@/components/MembershipEmail";
import EventEmail from "@/components/EventEmail";

export default function emailConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <MembershipEmail />
      <EventEmail />
    </div>
  );
}
