import React from "react";
import FeaturedProductHeader from "../featured-product-header";
import FeaturedTopHeader from "../featured-product-top-header";
import ProductViewFeatured from "../product-view-featured";

const FeaturedProduct = () => {
  return (
    <div>
      <FeaturedTopHeader />
      <FeaturedProductHeader />
      <ProductViewFeatured />
    </div>
  );
};

export default FeaturedProduct;
