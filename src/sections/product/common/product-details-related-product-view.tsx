import { paths } from "@/layouts/paths";
import { IProductItem } from "@/types/products";
import Link from "next/link";
import React from "react";

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
    <div className="">
      <div className=" xl:px-0">
        <div className="w-full lg:w-[301px] mt-5 lg:mt-0">
          <div className=" bg-white py-5 px-5">
            <h3 className="text-xl border-t pt-3 font-semibold text-indigo-700 text-center pb-5 uppercase">
              Related Products
            </h3>
            {relatedProducts.slice(0, 3).map((product) => (
              <Link
                href={`${paths.product.root}/${product?._id}`}
                className="flex items-start gap-5 border-t pt-5 pb-5"
                key={product._id}
              >
                <img
                  src={product?.images[0]}
                  className="h-20 w-20 border flex-1 object-cover border-gray-300 "
                  alt=""
                />
                <div className="flex flex-col ">
                  <h2 className="text-md hover:text-orange-600">
                    {product.name.slice(0, 13)}...
                  </h2>
                  <h2 className="text-[13px] hover:text-orange-600">
                    {product.desc.slice(0, 35)}...
                  </h2>
                </div>
              </Link>
            ))}
          </div>

          <div className=" bg-white py-5 px-5 mt-5">
            <h3 className="text-xl font-semibold text-indigo-700 text-center pb-5">
              Recently Viewed
            </h3>
            {recentItems?.slice(1, 3).map((product) => (
              <Link
                href={`${paths.product.root}/${product?._id}`}
                className="flex items-start gap-5 border-t pt-5 pb-5"
                key={product._id}
              >
                <img
                  src={product?.images[0]}
                  className="h-20 w-20 border object-cover border-gray-300 "
                  alt=""
                />
                <div className="flex flex-col">
                  <h2 className="text-md hover:text-orange-600">
                    {product.name.slice(0, 13)}...
                  </h2>
                  <h2 className="hidden md:block text-[13px] hover:text-orange-600">
                    {product.desc.slice(0, 35)}...
                  </h2>
                  <h2 className="text-[13px] md:hidden hover:text-orange-600">
                    {product.desc.slice(0, 55)}...
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProductsSection;
