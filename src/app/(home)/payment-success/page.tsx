import Link from "next/link";

export default function PaymentSuccessPage({ searchParams }: { searchParams: { amount: string } }) {
  const { amount } = searchParams;

  return (
    <div className="pt-2">
    <div className="max-w-6xl mx-auto p-10 text-white text-center border rounded-md bg-gradient-to-tr from-[var(--babyBlue)] to-[var(--darkBlue)] m-10">
      <h1 className="text-4xl font-extrabold text-center mt-10">Payment Successful!</h1>
      <p className="text-center mt-5 text-lg">Thank you for your payment of ${amount}.</p>
      <div className="mt-10">
        <Link href="/">
        <button className="bg-white text-[var(--babyBlue)] px-6 py-3 rounded-md font-bold hover:scale-[1.02] hover:opacity-90 active:opacity-80 transition-all duration-200">
          Return to Home
        </button>
      </Link>

      </div>
    </div>
    </div>
  );
}
