import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductCardTimer from "@/components/timer/product-card-timer";

interface IProductCardProps {
  product: any;
  index: number;
  className?: string;
  newPadding?: number;
  newSize?: number;
  timerBoolean?: boolean;
}

const ProductCard = ({
  product,
  className,
  newPadding,
  timerBoolean,
}: IProductCardProps) => {
  const { name, images, price, desc, review, _id } = product;
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const endTime = "2023-07-25T19:59:59";

  const handleProduct = (product: any) => {
    setLoading(true);
    router.push(`/product-detail/${product?._id}`);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    setLoading(false);
  }

  const handleImageHover = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div
      className={twMerge(
        "relative flex z-10 flex-col w-full group shadow-sm hover:shadow-md bg-white",
        className
      )}
    >
      <div className="relative flex-shrink-0 overflow-hidden w-full group:">
        <Link
          href={`/product-detail/${product?._id}`}
          className="hidden sm:flex h-36 md:h-60 w-full object-cover "
        >
          <img
            className="object-cover h-full w-full drop-shadow-xl zoom-animation"
            src={selectedImage}
            onMouseEnter={() => handleImageHover(images[1])}
            onMouseLeave={() => handleImageHover(images[0])}
          />
        </Link>
        <Link
          href={`/product-detail/${product?._id}`}
          className="sm:hidden flex aspect-w-11 h-36 md:h-64 w-full object-cover border "
        >
          <img
            className="object-cover h-full w-full drop-shadow-xl"
            src={selectedImage}
          />
        </Link>

        <div className="group-hover:hidden">
          {timerBoolean === true && (
            <div className="absolute bottom-2 left-2 right-2">
              <ProductCardTimer endTime={endTime} />
            </div>
          )}
        </div>
      </div>
      <div className="hidden rounded-full sm:flex items-center justify-center absolute top-2 left-2 px-2.5 py-1.5 text-xs bg-red-500 text-white">
        <Icon icon="iconamoon:discount-light" className="h-3 w-3 text-white" />
        <span className="ml-1 leading-none">50% Discount</span>
      </div>

      <button
        className={`w-7 h-7 flex items-center justify-center rounded-full bg-white  text-neutral-700 absolute right-3 top-2 `}
        onClick={() => handleProduct(product)}
      >
        {isLoading ? (
          <div className="w-3.5 h-3.5 border-2 border-dashed rounded-full animate-spin border-violet-400"></div>
        ) : (
          <>
            <svg
              className={`w-5 h-5 text-gray-900`}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </>
        )}
      </button>

      <div className={`px-3 ${newPadding}`}>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((i) => (
              <Icon icon="noto:star" className="text-xl" />
            ))}
            <Icon
              icon="clarity:half-star-solid"
              className="text-gray-400 text-xl"
            />
          </div>
          <h3 className="text-sm sm:block hidden">Reviews: (0)</h3>
        </div>

        <div className={` pt-2 pb-2 `}>
          <Link href="/">
            <h2 className="text-base font-bold hover:text-red-500 transition-all duration-300 ease-in pb-2 hidden sm:block ">
              {desc.slice(0, 45)}
            </h2>
            <h2 className="text-xs sm:hidden font-semibold hover:text-red-500 transition-all duration-300 ease-in pb-2 text-ellipsis ">
              {desc.slice(0, 45)}
            </h2>
          </Link>
          <div className="flex items-center sm:items-end gap-2">
            <h3 className="text-red-500 text-[18px] font-bold price">
              ${price}
            </h3>
            <h3 className="text-gray-400 text-[13px] line-through price">
              $35.89
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
