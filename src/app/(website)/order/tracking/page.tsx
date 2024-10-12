import LoadingSpinner from "@/components/loader/global-loading";
import OrderStatusView from "@/sections/order/view/order-status-view";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <OrderStatusView />
    </Suspense>
  );
};

export default Page;
