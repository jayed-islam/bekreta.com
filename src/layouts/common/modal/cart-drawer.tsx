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
import { useGetUserCartsQuery } from "@/redux/reducers/cart/cartApi";
import { RootState } from "@/redux/store";
import CartItemInDrawer from "./cart-item-in-drawer";

const CartDrawer = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetUserCartsQuery(user?._id as string, {
    skip: !user?._id,
  });

  const { isCartDrawerOpen, cartItems } = useAppSelector((state) => state.cart);
  const dipatch = useAppDispatch();
  const isSmUp = useResponsive({ breakpoint: "sm", direction: "up" });

  const subtotal = useAppSelector((state: RootState) =>
    selectCartSubtotal(state)
  );

  const handleClose = () => {
    dipatch(closeCartDrawer());
  };

  return (
    <Drawer anchor="right" open={isCartDrawerOpen} onClose={handleClose}>
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
                {user && user._id ? (
                  <>
                    {isLoading ? (
                      <div className="flex flex-col gap-3 divide-y-2">
                        {[1, 2, 3].map((item, index) => (
                          <div
                            key={index}
                            className="animate-pulse flex space-x-4 first:pt-0 pt-3"
                          >
                            <div className="rounded-lg bg-slate-200 h-24 w-20"></div>
                            <div className="flex-1 space-y-6 py-1">
                              <div className="flex items-start gap-3">
                                <div className="h-3 bg-slate-200 rounded w-full"></div>
                                <div className="h-7 w-16 bg-slate-200 rounded "></div>
                              </div>
                              <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-200 rounded"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : cartItems.length === 0 ? (
                      <div>
                        <h3 className="text-lg  mb-5">
                          Your cart is empty. add product to get your favorite
                          item.
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
                      cartItems.map((item, i) => (
                        <CartItemInDrawer key={i} item={item} />
                      ))
                    )}
                  </>
                ) : (
                  <div>
                    <h3 className="text-lg  mb-5">
                      Please login and add item in your cart to see your
                      favorite item here.
                    </h3>
                    <Link
                      href={paths.website.signin}
                      onClick={handleClose}
                      className="px-5 py-2 bg-green-500 hover:bg-green-600 transition-all duration-200 rounded-md mt-5 text-white"
                    >
                      Sign in
                    </Link>
                  </div>
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
