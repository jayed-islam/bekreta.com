import React from "react";
import ProductViewFeatured from "../product-view-featured";
import { IGetFeaturedProductResponse } from "@/types/products";
import { FaBoxOpen } from "react-icons/fa";

const FeaturedProductMainView = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/product/get-featured-single`,
    {
      cache: "no-cache",
    }
  );
  const data: IGetFeaturedProductResponse = await res.json();
  const hasFeaturedProduct = data?.data?.featuredProduct;
  return (
    <div>
      {hasFeaturedProduct ? (
        <ProductViewFeatured data={data} />
      ) : (
        <div className="flex flex-col justify-center items-center h-80 bg-gray-100 rounded-lg shadow-md mx-4 mt-10">
          <FaBoxOpen className="text-gray-400 text-6xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No Featured Product Available
          </h2>
          <p className="text-gray-500">
            Please check back later, or explore our other products.
          </p>
        </div>
      )}
    </div>
  );
};

export default FeaturedProductMainView;
