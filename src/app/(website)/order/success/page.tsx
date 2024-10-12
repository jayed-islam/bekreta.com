import LoadingSpinner from "@/components/loader/global-loading";
import dynamic from "next/dynamic";

// Dynamically import the component with SSR disabled
const OrderSuccessView = dynamic(
  () => import("@/sections/success/order-success-view"),
  { ssr: false } // Disable server-side rendering for this component
);
import React, { Suspense } from "react";

const SuccessPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <OrderSuccessView />
    </Suspense>
  );
};

export default SuccessPage;
