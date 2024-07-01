import { paths } from "@/layouts/paths";
import { IProduct, IProductItem } from "@/types/products";
import Link from "next/link";
import React from "react";

interface Props {
  product?: IProduct;
  path?: string;
}

const SideProductCard = ({ product }: Props) => {
  const { images, name, price, about, _id } = product as IProduct;
  return (
    <Link
      href={`${paths.product.root}/${_id}`}
      className="flex items-start gap-5 border-t pt-5 pb-5 group"
    >
      <div className="h-20 w-20 rounded-lg border overflow-hidden">
        <img
          src={images[0]}
          className="group-hover:scale-110 duration-300 transition-all flex-1 object-cover border-gray-300"
          alt=""
        />
      </div>
      <div className="flex flex-col flex-1">
        <h2 className="text-md group-hover:text-green-600 line-clamp-1 text-ellipsis font-semibold transition-all duration-300">
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
