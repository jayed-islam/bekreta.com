"use client";

import ProductsSceleton from "@/components/skeleton/product-skeleton";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../layouts/common/product/product-card";
import { paths } from "@/layouts/paths";

const HomeProductsView = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const cardsArray = Array.from({ length: 10 }, (_, index) => index);

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
  }, [page, size]);
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
      <div className="max-w-6xl mx-auto px-3 md:px-5 xl:px-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-3 md:gap-x-5 gap-y-3 md:gap-y-5 ">
          {/* {isLoading ? (
            <>
              {cardsArray.map((card, index) => (
                <ProductsSceleton key={index} />
              ))}
            </>
          ) : (
            <> */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3].map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              index={index}
              rootPath={paths.product.root}
            />
          ))}
          {/* </>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default HomeProductsView;
