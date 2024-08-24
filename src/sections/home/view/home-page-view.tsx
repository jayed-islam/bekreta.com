"use client";

import React from "react";
import HomeBanner from "../home-banner";
import HomeProductsView from "./home-product-view";
import HomeTopCategoryView from "../home-category-view";
import { useGetHomeItemsQuery } from "@/redux/reducers/product/productApi";
import { IProduct } from "@/types/products";

export const HomePageView = () => {
  const { data, isLoading } = useGetHomeItemsQuery();
  return (
    <div>
      <HomeTopCategoryView />
      {/* <HomeHeaderCategoryView /> */}
      <HomeBanner
        isLoading={isLoading}
        offerItems={data?.data?.offerItems as IProduct[]}
      />
      {/* <HomeFlashSaleView /> */}
      {/* <HomeCategorySection /> */}
      <HomeProductsView
        isLoading={isLoading}
        newItems={data?.data?.newItems as IProduct[]}
      />
    </div>
  );
};
