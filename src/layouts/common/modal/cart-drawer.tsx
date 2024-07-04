"use client";

import useResponsive from "@/hooks/use-responsive";
import { paths } from "@/layouts/paths";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  closeCartDrawer,
  selectCartSubtotal,
} from "@/redux/reducers/cart/cartSlice";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Box, Divider, Drawer, IconButton } from "@mui/material";
import Link from "next/link";
import React from "react";
import ActionButton from "../buttons/action-button";
import {
  useRemoveFromCartMutation,
  useUpdateCartItemQuantityMutation,
} from "@/redux/reducers/cart/cartApi";
import toast from "react-hot-toast";
import { getProductStatus } from "@/sections/product/common/product-constants";
import { RootState } from "@/redux/store";

const CartDrawer = () => {
  const { isCartDrawerOpen, cartItems } = useAppSelector((state) => state.cart);
  const dipatch = useAppDispatch();
  const isSmUp = useResponsive({ breakpoint: "sm", direction: "up" });

  const subtotal = useAppSelector((state: RootState) =>
    selectCartSubtotal(state)
  );

  const handleClose = () => {
    dipatch(closeCartDrawer());
  };

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
    <Drawer
      anchor="right"
      open={isCartDrawerOpen}
      onClose={handleClose}
      //   role="presentation"
    >
      <Box
        sx={{
          width: isSmUp ? "25rem" : "21rem",
          height: "100vh",
        }}
      >
        <div className="">
          <div className="flex items-center justify-between px-5 pt-5">
            <h3 className="text-xl md:text-2xl font-semibold text-black ">
              Your Basket
            </h3>
            <IconButton
              onClick={handleClose}
              className="h-[2rem] w-[2rem] md:h-[3rem] md:w-[3rem]"
            >
              <Icon icon="carbon:close" className="text-3xl" />
            </IconButton>
          </div>
          <Divider />
          <div className="flex flex-col justify-between ">
            <div className="min-h-[51vh] max-h-[51vh] md:max-h-[61vh] p-5 overflow-y-auto">
              <div className="divide-y divide-slate-100">
                {cartItems.length === 0 ? (
                  <div>
                    <h3 className="text-lg  mb-5">
                      Your cart is empty. add product to get your favorite item.
                    </h3>
                    <Link
                      href={paths.product.category}
                      onClick={handleClose}
                      className="px-5 py-2 bg-green-500 hover:bg-green-600 transition-all duration-200 rounded-md mt-5 text-white"
                    >
                      See Product
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item) => (
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
                                <Link
                                  href={`${paths.product.root}/${item.product._id}`}
                                >
                                  {item.product.name}
                                </Link>
                              </h3>
                              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                <span>{item.product.category}</span>
                                <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                                <span>
                                  {getProductStatus(item.product.status)}
                                </span>
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
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.product._id,
                                  "decrease"
                                )
                              }
                            />
                            <span className="select-none block flex-1 text-center leading-none">
                              {item.quantity}
                            </span>
                            <ActionButton
                              icon="ph:plus"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.product._id,
                                  "increase"
                                )
                              }
                            />
                          </div>
                          <div className="flex">
                            <button
                              onClick={() =>
                                handleRemoveProduct(item.product._id)
                              }
                              type="button"
                              className="text-green-600 font-semibold"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {cartItems.length > 0 && (
              <div className="bg-neutral-50 p-5">
                <p className="flex justify-between font-semibold text-slate-900 ">
                  <span>
                    <span className="text-lg">Subtotal</span>
                    <span className="block text-sm text-slate-500 font-normal">
                      Shipping and taxes calculated at checkout.
                    </span>
                  </span>
                  <span className="text-lg">৳{subtotal.toFixed(2)}</span>
                </p>
                <div className="flex space-x-3 mt-5 w-full items-center">
                  <Link
                    onClick={handleClose}
                    href={paths.cart.root}
                    className="flex w-full items-center justify-center text rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:px-6 bg-gray-100 text-slate-700 shadow-md hvoer:shadow-xl hover:bg-gray-100 border-t"
                  >
                    View cart
                  </Link>

                  <Link
                    onClick={handleClose}
                    href={paths.checkout}
                    className="flex items-center justify-center rounded-full transition-all duration-300 text-sm sm:text-base font-medium py-3 px-4 sm:px-6 shadow-md hover:shadow-xl text-white disabled:bg-opacity-90 bg-green-500 hover:bg-green-600 w-full"
                  >
                    Check out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
