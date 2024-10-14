import ImageGallery from "@/components/image-gallery/image-gallery";
import { IProduct } from "@/types/products";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { RefObject, useRef, useState } from "react";
import ReactImageMagnify from "react-image-magnify";

type TProps = {
  product: IProduct;
};

const LeftSideImageView = ({ product }: TProps) => {
  const isOutOfStock = product?.stock === 0;

  return (
    <div className="w-full lg:w-[25rem] lg:px-5 xl:px-0">
      <div className="relative">
        <div className="h-[300px] md:h-[450px] xl:h-[400px] relative sm:border border-gray-300 sm:p-2 overflow-hidden cursor-pointer">
          <img
            src={product?.images[0]}
            alt="Product Image"
            className="w-full h-full object-contain transform transition-transform duration-300"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <span className="text-white text-xl font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 justify-start mt-5 shadow-md border p-2 xl:-ml-11 sm:w-[300px] mx-3">
          <ImageGallery images={product.images} />
        </div>
        <div className="absolute top-3.5 left-3.5 px-2.5 py-1.5 text-xs bg-primary nc-shadow-lg flex items-center justify-center text-white  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="w-3.5 h-3.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            ></path>
          </svg>
          <span className="ml-1 leading-none">New in</span>
        </div>
      </div>
    </div>
  );
};

export default LeftSideImageView;
