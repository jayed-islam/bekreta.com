import React, { Suspense } from "react";
import FeaturedProductMainView from "./featured-product-main-view";
import LoadingSpinner from "@/components/loader/global-loading";

const FeaturedProduct = async () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <FeaturedProductMainView />
    </Suspense>
  );
};

export default FeaturedProduct;
