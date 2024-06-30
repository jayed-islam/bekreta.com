import React from "react";
import HomeBanner from "../home-banner";
import HomeProductsView from "./home-product-view";
import HomeTopCategoryView from "../home-category-view";

export const HomePageView = () => {
  return (
    <div>
      <HomeTopCategoryView />
      {/* <HomeHeaderCategoryView /> */}
      <HomeBanner />
      {/* <HomeFlashSaleView /> */}
      {/* <HomeCategorySection /> */}
      <HomeProductsView />
    </div>
  );
};
