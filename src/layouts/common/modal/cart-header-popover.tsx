import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import React from "react";
import { Fragment } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { paths } from "@/layouts/paths";

const CartHeaderPopup = () => {
  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`${open ? "text-white" : "text-white/90"}`}
            >
              <button
                className={`text-opacity-90 group w-10 h-10 sm:w-12 sm:h-12 rounded-full lg:inline-flex items-center justify-center outline-none border-2 border-orange-700  cursor-pointer relative focus:outline-none focus:ring-0`}
                type="button"
              >
                <div
                  className={`w-4 h-4 right-0 flex items-center justify-center absolute top-1 rounded-full text-[10px] leading-none text-white font-medium bg-blue-500`}
                >
                  <span className="">0</span>
                </div>
                <Icon icon="iconoir:cart" className="text-2xl" />
              </button>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 mt-2 w-screen max-w-[15.5rem] right-0 transform px-4 sm:px-0 rounded-2xl">
                {({ close }) => (
                  <div className={`absolute right-0 block border-t'}`}>
                    <div
                      className={` z-10 w-screen max-w-xs  sm:max-w-md px-4 mt-5  sm:px-0 opacity-100 translate-y-0 `}
                    >
                      <div className="overflow-hidden rounded-2xl shadow-lg border">
                        <div className="relative bg-white">
                          <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                            <h3 className="text-xl font-semibold text-black">
                              Shopping cart
                            </h3>
                            <div className="divide-y divide-slate-100">
                              {/* {cartItems?.map((cart) => (
                              
                              ))} */}
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
                                          <a href="/product-detail">
                                            {/* {cart?.name} */}
                                            Product name
                                          </a>
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
                                        // onClick={() =>
                                        //   removeFromCart(cart?._id)
                                        // }
                                        className="font-medium text-blue-500 "
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
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
                            <div className="flex space-x-2 mt-5">
                              <Link
                                onClick={() => close()}
                                href={paths.cart.root}
                                className="nc-Button relative h-auto inline-flex items-center justify-center text rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 bg-white text-slate-700 hover:bg-gray-100 flex-1 border border-slate-200focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000  "
                              >
                                View cart
                              </Link>

                              <Link
                                href="/"
                                onClick={() => close()}
                                className="relative h-auto max-h-screen inline-flex items-center justify-center rounded-full transition-all duration-300 text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6
                                shadow-md
                                hover:shadow-xl
                                text-white disabled:bg-opacity-90 bg-blue-gray-900  flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
                              >
                                Check out
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default CartHeaderPopup;
