"use client";

import PageHeader from "@/components/common/page-header";
import { RHFOTextField } from "@/components/react-hook-form";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CheckoutProductRow from "../checkout-item-row";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import CheckoutOrderSummery from "../checkout-order-summary";

const CheckoutProudctView = () => {
  const methods = useForm();

  const {
    handleSubmit,
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
      <div className="bg-gray-100">
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
          <div className="w-full max-w-6xl mx-auto">
            <FormProvider methods={methods} onSubmit={onSubmit}>
              <div className="flex flex-col lg:flex-row px-5 lg:px-0 py-16 ">
                <div className="flex-1 bg-white rounded-2xl p-5 h-min">
                  <h3 className="text-2xl font-semibold mb-7">
                    Billing details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <RHFOTextField name="title" label="Title" />
                    <RHFOTextField name="title" label="Title" />
                    <RHFOTextField name="title" label="Title" sx="col-span-2" />
                    <RHFOTextField name="title" label="Title" />
                    <RHFOTextField name="title" label="Title" />
                    <RHFOTextField name="title" label="Title" />
                  </div>
                </div>
                <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 my-10 lg:my-0 lg:mx-11"></div>
                <div className="w-full lg:w-[35%] sticky top-20 bg-white p-5 rounded-2xl">
                  <h3 className="text-2xl font-semibold">Order Summary</h3>
                  <div className="mt-8 flex flex-col gap-2 divide-slate-200/70">
                    {[1, 2, 3].map((items, i) => (
                      <CheckoutProductRow />
                    ))}
                  </div>

                  {/* summary */}
                  <CheckoutOrderSummery />
                </div>
              </div>
            </FormProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutProudctView;
