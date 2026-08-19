import PaymentSuccess from "./paymentSuccess";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ amount: string }>;
}) {
  const { amount } = await searchParams;

  return <PaymentSuccess amount={amount} />;
}
