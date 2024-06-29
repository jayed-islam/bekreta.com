"use client";

import ProductsSceleton from "@/components/skeleton/product-skeleton";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../layouts/common/product/product-card";
import { paths } from "@/layouts/paths";
import { useGetFeaturedProductsQuery } from "@/redux/reducers/product/productApi";

const HomeProductsView = () => {
  const cardsArray = Array.from({ length: 11 }, (_, index) => index);
  const { data, isFetching } = useGetFeaturedProductsQuery({});

  console.log("data", data);
  return (
    <div className="w-full bg-gray-100">
      <div className="flex flex-col items-center justify-center pt-7 md:pt-16 pb-7">
        <h3 className="text-2xl md:text-3xl font-bold text-center">
          Exclusive Items
        </h3>
        <p className="text-md md:text-lg text-center">
          Best collections for you. check it!!
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-3 md:px-5 xl:px-0 pb-11">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-3 md:gap-x-5 gap-y-3 md:gap-y-5 ">
          {isFetching ? (
            <>
              {cardsArray.map((card, index) => (
                <ProductsSceleton key={index} />
              ))}
            </>
          ) : (
            <>
              {data?.data?.products?.map((product, index) => (
                <ProductCard key={index} product={product} index={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeProductsView;
