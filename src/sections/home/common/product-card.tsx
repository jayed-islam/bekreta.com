import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";

interface IProductCardProps {
  product: any;
  index: number;
  className?: string;
  newPadding?: number;
  newSize?: number;
  timerBoolean?: boolean;
  rootPath: string;
}

const ProductCard = ({
  product,
  className,
  newPadding,
  timerBoolean,
  rootPath,
}: IProductCardProps) => {
  const { name, images, price, desc, review, _id } = product;
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isLoading, setLoading] = useState(false);

  const actionButtonsInfo = [
    {
      icon: "ic:baseline-compare-arrows",
      action: () => {
        console.log("action, compare");
      },
    },
    {
      icon: "ph:heart-light",
      action: () => {
        console.log("action, wishlist");
      },
    },
    {
      icon: "carbon:view",
      action: () => {
        console.log("action, view");
      },
    },
  ];

  return (
    <div
      className={twMerge(
        "relative flex z-10 flex-col w-full group shadow bg-white border-2 rounded-2xl p-3 group cursor-pointer hover:border-green-500 overflow-hidden",
        className
      )}
    >
      <div className="absolute -right-11 top-1/3 z-10  flex-col flex gap-2 group-hover:right-3 transition-all duration-500">
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
      <div className="relative flex-shrink-0 overflow-hidden w-full  rounded-t-2xl">
        <Link
          href={`${rootPath}/${product?._id}`}
          className="hidden sm:flex w-full object-cover "
        >
          <img
            className="h-full w-full drop-shadow-xl group-hover:scale-110 rounded-t-2xl  transition-all duration-200"
            src="/assets/pill.jpg"
          />
        </Link>
        <Link
          href={`/product-detail/${product?._id}`}
          className="sm:hidden flex aspect-w-11 h-36 md:h-64 w-full object-cover border"
        >
          <img
            className="object-cover h-full w-full drop-shadow-xl"
            src={selectedImage}
          />
        </Link>
      </div>
      <div className="hidden rounded-full sm:flex items-center justify-center absolute top-2 left-2 px-2.5 py-1.5 text-xs bg-green-500 text-white">
        <Icon icon="iconamoon:discount-light" className="h-3 w-3 text-white" />
        <span className="ml-1 leading-none">50% Discount</span>
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

      <div className={`px-3 ${newPadding}`}>
        <div className={` pt-2 pb-2 `}>
          <h2 className="font-semibold text-sm text-gray-600">
            {product.category}
          </h2>
          <Link href="/">
            <h2 className="text-lg  font-bold hover:text-green-500 transition-all duration-300 ease-in pb-2 leading-6 hidden sm:block ">
              {desc.slice(0, 45)}
            </h2>
            <h2 className="text-xs sm:hidden font-semibold hover:text-red-500 transition-all duration-300 ease-in pb-2 text-ellipsis ">
              {desc.slice(0, 45)}
            </h2>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {[1, 2, 3, 4].map((i) => (
                <Icon icon="noto:star" className="text-md" />
              ))}
              <Icon
                icon="clarity:half-star-solid"
                className="text-gray-400 text-md"
              />
            </div>
          </div>
          <div className="flex items-center sm:items-end gap-2 mt-2 justify-between">
            <h3 className="text-green-500 text-[19px] font-bold price">
              ৳{price}
            </h3>
            <div className="bg-gray-200 h-9 w-9 hover:bg-green-500 transition-all duration-200 rounded-full flex items-center justify-center hover:text-white">
              <Icon icon="solar:bag-4-linear" className="text-xl" />
            </div>
          </div>
          <div>
            <h2>Stock label</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
