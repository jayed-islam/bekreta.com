import { paths } from "@/layouts/paths";
import { CartItem } from "@/types/cart";
import Link from "next/link";
import React from "react";

interface Props {
  product?: CartItem;
  path?: string;
}

const SideProductCard = ({ product }: Props) => {
  const { category, image, name, price, productId, about } =
    (product as CartItem) || {};
  return (
    <Link
      href={`${paths.product.root}/${productId}`}
      className="flex items-start gap-5 border-b pb-3 pt-3 group bg-white pl-2 rounded-lg"
    >
      <div className="h-20 w-20 rounded-lg border overflow-hidden">
        <img
          src={image}
          className="group-hover:scale-110 duration-300 transition-all flex-1 object-cover border-gray-300"
          alt=""
        />
      </div>
      <div className="flex flex-col flex-1">
        <h2 className="text-md group-hover:text-green-600 line-clamp-1 text-ellipsis font-semibold transition-all duration-300 group-hover:underline">
          {name}
        </h2>
        <h2 className="text-[13px] line-clamp-2 text-ellipsis leading-4">
          {about}
        </h2>
        <div>
          <h2 className="text-md font-semibold">৳{price}</h2>
        </div>
      </div>
    </Link>
  );
};

export default SideProductCard;
