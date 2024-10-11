import ProductsSceleton from "@/components/skeleton/product-skeleton";
import React from "react";

const HomeProductSSRLoading = () => {
  return (
    <div className="pt-7 md:pt-16 pb-11 bg-gray-100">
      <div className="max-w-6xl mx-auto px-3 md:px-5 xl:px-0 pb-11">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-3 md:gap-x-5 gap-y-3 md:gap-y-5 ">
          {Array.from({ length: 8 }).map((item, idx) => (
            <ProductsSceleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeProductSSRLoading;
