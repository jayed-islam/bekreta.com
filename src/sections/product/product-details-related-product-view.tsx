import React, { useEffect } from "react";
import SideProductCard from "./common/side-product-card";
import { useGetCategoryWiseProductQuery } from "@/redux/reducers/product/productApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import RecentViewedProductCard from "./common/recent-viewed-product-card";
import { CartItem } from "@/types/cart";
import { setLastVisitedProducts } from "@/redux/reducers/product/productSlice";

interface Props {
  category: string;
}

const RelatedProductsSection: React.FC<Props> = ({ category }) => {
  const { data, isLoading } = useGetCategoryWiseProductQuery({ category });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadLastVisitedProducts = (): CartItem[] => {
      const storedProducts = localStorage.getItem("lastVisitedProducts");
      return storedProducts ? JSON.parse(storedProducts) : [];
    };

    const lastVisitedProducts = loadLastVisitedProducts();
    dispatch(setLastVisitedProducts(lastVisitedProducts));
  }, [dispatch]);

  const { lastVisitedProducts } = useAppSelector((state) => state.product);

  return (
    <div className="w-full lg:w-[301px] mt-5 lg:mt-0">
      <div className=" bg-white py-5 px-5">
        <h3 className="text-xl border-t pt-3 font-semibold text-green-700 text-center pb-5 uppercase">
          Related Products
        </h3>

        {isLoading
          ? [1, 2, 3].map((i) => (
              <div className="animate-pulse flex space-x-4">
                <div className=" bg-slate-200 h-20 w-20 rounded-lg border"></div>
                <div className="flex-1">
                  <div className="h-3 bg-slate-200 rounded"></div>
                  <div className="space-y-2 mt-3">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    <div className="h-3 w-20 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          : data?.data.map((product) => <SideProductCard product={product} />)}
      </div>

      <div className=" bg-white py-5 px-5 mt-5">
        <h3 className="text-xl font-semibold text-green-700 text-center pb-5">
          Recently Viewed
        </h3>
        {lastVisitedProducts.map((product, index) => (
          <RecentViewedProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsSection;
