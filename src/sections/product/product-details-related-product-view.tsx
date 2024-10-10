import React, { useEffect } from "react";
import SideProductCard from "./common/side-product-card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import RecentViewedProductCard from "./common/recent-viewed-product-card";
import { CartItem } from "@/types/cart";
import { setLastVisitedProducts } from "@/redux/reducers/product/productSlice";
import { IProduct } from "@/types/products";

interface Props {
  relatedProducts: IProduct[];
  currentProductId: string;
}

const RelatedProductsSection: React.FC<Props> = ({
  relatedProducts,
  currentProductId,
}) => {
  const dispatch = useAppDispatch();

  const { lastVisitedProducts } = useAppSelector((state) => state.product);

  return (
    <div className="w-full">
      {relatedProducts.length > 0 ? (
        <>
          <div className=" bg-white py-5 px-5">
            <h3 className="text-xl border-t pt-3 font-semibold text-green-700 text-center pb-5 uppercase">
              Related Products
            </h3>
            {relatedProducts?.map((product) => (
              <SideProductCard product={product} />
            ))}
          </div>
        </>
      ) : null}

      {lastVisitedProducts.length === 0 ? null : (
        <div
          className={` bg-white py-5 px-5 ${
            relatedProducts.length > 0 ? "mt-5" : ""
          }`}
        >
          <h3 className="text-xl font-semibold text-green-700 text-center pb-5">
            Recently Viewed
          </h3>
          {lastVisitedProducts
            .filter((product) => product.productId !== currentProductId)
            .map((product) => (
              <RecentViewedProductCard
                key={product.productId}
                product={product}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default RelatedProductsSection;
