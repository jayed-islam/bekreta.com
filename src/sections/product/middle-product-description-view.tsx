import CartSidebar from "@/components/common/add-to-carted-product-notify-view";
import { features, socialInfo } from "@/constants";
import useBoolean from "@/hooks/use-boolean";
import ActionButton from "@/layouts/common/buttons/action-button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openCartDrawer } from "@/redux/reducers/cart/cartSlice";
import { IProduct } from "@/types/products";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { getProductStatus, getStatusStyles } from "./common/product-constants";
import { useAddToCartMutation } from "@/redux/reducers/cart/cartApi";
import toast from "react-hot-toast";
import SmallLoader from "@/components/loader/small-loader";
import AuthModal from "@/layouts/common/modal/auth-modal";
import { addLastVisitedProduct } from "@/redux/reducers/product/productSlice";
import { CartItem } from "@/types/cart";
import { Button } from "@mui/material";

type TMiddleDescriptionProps = {
  product: IProduct;
};

const MiddleProductDescription = ({ product }: TMiddleDescriptionProps) => {
  const { user, accessToken } = useAppSelector((state) => state.auth);

  const sidebar = useBoolean();
  const authModal = useBoolean();

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

  const handleAddToCartMain = () => {
    if (!user || !accessToken) {
      authModal.setTrue();
    } else {
      handleAddToCart();
    }
  };

  const lastVisitItem: CartItem = {
    category: product.category,
    image: product.images[0],
    name: product.name,
    price: product.price,
    productId: product._id,
    quantity: 1,
    about: product.about,
  };

  useEffect(() => {
    dispatch(addLastVisitedProduct(lastVisitItem));
  }, [dispatch, product]);

  return (
    <div className='className="w-full px-3 flex-1 mt-7 md:mt-0 lg:pl-7 xl:pl-9 2xl:pl-10"'>
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-black">{name}</h2>

        <div className="flex items-center gap-5 mt-5">
          <h3 className="text-3xl font-semibold text-green-500">৳{price}</h3>
          <div
            className={`px-2 py-1 border text-white font-semibold text-sm ${getStatusStyles(
              status
            )}`}
          >
            {getProductStatus(status)}
          </div>
        </div>

        <div className="flex items-center bg-slate-100/70 px-2 py-2 mt-5 rounded-full w-min">
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
        <div className="flex flex-col gap-3 w-auto mt-5">
          <Button variant="contained" color="secondary">
            কার্টে যোগ করুণ
          </Button>

          <Button variant="contained" color="success">
            এখনই অর্ডার করুন
          </Button>
        </div>

        <div className="py-5 flex flex-col gap-1">
          <h2 className="text-xl font-semibold pb-2">Specifications</h2>
          {specifications.map((item, index) => (
            <h2 className="text-sm md:text-md">{item}</h2>
          ))}
        </div>
      </div>

      <div className="flex h-min gap-3 mt-7">
        {/* <button
          disabled={status === "OUT_OF_STOCK"}
          onClick={handleAddToCartMain}
          className={`w-full relative flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 sm:px-6  shadow-md flex-1 h-13 ${
            status === "OUT_OF_STOCK"
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-900"
          }`}
        >
          {isLoading ? (
            <SmallLoader />
          ) : (
            <Icon icon="iconamoon:shopping-bag-light" className="text-xl" />
          )}
          <span className="ml-3">
            {status === "OUT_OF_STOCK" ? "Out of stock" : "Add to cart"}
          </span>
        </button> */}
      </div>

      <p className="text-slate-600 text-md leading-6">{about}</p>

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
      {authModal.value && <AuthModal dialog={authModal} />}
    </div>
  );
};

export default MiddleProductDescription;
