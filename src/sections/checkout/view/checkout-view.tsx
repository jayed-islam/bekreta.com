"use client";

import PageHeader from "@/components/common/page-header";
import { RHFTextField } from "@/components/react-hook-form";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import CheckoutProductRow from "../checkout-item-row";
import OrderSummery from "../../cart/common/order-summary";

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
                    <RHFTextField name="title" label="Title" />
                    <RHFTextField name="title" label="Title" />
                    <RHFTextField
                      name="title"
                      label="Title"
                      className="col-span-2"
                    />
                    <RHFTextField name="title" label="Title" />
                    <RHFTextField name="title" label="Title" />
                    <RHFTextField name="title" label="Title" />
                  </div>
                </div>
                <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 my-10 lg:my-0 lg:mx-11"></div>
                <div className="w-full lg:w-[35%] rounded-2xl">
                  {/* summary */}
                  <OrderSummery
                    buttonTitle="Place Order"
                    isSubmit
                    onSubmit={() => {}}
                  />

                  <div className="bg-white rounded-2xl p-5 mt-5">
                    <h3 className="text-xl font-semibold pb-3">Your Basket</h3>
                    <div className="mt-5 flex flex-col gap-3 divide-slate-200/70">
                      {[1, 2, 3].map((items, i) => (
                        <CheckoutProductRow />
                      ))}
                    </div>
                  </div>
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
