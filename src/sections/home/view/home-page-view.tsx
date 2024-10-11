import React, { Suspense } from "react";
import HomeBanner from "../home-banner";
import HomeProductsView from "./home-product-view";
import HomeTopCategoryView from "../home-category-view";
import { IGetHomeItemProductListResponse, IProduct } from "@/types/products";
import HomeProductSSRLoading from "@/layouts/common/loading/home-product-ssr-loading";
import HomeCategorySSRLoading from "@/layouts/common/loading/home-category-ssr-loading";

export const HomePageView = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/product/get-home-items`,
    {
      cache: "no-cache",
    }
  );
  const data: IGetHomeItemProductListResponse = await res.json();

  return (
    <div>
      <Suspense fallback={<HomeCategorySSRLoading />}>
        <HomeTopCategoryView />
      </Suspense>
      {/* <HomeHeaderCategoryView /> */}
      <HomeBanner
        isLoading={false}
        offerItems={data?.data?.offerItems as IProduct[]}
      />
      {/* <HomeFlashSaleView /> 
   <HomeCategorySection /> */}
      {/* <HomeProductsView
        isLoading={false}
        newItems={data?.data?.newItems as IProduct[]}
      /> */}
      <Suspense fallback={<HomeProductSSRLoading />}>
        <HomeProductsView
          isLoading={false}
          newItems={data?.data?.newItems as IProduct[]}
        />
      </Suspense>
    </div>
  );
};
