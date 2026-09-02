import { Suspense } from "react";
import Payment from "@/components/payment/Payment";

const PaymentPage = () => {
  return (
    <div className="min-h-screen pt-10">
      <Suspense>
        <Payment />
      </Suspense>
    </div>
  );
};

export default PaymentPage;
