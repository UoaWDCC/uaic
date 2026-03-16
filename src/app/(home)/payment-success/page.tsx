import Link from "next/link";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ amount: string }>;
}) {
  const { amount } = await searchParams;

  return (
    <div className="pt-2">
      <div className="m-10 mx-auto max-w-6xl rounded-md border bg-gradient-to-tr from-[var(--babyBlue)] to-[var(--darkBlue)] p-10 text-center text-white">
        <h1 className="mt-10 text-center text-4xl font-extrabold">Payment Successful!</h1>
        <p className="mt-5 text-center text-lg">Thank you for your payment of ${amount}.</p>
        <div className="mt-10">
          <Link href="/">
            <button className="rounded-md bg-white px-6 py-3 font-bold text-[var(--babyBlue)] transition-all duration-200 hover:scale-[1.02] hover:opacity-90 active:opacity-80">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
