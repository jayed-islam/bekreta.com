import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import { Button, Tooltip } from "@mui/material";
import { actionButtonsInfo } from "@/constants";
import { useAppDispatch } from "@/redux/hooks";
import { openCartDrawer } from "@/redux/reducers/cart/cartSlice";

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
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(openCartDrawer());
  };

  return (
    <div
      className={twMerge(
        "relative flex z-10 flex-col w-full group shadow bg-white border-2 rounded-2xl p-1 md:p-3 group cursor-pointer hover:border-green-500 overflow-hidden",
        className
      )}
    >
      <div className="absolute -right-11 top-1/3 z-10 flex-col md:flex gap-2 group-hover:right-3 transition-all duration-500 hidden">
        {actionButtonsInfo.map((action, index) => (
          <Tooltip
            title={action.title}
            placement="bottom"
            className="bg-opacity-65 text-xs px-1.5 py-[2px]"
          >
            <div
              key={index}
              onClick={() => action.action()}
              className="bg-gray-200 h-9 w-9 hover:bg-green-500 transition-all duration-200 rounded-full flex items-center justify-center hover:text-white"
            >
              <Icon icon={action.icon} className="text-xl" />
            </div>
          </Tooltip>
        ))}
      </div>
      <div className="relative flex-shrink-0 overflow-hidden w-full  rounded-t-2xl">
        <Link
          href={`${rootPath}/1`}
          className="hidden sm:flex w-full object-cover"
        >
          <img
            className="h-full w-full drop-shadow-xl group-hover:scale-110 rounded-t-2xl transition-all duration-200"
            src="/assets/pill.jpg"
          />
        </Link>
        <Link href={`/product-detail/1`}>
          <div className="sm:hidden h-36 w-full flex items-center justify-center">
            <img className=" bg-black h-full" src="/assets/pill.jpg" />
          </div>
        </Link>
      </div>
      <div className="hidden rounded-full md:flex items-center justify-center absolute top-2 left-2 px-2.5 py-1.5 text-xs bg-green-500 text-white">
        <Icon icon="iconamoon:discount-light" className="h-3 w-3 text-white" />
        <span className="ml-1 leading-none">50% Discount</span>
      </div>

      <button
        className={`w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-neutral-700 absolute right-3 top-2 md:hidden hover:bg-green-500 hover:text-white`}
      >
        {isLoading ? (
          <div className="w-3.5 h-3.5 border-2 border-dashed rounded-full animate-spin border-violet-400"></div>
        ) : (
          <Icon icon="ph:heart-light" className="text-xl" />
        )}
      </button>

      <div className={`px-3 ${newPadding}`}>
        <div className={`pt-2 pb-2 `}>
          <Link href="/">
            <h2 className=" text-sm md:text-lg font-bold hover:text-green-500 transition-all duration-300 ease-in pb-2 leading-6">
              test desc
            </h2>
          </Link>
          <div className="flex items-center sm:mt-2 justify-between">
            <div className="flex items-center">
              {[1, 2, 3, 4].map((i) => (
                <Icon icon="noto:star" className="text-md" />
              ))}
              <Icon
                icon="clarity:half-star-solid"
                className="text-gray-400 text-md"
              />
              <p className="text-xs text-gray-500 pl-1">(5)</p>
            </div>
            <h3 className="text-green-500 text-lg sm:text-[19px] font-bold">
              ৳50
            </h3>
          </div>
          <Button
            onClick={handleOpen}
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "#fc8934",
              textTransform: "capitalize",
              borderRadius: "0.7rem",
              "&:hover": {
                bgcolor: "#e77a2f",
              },
            }}
          >
            Quick Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
