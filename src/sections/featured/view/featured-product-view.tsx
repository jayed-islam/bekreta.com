import React, { Suspense } from "react";
import FeaturedProductHeader from "../featured-product-header";
import FeaturedTopHeader from "../featured-product-top-header";
import FeaturedProductFooter from "../featured-product-footer";
import FeaturedProductMainView from "./featured-product-main-view";
import LoadingSpinner from "@/components/loader/global-loading";

const FeaturedProduct = async () => {
  return (
    <div>
      <FeaturedTopHeader />
      <FeaturedProductHeader />
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedProductMainView />
      </Suspense>
      <FeaturedProductFooter />
    </div>
  );
};

export default FeaturedProduct;
