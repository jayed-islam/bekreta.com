import React from "react";
import HomeBanner from "../home-banner";
import HomeFlashSaleView from "./home-flash-sale-product-view";
import HomeCategorySection from "./home-category-section-view";
import HomeProductsView from "./home-products-view";
import HomeHeaderCategoryView from "../home-header-category-view";

export const HomePageView = () => {
  return (
    <div>
      <HomeHeaderCategoryView />
      <HomeBanner />
      {/* <HomeFlashSaleView /> */}
      {/* <HomeCategorySection /> */}
      <HomeProductsView />
    </div>
  );
};
