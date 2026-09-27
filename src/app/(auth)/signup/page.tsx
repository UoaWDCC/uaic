import { Suspense } from "react";
import SignUpForm from "@/features/auth/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="from-primary to-primary-light flex min-h-screen flex-col justify-center bg-gradient-to-l py-12">
      <Suspense>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
