import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import ProductCardTimer from "@/components/timer/product-card-timer";
import { IProduct } from "@/types/products";
import { paths } from "@/layouts/paths";

interface IProductCardProps {
  product: IProduct;
  index: number;
  className?: string;
  newPadding?: number;
  newSize?: number;
  timerBoolean?: boolean;
}

const BannerProductCard = ({
  product,
  className,
  newPadding,
  timerBoolean,
}: IProductCardProps) => {
  const { name, images, price, _id } = product;
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isLoading, setLoading] = useState(false);

  const actionButtonsInfo = [
    // {
    //   icon: "ic:baseline-compare-arrows",
    //   action: () => {
    //     console.log("action, compare");
    //   },
    // },
    // {
    //   icon: "ph:heart-light",
    //   action: () => {
    //     console.log("action, wishlist");
    //   },
    // },
    {
      icon: "carbon:view",
      action: () => {
        console.log("action, view");
      },
    },
  ];

  const endTime = "2024-06-25T19:59:59";

  return (
    <div
      className={twMerge(
        "relative flex z-10 flex-col w-full group cursor-pointer overflow-hidden",
        className
      )}
    >
      <div className="absolute -right-11 top-1/3 z-10  flex-col flex gap-2 group-hover:right-5 transition-all duration-500">
        {actionButtonsInfo.map((action, index) => (
          <div
            key={index}
            onClick={() => action.action()}
            className="bg-gray-200 h-9 w-9 hover:bg-green-500 transition-all duration-200 rounded-full flex items-center justify-center hover:text-white"
          >
            <Icon icon={action.icon} className="text-xl" />
          </div>
        ))}
      </div>
      <div className="relative flex-shrink-0 overflow-hidden w-full">
        <div className="hidden sm:flex object-cover bg-white h-48 items-center justify-center">
          <img
            className="h-full rounded-t-2xl transition-all duration-200"
            src={images[0]}
          />
        </div>
        <div className="sm:hidden flex aspect-w-11 h-36 md:h-64 w-full object-cover border">
          <img
            className="object-cover h-full w-full drop-shadow-xl"
            src={images[0]}
          />
        </div>
      </div>

      <button
        className={`w-7 h-7 flex items-center justify-center rounded-full bg-white  text-neutral-700 absolute right-3 top-2 sm:hidden`}
      >
        {isLoading ? (
          <div className="w-3.5 h-3.5 border-2 border-dashed rounded-full animate-spin border-violet-400"></div>
        ) : (
          <Icon icon="ph:heart-light" className="text-xl" />
        )}
      </button>

      <div className={`px-5`}>
        <div className={` pt-2 pb-2 `}>
          <h2 className="font-semibold text-sm text-gray-600">
            {product.category}
          </h2>
          <Link href={`${paths.product.root}/${_id}`}>
            <h2 className="text-lg  font-bold hover:text-green-500 transition-all duration-300 ease-in pb-2 leading-6 hidden sm:block ">
              {name}
            </h2>
            <h2 className="text-xs sm:hidden font-semibold hover:text-red-500 transition-all duration-300 ease-in pb-2 text-ellipsis ">
              {name}
            </h2>
          </Link>
          <div className="flex items-center sm:items-end gap-2 justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-green-500 text-[19px] font-bold price">
                ৳{price}
              </h3>
              <h3 className="text-gray-500 text-[15px] line-through price font-semibold">
                ৳{price}
              </h3>
            </div>
            <Link href={`${paths.product.root}/${_id}`}>
              <div className="bg-gray-200 h-9 w-9 hover:bg-green-500 transition-all duration-200 rounded-full flex items-center justify-center hover:text-white">
                <Icon icon="solar:bag-4-linear" className="text-xl" />
              </div>
            </Link>
          </div>
          <div className="w-full mt-4">
            <h2 className="text-lg text-gray-600">Hurry Up Offer ends in:</h2>
            {timerBoolean === true && (
              <div className="mt-1 w-full">
                <ProductCardTimer endTime={endTime} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerProductCard;
