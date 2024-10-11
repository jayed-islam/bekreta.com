import ProductWithFilterView from "@/sections/product/view/product-with-filter-view";
import React, { Suspense } from "react";

const CategoryBasedProductViewPage = () => {
  return (
    <Suspense>
      <ProductWithFilterView />
    </Suspense>
  );
};

export default CategoryBasedProductViewPage;
