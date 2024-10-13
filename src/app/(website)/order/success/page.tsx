import OrderSuccessSSRLoading from "@/layouts/common/loading/order-success-ssr-loading";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the component with SSR disabled and show LoadingSpinner as a fallback
const OrderSuccessView = dynamic(
  () => import("@/sections/success/order-success-view"),
  {
    ssr: false,
    loading: () => <OrderSuccessSSRLoading />,
  }
);

const SuccessPage = () => {
  return <OrderSuccessView />;
};

export default SuccessPage;
