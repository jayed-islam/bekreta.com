import React from "react";
import HomeheaderCategoryView from "../home-header-category-view";
import HomeBanner from "../home-banner";
import HomeFlashSaleView from "./home-flash-sale-product-view";
import HomeCategorySection from "./home-category-section-view";
import HomeProductsView from "./home-products-view";

export const HomePageView = () => {
  return (
    <div>
      <HomeheaderCategoryView />
      <HomeBanner />
      <HomeFlashSaleView />
      <HomeCategorySection />
      <HomeProductsView />
    </div>
  );
};
