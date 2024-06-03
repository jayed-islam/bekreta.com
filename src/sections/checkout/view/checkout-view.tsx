"use client";

import PageHeader from "@/components/common/page-header";
import { QNXTextField } from "@/components/react-hook-form";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CheckoutProductRow from "../checkout-item-row";

const CheckoutProudctView = () => {
  const methods = useForm();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const breadcrumbItems = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Product", url: "/products" },
    { id: 2, name: "Checkout", url: "/checkout" },
  ];

  const test = [1, 1];

  const onSubmit = handleSubmit(async (data) => {
    try {
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });

  return (
    <div className="">
      <div className="max-w-6xl mx-auto ">
        <PageHeader pageName="Checkout" breadcrumbItems={breadcrumbItems} />

        <hr className="border-slate-200" />
        {test.length === 0 ? (
          <div className="w-full px-3 sm:px-0 ">
            <div className="border border-blue-400 px-5 py-2 mb-7">
              <h1> YOUR CART IS CURRENTLY EMPTY.</h1>
            </div>

            <Link
              href="/products"
              className=" bg-yellow-400 px-5 text-sm font-semibold py-2 rounded-full"
            >
              RETURN TO SHOP
            </Link>
          </div>
        ) : (
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <div className="flex flex-col lg:flex-row px-5 lg:px-0 py-16">
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <h3 className="text-2xl font-semibold mb-7">
                    Billing details
                  </h3>
                  <QNXTextField name="title" label="Title" sx="col-span-2" />
                </div>
              </div>
              <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200  my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>
              <div className="w-full lg:w-[30%] sticky top-20">
                <h3 className="text-lg font-semibold">Order summary</h3>
                <div className="mt-8 divide-y divide-slate-200/70  ">
                  {[1, 2, 3].map((items, i) => (
                    <CheckoutProductRow />
                  ))}
                </div>

                {/* summary */}
                <div className="flex-1 ">
                  <div className="mt-9">
                    <h3 className="text-lg font-semibold">Order Info</h3>
                    <div className="mt-7 text-sm text-slate-500  divide-y divide-slate-200/70 ">
                      <div className="flex justify-between pb-4">
                        <span>Subtotal</span>
                        <span className="font-semibold text-slate-900 ">
                          $50
                        </span>
                      </div>
                      <div className="flex justify-between py-4">
                        <span>Shipping estimate</span>
                        <span className="font-semibold text-slate-900 ">
                          $100.00
                        </span>
                      </div>
                      <div className="flex justify-between py-4">
                        <span>Tax estimate</span>
                        <span className="font-semibold text-slate-900 ">
                          $50
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold text-slate-900  text-base pt-4">
                        <span>Order total</span>
                        <span>$300</span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className=" relative h-[60px] inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 hover:bg-slate-800 text-slate-50 shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 "
                    >
                      Confirm Order
                    </button>
                    <div className="mt-5 text-sm text-slate-500  flex items-center justify-center">
                      <p className="relative pl-5 flex items-center gap-2">
                        <svg
                          className="w-4 h-4 absolute -left-1 top-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M12 8V13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M11.9945 16H12.0035"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        Learn more{" "}
                        <h3 className="text-slate-900  underline font-medium">
                          Taxes
                        </h3>{" "}
                        and{" "}
                        <h3 className="text-slate-900  underline font-medium">
                          Shipping
                        </h3>{" "}
                        information
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FormProvider>
        )}
      </div>
    </div>
  );
};

export default CheckoutProudctView;
