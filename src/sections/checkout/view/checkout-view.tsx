"use client";

import PageHeader from "@/components/common/page-header";
import { RHFSelect, RHFTextField } from "@/components/react-hook-form";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CheckoutProductRow from "../checkout-item-row";
import OrderSummery from "../../cart/common/order-summary";
import useLocationSelect from "@/hooks/use-location";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import divisions from "@/data/division";
import { IDivision } from "@/types/address";
import { addressData } from "@/constants";
import { Card } from "@mui/material";
import {
  checkoutSchema,
  TCheckoutFormData,
} from "@/validations/checkout-validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  selectCartTotalPrice,
  setDistrictId,
} from "@/redux/reducers/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/reducers/order/orderApi";
import { useRouter } from "next/navigation";
import { paths } from "@/layouts/paths";

const CheckoutProudctView = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const totalPrice = useAppSelector((state) => selectCartTotalPrice(state));

  const methods = useForm<TCheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const dispatch = useAppDispatch();

  const {
    selectedDivision,
    setSelectedDivision,
    selectedDistrict,
    setSelectedDistrict,
    filteredDistricts,
    filteredSubDistricts,
    setSelectedSubDistrict,
    selectedDivisionName,
    selectedDistrictName,
    selectedSubDistrictName,
  } = useLocationSelect();

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const divisionValue = watch("division");
  const districtValue = watch("district");
  const subDistrictValue = watch("subDistrict");

  useEffect(() => {
    setSelectedDivision(divisionValue || "");
  }, [divisionValue, setSelectedDivision]);

  useEffect(() => {
    setSelectedDistrict(districtValue || "");
    dispatch(setDistrictId(districtValue || ""));
  }, [dispatch, districtValue, setSelectedDistrict]);

  useEffect(() => {
    setSelectedSubDistrict(subDistrictValue || "");
  }, [setSelectedSubDistrict, subDistrictValue]);

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
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const payload = {
      userId: user?._id as string,
      phone: data.phone,
      userName: data.name,
      products,
      shippingAddress: {
        detailAddress: data.detailAddress,
        division: selectedDivisionName,
        district: selectedDistrictName,
        subDistrict: selectedSubDistrictName,
      },
      totalPrice: totalPrice,
    };

    const response = await createOrder(payload).unwrap();

    if (response.success) {
      toast.success(response.message);
      router.push(paths.success);
    } else {
      toast.success(response.message);
    }
    try {
    } catch (error) {
      console.error("Error submitting form:", error);
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
          <div className="w-full" ref={orderFromRef}>
            <FormProvider methods={methods} onSubmit={onSubmit}>
              {/* <div className="pt-9">
                <CheckoutInstantSignin />
              </div> */}
              <div className="flex flex-col lg:flex-row md:px-5 xl:px-0 py-9">
                <div className="flex-1 px-3 lg:px-0">
                  <Card className="flex-1 md:rounded-2xl  p-3 md:p-5 h-min">
                    <h3 className="text-2xl font-semibold mb-7">
                      Billing details
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      <RHFTextField name="name" label="Full name" />
                      <RHFTextField name="email" label="Email" />
                      <RHFTextField name="phone" label="Phone" />

                      <RHFSelect
                        name="division"
                        label="Division"
                        options={Object.values(divisions).map(
                          (division: IDivision) => ({
                            value: division.id,
                            label: division.bn_name,
                          })
                        )}
                      />

                      <RHFSelect
                        name="district"
                        label="District"
                        options={filteredDistricts.map((district) => ({
                          value: district.id,
                          label: district.bn_name,
                        }))}
                        disabled={!selectedDivision}
                      />

                      <RHFSelect
                        name="subDistrict"
                        label="SubDistrict"
                        options={filteredSubDistricts.map((subDistrict) => ({
                          value: subDistrict.id,
                          label: subDistrict.bn_name,
                        }))}
                        disabled={!selectedDistrict}
                      />
                    </div>
                    <RHFTextField
                      name="detailAddress"
                      label="Details Address"
                      placeholder="Home address, street number, home number etc."
                      fullWidth
                      sx={{
                        mt: 2,
                      }}
                      rows={4}
                      multiline
                    />
                  </Card>
                </div>
                <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 my-5 lg:my-0 md:mx-5 lg:mx-11"></div>
                <div className="w-full lg:w-[35%] md:rounded-2xl">
                  {/* summary */}

                  <div className="px-3 lg:px-0">
                    <OrderSummery
                      buttonTitle="Place Order"
                      isSubmit
                      onSubmit={() => {}}
                      isLoading={isLoading}
                    />
                  </div>

                  <div className="bg-white md:rounded-2xl p-5 md:p-5 mt-5">
                    <h3 className="text-xl font-semibold pb-3">Your Basket</h3>
                    <div className="mt-5 flex flex-col gap-3 divide-slate-200/70">
                      {cartItems?.map((product, i) => (
                        <CheckoutProductRow key={i} product={product} />
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
