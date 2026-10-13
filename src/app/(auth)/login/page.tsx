import LoginForm from "@/features/auth/components/LoginForm";
import { safeRedirectPath } from "@/lib/safeRedirect";

// `?redirect=` sends the user back where they came from after signing in
// (e.g. an event's registration page).
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>;
}) {
  const redirectTo = safeRedirectPath((await searchParams).redirect);

  return (
    <div className="from-primary to-primary-light flex min-h-screen flex-col justify-center bg-gradient-to-l py-12">
      <LoginForm redirectTo={redirectTo} />
    </div>
  );
}
