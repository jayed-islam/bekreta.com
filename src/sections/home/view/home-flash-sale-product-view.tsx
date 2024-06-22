"use client";

import React, { useEffect, useState } from "react";
import Timer from "@/components/timer/timer";
import Link from "next/link";
import TimerMini from "@/components/timer/timer-mini";
import FlashSaleProductCard from "../common/flash-sale-product-card";
import ProductCard from "../../../layouts/common/product/product-card";
import ProductsSceleton from "@/components/skeleton/product-skeleton";
import FlashSaleProductSkeleton from "@/components/skeleton/flash-sale-product-skelaton";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { paths } from "@/layouts/paths";

const HomeFlashSaleView = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const endTime = "2023-07-25T19:59:59";

  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/shop/products?page=${page}&size=${size}`
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          if (data?.status === "success") {
            setProducts(data?.data);
            setCount(data?.count);
            setIsLoading(false);
          }
        } else {
          console.error("Failed to fetch products");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error while fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 pt-5 md:pt-11">
      <div className="max-w-7xl mx-auto hidden md:block">
        <div className="bg-white w-full py-2 px-3 lg:rounded-full flex items-start md:items-center justify-between  flex-col md:flex-row gap-5 lg:gap-0">
          <div className="flex items-start md:items-center gap-2 flex-col md:flex-row lg:gap-10 xl:gap-20">
            <h3 className="text-orange-600 font-semibold ">On Sale Now</h3>
            <div className="flex items-center gap-5">
              <h3 className="text-gray-700 hidden lg:block">Ending in:</h3>
              <Timer endTime={endTime} />
            </div>
          </div>
          <Link
            href="/products"
            className="py-1 px-3 border-2 rounded-full text-sm border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-200 ease-in transition-all"
          >
            SHOP MORE
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 md:gap-x-5 gap-y-3 md:gap-y-5 mt-5 px-3 ">
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5].map((card, i) => (
                <ProductsSceleton />
              ))}
            </>
          ) : (
            <>
              {products?.slice(10, 15).map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  index={index}
                  timerBoolean={true}
                  rootPath={paths.product.root}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="w-full md:hidden px-2.5">
        <div className="bg-white px-2 py-3 rounded-md">
          <div className="flex items-center justify-between w-full">
            <div>
              <h3 className="text-sm sm:text-lg font-semibold">Flash Sale</h3>
              <p className="text-[11px] sm:text-sm">
                Get 'em before they're gone
              </p>
            </div>
            <div className="border border-orange-600 rounded flex items-center justify-center text-xs text-orange-600 px-1">
              <p>Ends in:</p>
              <TimerMini />
              <Icon
                icon="solar:double-alt-arrow-right-linear"
                className="text-[12px]"
              />
            </div>
          </div>
          <div className="overflow-x-auto scrollbar-hide mt-5 w-full">
            <div className="flex py-2 gap-3">
              {isLoading ? (
                <>
                  {[1, 2, 3, 4, 5].map((card, i) => (
                    <FlashSaleProductSkeleton />
                  ))}
                </>
              ) : (
                <>
                  {products?.slice(10, 15).map((product, i) => (
                    <FlashSaleProductCard key={i} product={product} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFlashSaleView;
