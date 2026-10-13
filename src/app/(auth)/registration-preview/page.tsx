import { notFound } from "next/navigation";
import RegistrationPreview from "./RegistrationPreview";

// Temporary visual preview while the #430 design is being assembled.
export default function RegistrationPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return <RegistrationPreview />;
}
