import { IProductItem } from "@/types/products";
import Link from "next/link";
import React from "react";

interface Props {
  product?: IProductItem;
  path?: string;
}

const SideProductCard = ({ product }: Props) => {
  return (
    <Link href="/" className="flex items-start gap-5 border-t pt-5 pb-5 group">
      <div className="h-20 w-20 rounded-lg border overflow-hidden">
        <img
          src="/assets/images/category/t-shart.jpg"
          className="group-hover:scale-110 duration-300 transition-all flex-1 object-cover border-gray-300 "
          alt=""
        />
      </div>
      <div className="flex flex-col flex-1">
        <h2 className="text-md group-hover:text-green-600 line-clamp-1 text-ellipsis font-semibold transition-all duration-300">
          In publishing and graphic design, Lorem ipsum is a placeholder
        </h2>
        <h2 className="text-[13px] line-clamp-2 text-ellipsis leading-4">
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before the final copy is available.
        </h2>
        <div>
          <h2 className="text-md font-semibold">$66.00</h2>
        </div>
      </div>
    </Link>
  );
};

export default SideProductCard;
