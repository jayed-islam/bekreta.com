import { paths } from "@/layouts/paths";
import { getProductStatus } from "@/sections/product/common/product-constants";
import { IUserCartItem } from "@/types/cart";
import Link from "next/link";
import React from "react";
import ActionButton from "../buttons/action-button";
import QuantityLoader from "@/components/loader/quantity-loder";
import {
  useRemoveFromCartMutation,
  useUpdateCartItemQuantityMutation,
} from "@/redux/reducers/cart/cartApi";
import toast from "react-hot-toast";

interface Props {
  item: IUserCartItem;
}

const CartItemInDrawer = ({ item }: Props) => {
  const [updateQuantity, { isLoading }] = useUpdateCartItemQuantityMutation();

  const [removeFromCart, { isLoading: isRemoveItemLoading }] =
    useRemoveFromCartMutation();
  const handleUpdateQuantity = async (
    productId: string,
    action: "increase" | "decrease"
  ) => {
    try {
      const res = await updateQuantity({ productId, action }).unwrap();
      if (res.success) {
        console.log(res.message);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message);
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    try {
      const res = await removeFromCart(productId).unwrap();
      if (res.success) {
        console.log(res.message);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message);
    }
  };
  return (
    <div className="flex py-5 last:pb-0">
      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <img
          src={item.product.images[0]}
          className="h-full w-full  object-cover"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between">
            <div>
              <h3 className="text-sm font-medium line-clamp-1 overflow-ellipsis">
                <Link href={`${paths.product.root}/${item.product._id}`}>
                  {item.product.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                <span>{item.product.category}</span>
                <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                <span>{getProductStatus(item.product.status)}</span>
              </p>
            </div>
            <div className="mt-0.5">
              <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                <span className="text-green-500 !leading-none">
                  ${item.product.price}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm pb-2">
          <div className="flex items-center justify-between w-[104px] sm:w-28">
            <ActionButton
              icon="ph:minus"
              onClick={() => handleUpdateQuantity(item.product._id, "decrease")}
            />
            <span className="select-none text-center leading-none">
              {isLoading ? <QuantityLoader /> : item.quantity}
            </span>
            <ActionButton
              icon="ph:plus"
              onClick={() => handleUpdateQuantity(item.product._id, "increase")}
            />
          </div>
          <div className="flex">
            <button
              onClick={() => handleRemoveProduct(item.product._id)}
              type="button"
              className="text-green-600 font-semibold"
            >
              {isRemoveItemLoading ? "Loading..." : "Remove"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemInDrawer;
