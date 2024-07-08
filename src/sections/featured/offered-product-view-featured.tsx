import { useGetOfferetProductsQuery } from "@/redux/reducers/product/productApi";
import React from "react";
import OfferedProductCard from "./offered-product-card";

const OfferedProductViewFeatued = () => {
  const { data, isLoading } = useGetOfferetProductsQuery({});
  return (
    <div className="mt-11">
      <h2 className="text-xl md:text-2xl font-semibold">
        Some offered product for you.
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
        {data?.data.products.map((product, index) => (
          <OfferedProductCard product={product} size="sm" key={index} />
        ))}
      </div>
    </div>
  );
};

export default OfferedProductViewFeatued;
