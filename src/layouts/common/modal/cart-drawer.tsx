"use client";

import useResponsive from "@/hooks/use-responsive";
import { paths } from "@/layouts/paths";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeCartDrawer } from "@/redux/reducers/cart/cartSlice";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Box, Drawer, IconButton } from "@mui/material";
import Link from "next/link";
import React from "react";

const CartDrawer = () => {
  const { isCartDrawerOpen } = useAppSelector((state) => state.cart);
  const dipatch = useAppDispatch();
  const isSmUp = useResponsive({ breakpoint: "sm", direction: "up" });

  const handleClose = () => {
    dipatch(closeCartDrawer());
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
          width: isSmUp ? "25rem" : "15rem",
        }}
      >
        <div className="">
          <div className="flex items-center justify-between px-5 pt-5">
            <h3 className="text-2xl font-semibold text-black ">Your Basket</h3>
            <IconButton>
              <Icon icon="carbon:close" className="text-3xl" />
            </IconButton>
          </div>
          <div className="flex flex-col justify-etween h-full">
            <div className="max-h-[61vh] p-5 overflow-y-auto">
              <div className="divide-y divide-slate-100">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div className="flex py-5 last:pb-0">
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      <img
                        alt="Rey Nylon Backpack"
                        loading="lazy"
                        decoding="async"
                        data-nimg="fill"
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                        className="h-full w-full  object-cover"
                      />
                      <a
                        className="absolute inset-0"
                        href="/product-detail"
                      ></a>
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between ">
                          <div>
                            <h3 className="text-base font-medium ">
                              <a href="/product-detail">Product name</a>
                            </h3>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                              <span>Natural</span>
                              <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                              <span>XL</span>
                            </p>
                          </div>
                          <div className="mt-0.5">
                            <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                              <span className="text-green-500 !leading-none">
                                $500
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500 ">Qty 1</p>
                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-blue-500 "
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-neutral-50 p-5">
              <p className="flex justify-between font-semibold text-slate-900 ">
                <span>
                  <span className="text-lg">Subtotal</span>
                  <span className="block text-sm text-slate-500 font-normal">
                    Shipping and taxes calculated at checkout.
                  </span>
                </span>
                <span className="text-lg">$400</span>
              </p>
              <div className="flex space-x-2 mt-5 w-full">
                <Link
                  href={paths.cart.root}
                  className="flex w-full items-center justify-center text rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 bg-gray-200 text-slate-700 hover:bg-gray-100 flex-1 border"
                >
                  View cart
                </Link>

                <Link
                  href="/"
                  onClick={() => close()}
                  className="flex items-center justify-center rounded-full transition-all duration-300 text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 shadow-md hover:shadow-xl text-white disabled:bg-opacity-90 bg-orange-600 w-full"
                >
                  Check out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
