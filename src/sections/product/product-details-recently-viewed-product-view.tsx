import React from "react";
import { useAppSelector } from "@/redux/hooks";
import SideProductCard from "./common/side-product-card";

interface Props {
  currentProductId: string;
}

const RecentlyViewedProductView: React.FC<Props> = ({ currentProductId }) => {
  console.log("current id", currentProductId);
  const { lastVisitedProducts } = useAppSelector((state) => state.product);

  // Filter out the current product from the recently viewed products
  const filteredProducts = lastVisitedProducts.filter(
    (product) => product.productId !== currentProductId
  );

  // If no products to show after filtering, return null (do not render the component)
  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-gray-100 p-2 rounded-lg mt-3">
      <h3 className="text-xl font-semibold text-green-700 text-center pb-3">
        Recently Viewed
      </h3>
      <div className="flex flex-col gap-3">
        {filteredProducts.map((product) => (
          <SideProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedProductView;
