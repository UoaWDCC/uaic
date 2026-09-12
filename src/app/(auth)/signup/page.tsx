import { Suspense } from "react";
import SignUpForm from "@/features/auth/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-l from-[#005eaf] to-[#249AFF] py-12">
      <Suspense>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
