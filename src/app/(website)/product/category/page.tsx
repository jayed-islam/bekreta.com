import CategoryWiseProductFilterView from "@/sections/product/view/category-wise-product-view";
import React, { Suspense } from "react";

const CategoryBasedProductViewPage = () => {
  return (
    <Suspense>
      <CategoryWiseProductFilterView />
    </Suspense>
  );
};

export default CategoryBasedProductViewPage;
