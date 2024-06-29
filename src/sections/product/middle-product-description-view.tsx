import CartSidebar from "@/components/common/add-to-carted-product-notify-view";
import { features, socialInfo } from "@/constants";
import useBoolean from "@/hooks/use-boolean";
import ActionButton from "@/layouts/common/buttons/action-button";
import { IProductItem } from "@/types/products";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React from "react";

type TMiddleDescriptionProps = {
  product: IProductItem;
};

const MiddleProductDescription = ({ product }: TMiddleDescriptionProps) => {
  const sidebar = useBoolean();
  const { name, price, desc, review, images, _id, status, brand, category } =
    product;
  return (
    <div className='className="w-full px-3 flex-1 mt-7 md:mt-0 lg:pl-7 xl:pl-9 2xl:pl-10"'>
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-green-600">
          {name}
        </h2>
        <div className="flex items-center flex-wrap gap-2 mt-3">
          {socialInfo.map((info, i) => (
            <div className="flex items-center px-4 gap-2 py-1.5 border cursor-pointer hover:bg-red-500 transition-all duration-150 ease-in hover:text-white border-gray-300">
              <Icon icon={info.icon} className="text-xl" />
              <p className="text-sm">{info.name}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center flex-wrap gap-5 mt-5">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((i) => (
              <Icon icon="noto:star" className="text-xl" />
            ))}
            <Icon icon="la:star-half-alt" className="text-gray-400 text-sm" />
          </div>
          <h2 className="text-[13px] border-l px-5 border-r hover:text-red-500">
            Read Reviews: (0)
          </h2>
          <h2 className="text-[13px] hover:text-red-500">Rrite a review</h2>
        </div>

        <div className="mt-7">
          <h3 className="">
            <span className="text-sm font-semibold">Condition: </span>
            <span className="text-gray-500 text-sm pl-1"> New Product</span>
          </h3>
          <h3 className="pt-1.5">
            <span className="text-sm font-semibold">Brand: </span>
            <span className="text-gray-500 text-sm pl-1"> {brand}</span>
          </h3>
          <h3 className="pt-1.5">
            <span className="text-sm font-semibold">Product Code: </span>
            <span className="text-gray-500 text-sm pl-1"> 567890</span>
          </h3>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div className="border-y py-3 flex items-center gap-3">
            <h3 className="text-3xl font-semibold text-red-500">
              ${parseInt(price.toString())}.00
            </h3>
            <h3 className="text-md font-semibold">
              <span className="text-gray-400 pl-2 line-through ">
                ${parseInt(price.toString()) + 5}.00
              </span>
            </h3>
          </div>
          <div className="px-2 py-1 bg-green-500 border border-green-700 text-white font-semibold text-sm">
            In stock
          </div>
        </div>
      </div>

      <div className="flex space-x-3.5 mt-7">
        <div className="flex items-center justify-center bg-slate-100/70 px-2 py-3 sm:p-3.5 rounded-full">
          <div className=" flex items-center justify-between space-x-5 w-full">
            <div className="flex items-center justify-between w-[104px] sm:w-28">
              <ActionButton icon="ph:minus" />
              <span className="select-none block flex-1 text-center leading-none">
                5
              </span>
              <ActionButton icon="ph:plus" />
            </div>
          </div>
        </div>
        <button className="w-full relative flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 sm:px-6 bg-blue-gray-700 text-white disabled:bg-opacity-90  hover:bg-blue-gray-800 shadow-xl flex-1">
          <Icon icon="iconamoon:shopping-bag-light" className="text-xl" />
          <span className="ml-3">Add to cart</span>
        </button>
      </div>

      <p className="pt-3 last:pb-0 text-slate-600 text-sm  leading-6">{desc}</p>

      <div className=" mt-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col p-5 rounded-lg dark:bg-opacity-90 ${feature.bg} cursor-pointer`}
            >
              <Icon icon={feature.icon} />
              <div className="mt-2.5">
                <p className="font-semibold text-slate-900">{feature.title}</p>
                <p className="text-slate-500 mt-0.5 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {sidebar.value && <CartSidebar dialog={sidebar} />}
    </div>
  );
};

export default MiddleProductDescription;
