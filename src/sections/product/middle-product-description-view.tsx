import CartSidebar from "@/components/common/add-to-carted-product-notify-view";
import { features, socialInfo } from "@/constants";
import useBoolean from "@/hooks/use-boolean";
import ActionButton from "@/layouts/common/buttons/action-button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openCartDrawer } from "@/redux/reducers/cart/cartSlice";
import { IProduct } from "@/types/products";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { useState } from "react";
import { getProductStatus, getStatusStyles } from "./common/product-constants";
import { useAddToCartMutation } from "@/redux/reducers/cart/cartApi";
import toast from "react-hot-toast";
import SmallLoader from "@/components/loader/small-loader";

type TMiddleDescriptionProps = {
  product: IProduct;
};

const MiddleProductDescription = ({ product }: TMiddleDescriptionProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const sidebar = useBoolean();

  const { name, price, category, about, specifications, status } = product;

  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const [addToCart, { isLoading }] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      const res = await addToCart({
        item: {
          product: product._id,
          quantity,
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

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handeAddToCartMain = () => {
    handleAddToCart();
    dispatch(openCartDrawer());
  };

  return (
    <div className='className="w-full px-3 flex-1 mt-7 md:mt-0 lg:pl-7 xl:pl-9 2xl:pl-10"'>
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-green-600">
          {name}
        </h2>
        <div className="flex items-center flex-wrap gap-2 mt-3">
          {socialInfo.map((info, i) => (
            <div className="flex items-center px-4 gap-2 py-1.5 border cursor-pointer hover:bg-green-500 transition-all duration-150 ease-in hover:text-white border-gray-300">
              <Icon icon={info.icon} className="text-xl" />
              <p className="text-sm">{info.name}</p>
            </div>
          ))}
        </div>

        <div className="py-5">
          {specifications.map((item, index) => (
            <h2 className="text-sm md:text-md">{item}</h2>
          ))}
        </div>

        {/* <div className="flex items-center flex-wrap gap-5 mt-5">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((i) => (
              <Icon icon="noto:star" className="text-xl" />
            ))}
            <Icon icon="la:star-half-alt" className="text-gray-400 text-sm" />
          </div>
          <h2 className="text-[13px] border-l px-5 border-r hover:text-green-500">
            Read Reviews: (0)
          </h2>
          <h2 className="text-[13px] hover:text-green-500">Rrite a review</h2>
        </div>

        <div className="mt-7">
          <h3 className="">
            <span className="text-sm font-semibold">Condition: </span>
            <span className="text-gray-500 text-sm pl-1"> New Product</span>
          </h3>
          <h3 className="pt-1.5">
            <span className="text-sm font-semibold">Brand: </span>
            <span className="text-gray-500 text-sm pl-1">Brand</span>
          </h3>
          <h3 className="pt-1.5">
            <span className="text-sm font-semibold">Product Code: </span>
            <span className="text-gray-500 text-sm pl-1">
              {product._id.slice(0, 5)}
            </span>
          </h3>
        </div> */}

        <div className="flex items-center justify-between mt-5">
          <div className="border-y py-3 flex items-center gap-3">
            <h3 className="text-3xl font-semibold text-green-500">৳{price}</h3>
            <h3 className="text-md font-semibold">
              <span className="text-gray-400 pl-2 line-through ">৳{price}</span>
            </h3>
          </div>
          <div
            className={`px-2 py-1 border text-white font-semibold text-sm ${getStatusStyles(
              status
            )}`}
          >
            {getProductStatus(status)}
          </div>
        </div>
      </div>

      <div className="flex space-x-3.5 mt-7">
        <div className="flex items-center justify-center bg-slate-100/70 px-2 py-3 sm:p-3.5 rounded-full">
          <div className=" flex items-center justify-between space-x-5 w-full">
            <div className="flex items-center justify-between w-[104px] sm:w-28">
              <ActionButton icon="ph:minus" onClick={handleDecrease} />
              <span className="select-none block flex-1 text-center leading-none">
                {quantity}
              </span>
              <ActionButton icon="ph:plus" onClick={handleIncrease} />
            </div>
          </div>
        </div>
        <button
          disabled={status === "OUT_OF_STOCK"}
          onClick={handleAddToCart}
          className={`w-full relative flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 sm:px-6 bg-gray-800 text-white hover:bg-gray-900 shadow-xl flex-1 h-13 ${
            status === "OUT_OF_STOCK"
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : ""
          }`}
        >
          {isLoading ? (
            <SmallLoader />
          ) : (
            <Icon icon="iconamoon:shopping-bag-light" className="text-xl" />
          )}
          <span className="ml-3">Add to cart</span>
        </button>
      </div>

      <p className="pt-5 text-slate-600 text-md leading-6">{about}</p>

      {/* <div className=" mt-7">
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
      </div> */}
      {sidebar.value && <CartSidebar dialog={sidebar} />}
    </div>
  );
};

export default MiddleProductDescription;
