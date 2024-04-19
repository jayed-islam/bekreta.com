import ProductsSceleton from "@/components/skeleton/product-skeleton";
import React, { useEffect, useState } from "react";
import ProductCard from "../common/product-card";

const BestSellerProductTab = () => {
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
    <div className="w-full bg-gray-100 ">
      <div className="max-w-7xl mx-auto px-3 xl:px-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 md:gap-x-5 gap-y-3 md:gap-y-5 ">
          {isLoading ? (
            <>
              {cardsArray.map((card, index) => (
                <ProductsSceleton key={index} />
              ))}
            </>
          ) : (
            <>
              {products?.slice(19, 30).map((product, index) => (
                <ProductCard key={index} product={product} index={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSellerProductTab;
