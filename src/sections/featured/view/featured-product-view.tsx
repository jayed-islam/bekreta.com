import React from "react";
import FeaturedProductHeader from "../featured-product-header";
import FeaturedTopHeader from "../featured-product-top-header";
import ProductViewFeatured from "../product-view-featured";
import FeaturedProductFooter from "../featured-product-footer";

const FeaturedProduct = () => {
  return (
    <div>
      <FeaturedTopHeader />
      <FeaturedProductHeader />
      <ProductViewFeatured />
      <FeaturedProductFooter />
    </div>
  );
};

export default FeaturedProduct;
