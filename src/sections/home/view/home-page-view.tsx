// "use client";

import React from "react";
import HomeBanner from "../home-banner";
import HomeProductsView from "./home-product-view";
import HomeTopCategoryView from "../home-category-view";
// import { useGetHomeItemsQuery } from "@/redux/reducers/product/productApi";
import { IGetHomeItemProductListResponse, IProduct } from "@/types/products";

export const HomePageView = async () => {
  // const { data, isLoading } = useGetHomeItemsQuery();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/product/get-home-items`
  );
  const data: IGetHomeItemProductListResponse = await res.json();

  return (
    <div>
      <HomeTopCategoryView />
      {/* <HomeHeaderCategoryView /> */}
      <HomeBanner
        isLoading={false}
        offerItems={data?.data?.offerItems as IProduct[]}
      />
      {/* <HomeFlashSaleView /> 
   <HomeCategorySection /> */}
      <HomeProductsView
        isLoading={false}
        newItems={data?.data?.newItems as IProduct[]}
      />
    </div>
  );
};
