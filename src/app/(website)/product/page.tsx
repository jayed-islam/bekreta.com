import LoadingSpinner from "@/components/loader/global-loading";
import ProductWithFilterView from "@/sections/product/view/product-with-filter-view";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductWithFilterView />
    </Suspense>
  );
};

export default Page;
