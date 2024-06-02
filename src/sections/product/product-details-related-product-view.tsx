import { paths } from "@/layouts/paths";
import { IProductItem } from "@/types/products";
import Link from "next/link";
import React from "react";
import tShart from "../../../../public/assets/images/category/t-shart.jpg";
import SideProductCard from "./common/side-product-card";

interface Props {
  relatedProducts: IProductItem[];
  recentItems: IProductItem[];
  addRecentView?: (product: IProductItem) => void;
}

const RelatedProductsSection: React.FC<Props> = ({
  relatedProducts,
  recentItems,
  addRecentView,
}) => {
  return (
    <div className="w-full lg:w-[301px] mt-5 lg:mt-0">
      <div className=" bg-white py-5 px-5">
        <h3 className="text-xl border-t pt-3 font-semibold text-green-700 text-center pb-5 uppercase">
          Related Products
        </h3>
        {[1, 2, 3].slice(0, 3).map((product) => (
          <SideProductCard />
        ))}
      </div>

      <div className=" bg-white py-5 px-5 mt-5">
        <h3 className="text-xl font-semibold text-green-700 text-center pb-5">
          Recently Viewed
        </h3>
        {recentItems?.slice(1, 3).map((product) => (
          <SideProductCard />
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsSection;
