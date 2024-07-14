import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import { Tooltip } from "@mui/material";
import { actionButtonsInfo } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openCartDrawer } from "@/redux/reducers/cart/cartSlice";
import { IProduct } from "@/types/products";
import { paths } from "@/layouts/paths";
import { useAddToCartMutation } from "@/redux/reducers/cart/cartApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface IProductCardProps {
  product: IProduct;
  className?: string;
  size: "sm" | "lg";
}

const ProductCard = ({
  product,
  className,
  size = "lg",
}: IProductCardProps) => {
  const { name, images, price, _id, discount, status } = product;

  const { accessToken, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const isOutOfStock = product.status === "OUT_OF_STOCK";

  const dispatch = useAppDispatch();

  const [addToCart, { isLoading }] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      const res = await addToCart({
        item: {
          product: product._id,
          quantity: 1,
        },
      }).unwrap();

      if (res.success) {
        toast.success(res.message);
        dispatch(openCartDrawer());
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCartMain = () => {
    if (!user || !accessToken) {
      router.push(`${paths.product.root}/${_id}`);
    } else {
      handleAddToCart();
    }
  };

  return (
    <div
      className={twMerge(
        "relative flex z-10 flex-col w-full group shadow bg-white border-2 rounded-2xl p-1 group cursor-pointer hover:border-green-500 overflow-hidden",
        className
      )}
    >
      <div className="absolute -right-11 top-1/3 z-10 flex-col md:flex gap-2 group-hover:right-3 transition-all duration-500 hidden">
        {actionButtonsInfo.map((action, index) => (
          <Link href={`${paths.product.root}/${_id}`}>
            <Tooltip
              title={action.title}
              placement="bottom"
              className="bg-opacity-65 text-xs px-1.5 py-[2px]"
            >
              <div
                key={index}
                onClick={() => action.action()}
                className="bg-gray-300 h-9 w-9 hover:bg-green-500 transition-all duration-200 rounded-full flex items-center justify-center hover:text-white"
              >
                <Icon icon={action.icon} className="text-xl" />
              </div>
            </Tooltip>
          </Link>
        ))}
      </div>
      <div
        className={`relative w-full h-36 border-b overflow-hidden rounded-t-2xl flex items-center justify-center ${
          size === "sm" ? "h-36 md:h-44" : "h-36 md:h-64"
        }`}
      >
        <Link href={`${paths.product.root}/${_id}`}>
          <img
            alt={product.name}
            className={`group-hover:scale-105 transition-all duration-500  ${
              size === "sm" ? "h-28 md:h-38" : "h-28 md:h-56"
            }`}
            src={images[0]}
          />
        </Link>

        {status === "OUT_OF_STOCK" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-t-2xl">
            <span className="text-white font-bold text-lg">OUT OF STOCK</span>
          </div>
        )}
      </div>
      {discount.isDiscount && (
        <div className="hidden rounded-full md:flex items-center justify-center absolute top-2 left-2 px-2.5 py-1.5 text-xs bg-green-500 text-white">
          <Icon
            icon="iconamoon:discount-light"
            className="h-3 w-3 text-white"
          />
          <span className="ml-1 leading-none">
            {discount.percentage}% Discount
          </span>
        </div>
      )}

      <button
        className={`w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-neutral-700 absolute right-3 top-2 md:hidden hover:bg-green-500 hover:text-white`}
      >
        {isLoading ? (
          <div className="w-3.5 h-3.5 border-2 border-dashed rounded-full animate-spin border-violet-400"></div>
        ) : (
          <Icon icon="ph:heart-light" className="text-xl" />
        )}
      </button>

      <div className={`px-3`}>
        <div className={`pt-2 pb-2 `}>
          <Link href={`${paths.product.root}/${_id}`}>
            <h2
              className={`font-bold hover:text-green-500 transition-all duration-300 ease-in leading-5 line-clamp-2 overflow-ellipsis  ${
                size === "sm"
                  ? "text-sm h-9"
                  : "text-sm md:text-lg h-9 md:h-[3.5rem]"
              }`}
            >
              {name}
            </h2>
          </Link>
          <div className="sm:flex items-center hidden mt-2">
            {[1, 2, 3].map((i) => (
              <Icon icon="noto:star" className="text-md" />
            ))}
            <Icon
              icon="clarity:half-star-solid"
              className="text-gray-400 text-md"
            />
            <p className="text-xs text-gray-500 pl-1">(5)</p>
          </div>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-green-500 text-lg sm:text-[19px] font-bold">
              ৳ {price}
            </h3>
            <Tooltip title="Add to cart">
              <button
                disabled={isOutOfStock}
                className={`h-9 w-9 transition-all duration-200 rounded-full flex items-center justify-center ${
                  isOutOfStock
                    ? "bg-gray-300 text-gray-500"
                    : "bg-gray-200 hover:bg-green-600 hover:text-white"
                }`}
                onClick={handleAddToCartMain}
              >
                <Icon icon="solar:bag-4-linear" className="text-xl" />
              </button>
            </Tooltip>
          </div>
          {/* <button
            disabled={status === "OUT_OF_STOCK"}
            onClick={handleOpen}
            className={`${
              status === "OUT_OF_STOCK"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } transition-all duration-200 text-center w-full rounded-lg font-semibold text-white mt-2 ${
              size === "sm" ? "text-sm py-1" : "text-md py-1 sm:py-2"
            }`}
          >
            Quick Add
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
