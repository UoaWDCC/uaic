import FAQPage from "@/components/FAQPage";
import { getFAQs } from "@/features/users/data/getFAQs";

export default async function FAQ() {
  const faqs = await getFAQs();

  return (
    <div className="mt-[10em] min-h-[90vh] md:mt-[12em]">
      <FAQPage faqs={faqs} />
    </div>
  );
}
