import ProductWithFilterView from "@/sections/product/view/product-with-filter-view";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <ProductWithFilterView />
    </Suspense>
  );
};

export default Page;
