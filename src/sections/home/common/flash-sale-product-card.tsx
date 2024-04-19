import React, { useState } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FlashSaleProductCard = ({ product, i }: any) => {
  const { name, images, price, desc, review, _id } = product;
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleImageHover = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="relative flex z-10 flex-col w-full group bg-gray-100">
      <div className="relative flex-shrink-0 overflow-hidden w-full">
        <Link
          href={`/product-detail/${product?._id}`}
          className="flex h-32 w-32 object-cover "
        >
          <img
            className="object-cover h-full w-full drop-shadow-xl zoom-animation"
            src={selectedImage}
            onMouseEnter={() => handleImageHover(images[1])}
            onMouseLeave={() => handleImageHover(images[0])}
          />
        </Link>
      </div>
      <div className="hidden rounded-full sm:flex items-center justify-center absolute top-2 left-2 px-2.5 py-1.5 text-xs bg-red-500 text-white">
        <Icon icon="iconamoon:discount-light" className="h-3 w-3 text-white" />
        <span className="ml-1 leading-none">50% Discount</span>
      </div>
      <div className="px-2 pb-2">
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((i) => (
              <Icon icon="noto:star" className="text-xl" />
            ))}
            <Icon
              icon="clarity:half-star-solid"
              className="text-gray-400 text-xl"
            />
          </div>
        </div>

        <div className="pt-1">
          <Link href="/">
            <h2 className="text-xs font-semibold hover:text-red-500 transition-all duration-300 ease-in text-ellipsis ">
              {desc?.slice(0, 17)}..
            </h2>
          </Link>
          <div className="flex items-center sm:items-end gap-x-2">
            <h3 className="text-red-500 text-[15px] font-bold ">${price}</h3>
            <h3 className="text-gray-400 text-[13px] line-through">$35.89</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleProductCard;
