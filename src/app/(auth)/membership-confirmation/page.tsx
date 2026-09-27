//import React, { useState } from "react";
import MembershipEmail from "@/features/email/components/MembershipEmail";

export default function membershipConfirmationPage() {
  return (
    <div className="from-primary to-primary-light flex min-h-screen flex-col justify-center bg-gradient-to-l py-12">
      <MembershipEmail />
    </div>
  );
}
