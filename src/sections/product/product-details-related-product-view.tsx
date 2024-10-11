import React from "react";
import SideProductCard from "./common/side-product-card";
import { IProduct } from "@/types/products";
import { CartItem } from "@/types/cart";

interface Props {
  relatedProducts: IProduct[];
}

const RelatedProductView: React.FC<Props> = ({ relatedProducts }) => {
  return (
    <div className="w-full bg-gray-100 p-2 rounded-lg">
      {relatedProducts.length > 0 && (
        <div className="">
          <h3 className="text-xl font-semibold text-green-700 text-center pb-3">
            Related Products
          </h3>
          <div className="flex flex-col gap-3">
            {relatedProducts.map((product) => {
              const cartItem: CartItem = {
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.images[0],
                category: product.category?.name ?? "",
                about: product.about,
              };

              return <SideProductCard key={product._id} product={cartItem} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedProductView;
