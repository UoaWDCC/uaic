import FAQPage from "@/features/faq/components/FAQPage";
import { getFAQs } from "@/features/faq/data/getFAQs";

export default async function FAQ() {
  const faqs = await getFAQs();

  return (
    <div className="min-h-[90vh] bg-[#F4F8FE]">
      <FAQPage faqs={faqs} />
    </div>
  );
}
