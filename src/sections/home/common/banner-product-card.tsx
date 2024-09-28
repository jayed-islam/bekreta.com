import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import ProductCardTimer from "@/components/timer/product-card-timer";
import { IProduct } from "@/types/products";
import { paths } from "@/layouts/paths";
import { Button, Tooltip } from "@mui/material";

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
  const isOutOfStock = product.status === "OUT_OF_STOCK";

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
    <div className="relative flex z-10 flex-col w-full group cursor-pointer overflow-hidden px-2">
      <div className="p-3 h-[271px] overflow-hidden">
        <div className="w-full flex items-center justify-center h-full">
          <img
            alt={product.name}
            className="h-[241px] object-contain"
            src={images[0]}
          />
        </div>

        {product.status === "OUT_OF_STOCK" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold text-lg">OUT OF STOCK</span>
          </div>
        )}
      </div>

      <div className="px-3 pb-3 bg-gray-200">
        <div className="flex items-center justify-between mt-2 w-full">
          <h3 className="text-[#2e7d32] text-lg sm:text-xl font-bold text-center">
            ৳{price}
          </h3>
        </div>
        <Link href={`${paths.product.root}/${_id}`}>
          <h2
            className={`font-bold hover:text-[#2e7d32] transition-all duration-300 ease-in leading-5 line-clamp-1 overflow-ellipsis text-sm md:text-sm`}
          >
            {name}
          </h2>
        </Link>

        <div className="flex items-center gap-3 mt-3">
          <Button
            style={{
              borderRadius: 0,
            }}
            variant="contained"
            color="success"
            fullWidth
          >
            অর্ডার করুন
          </Button>
          <div className="w-[47px]">
            <Tooltip title="কার্টে যোগ করুণ">
              <button
                disabled={isOutOfStock}
                className={`h-9 w-9 transition-all duration-200 rounded-full flex items-center justify-center ${
                  isOutOfStock
                    ? "bg-gray-300 text-gray-500"
                    : "bg-white hover:bg-green-600 hover:text-white"
                }`}
                // onClick={handleAddToCartMain}
              >
                <Icon icon="solar:bag-4-linear" className="text-xl" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerProductCard;
