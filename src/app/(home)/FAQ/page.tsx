import FAQPage from "@/features/faq/components/FAQPage";
import { getFAQs } from "@/features/faq/data/getFAQs";

export default async function FAQ() {
  const faqs = await getFAQs();

  return (
    <div className="bg-surface-faint min-h-[90vh]">
      <FAQPage faqs={faqs} />
    </div>
  );
}
