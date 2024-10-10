"use client";

import PageHeader from "@/components/common/page-header";
import { RHFTextField } from "@/components/react-hook-form";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import OrderSummery from "../../cart/common/order-summary";
import { useAppSelector } from "@/redux/hooks";
import {
  checkoutSchema,
  TCheckoutFormData,
} from "@/validations/checkout-validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { selectCartTotalPrice } from "@/redux/reducers/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/reducers/order/orderApi";
import { useRouter } from "next/navigation";
import CheckoutInstantSignin from "../checkout-instant-signin";
import CheckoutProductRow from "../checkout-item-row";
import CartRow from "@/sections/cart/cart-row-view";
import { paths } from "@/layouts/paths";

const CheckoutProudctView = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const totalPrice = useAppSelector((state) => selectCartTotalPrice(state));

  const methods = useForm<TCheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name,
    },
  });

  const router = useRouter();

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const breadcrumbItems = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Checkout", url: "/checkout" },
  ];

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const onSubmit = handleSubmit(async (data) => {
    if (cartItems.length === 0) {
      toast.error("Please add minimum 1 product for checkout");
      return;
    }

    const products = cartItems.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const payload = {
      ...(user && { userId: user?._id as string }),
      phone: data.phone,
      name: data.name,
      address: data.address,
      ...(data.orderNote && { orderNote: data.orderNote }),
      totalPrice: totalPrice,
      products,
    };

    const response = await createOrder(payload).unwrap();

    if (response.success) {
      toast.success(response.message);
      router.push(paths.success);
    } else {
      toast.error(response.message);
    }
    try {
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.data.message);
    }
  });

  const orderFromRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Object.keys(errors).length > 0 && orderFromRef.current) {
      orderFromRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [errors]);

  return (
    <div className="">
      <div className="bg-gray-100">
        <PageHeader pageName="Checkout" breadcrumbItems={breadcrumbItems} />
        <div className="max-w-6xl mx-auto">
          {!user && (
            <div className="pt-9">
              <CheckoutInstantSignin />
            </div>
          )}
          <div className="w-full" ref={orderFromRef}>
            <FormProvider methods={methods} onSubmit={onSubmit}>
              <div className="flex flex-col lg:flex-row md:px-5 xl:px-0 py-9">
                <div className="flex-1 px-3 lg:px-0">
                  <div className="border lg:rounded-2xl shadow bg-white p-5">
                    <h3 className="text-2xl font-semibold mb-5">
                      Billing details
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full">
                      <RHFTextField name="name" label="আপনার নাম" />
                      <RHFTextField name="phone" label="মোবাইল নাম্বার" />
                      <RHFTextField
                        name="address"
                        label="এড্রেস/ঠিকানা"
                        className="lg:col-span-2"
                      />
                      <RHFTextField
                        name="orderNote"
                        label="অর্ডার নোট"
                        className="lg:col-span-2"
                        multiline
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="mt-5 hidden lg:block">
                    <h3 className="text-xl font-semibold">Your Basket</h3>
                    <div className="mt-5 flex flex-col gap-3 divide-slate-200/70">
                      {cartItems?.map((item, i) => (
                        <CartRow key={i} item={item} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 my-5 lg:my-0 md:mx-5 lg:mx-11"></div>
                <div className="w-full lg:w-[35%] md:rounded-2xl">
                  {/* summary */}

                  <div className="px-3 lg:px-0 w-full">
                    <OrderSummery
                      buttonTitle="ওর্ডার করুণ"
                      isSubmit
                      onSubmit={() => {}}
                      isLoading={isLoading}
                    />
                  </div>

                  <div className="mt-5 w-full block lg:hidden px-3 lg:px-0">
                    <h3 className="text-xl font-semibold">Your Basket</h3>
                    <div className="mt-5 flex flex-col gap-3 divide-slate-200/70">
                      {cartItems?.map((item, i) => (
                        <CartRow key={i} item={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProudctView;
