import OrderStatusView from "@/sections/order/view/order-status-view";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <OrderStatusView />
    </Suspense>
  );
};

export default Page;
