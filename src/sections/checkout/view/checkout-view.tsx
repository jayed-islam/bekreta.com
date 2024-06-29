"use client";

import PageHeader from "@/components/common/page-header";
import { RHFSelect, RHFTextField } from "@/components/react-hook-form";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CheckoutProductRow from "../checkout-item-row";
import OrderSummery from "../../cart/common/order-summary";
import useLocationSelect from "@/hooks/use-location";
import { useAppDispatch } from "@/redux/hooks";
import divisions from "@/data/division";
import { IDivision } from "@/types/address";
import { addressData, addressOptions } from "@/constants";
import AddressCard from "../address-card";
import { Button, Card, Grid } from "@mui/material";
import { checkoutSchema } from "@/validations/checkout-validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";

const CheckoutProudctView = () => {
  const methods = useForm({
    resolver: zodResolver(checkoutSchema),
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
  }, [dispatch, districtValue, setSelectedDistrict]);

  useEffect(() => {
    setSelectedSubDistrict(subDistrictValue || "");
  }, [setSelectedSubDistrict, subDistrictValue]);

  const breadcrumbItems = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Checkout", url: "/checkout" },
  ];

  const test = [1, 1];

  const [selectedValue, setSelectedValue] = useState<string>(addressData[0].id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      ...data,
      division: selectedDivisionName,
      district: selectedDistrictName,
      subDistrict: selectedSubDistrictName,
    };
    try {
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });

  return (
    <div className="">
      <div className="bg-gray-100">
        <PageHeader pageName="Checkout" breadcrumbItems={breadcrumbItems} />
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
              <div className="flex flex-col lg:flex-row md:px-5 lg:px-0 py-9 ">
                <div className="flex-1">
                  <Card className="flex-1 md:rounded-2xl p-5 h-min">
                    <h3 className="text-2xl font-semibold mb-7">
                      Billing details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <RHFTextField name="name" label="Name" />
                      <RHFTextField name="email" label="Email" />
                      <RHFTextField name="phone" label="Phone" />

                      <RHFSelect
                        name="division"
                        label="Division"
                        options={Object.values(divisions).map(
                          (division: IDivision) => ({
                            value: division.id,
                            label: division.name,
                          })
                        )}
                      />

                      <RHFSelect
                        name="district"
                        label="District"
                        options={filteredDistricts.map((district) => ({
                          value: district.id,
                          label: district.name,
                        }))}
                        disabled={!selectedDivision}
                      />

                      <RHFSelect
                        name="subDistrict"
                        label="SubDistrict"
                        options={filteredSubDistricts.map((subDistrict) => ({
                          value: subDistrict.id,
                          label: subDistrict.name,
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
                <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 my-5 lg:my-0 lg:mx-11"></div>
                <div className="w-full lg:w-[35%] md:rounded-2xl">
                  {/* summary */}
                  <OrderSummery
                    buttonTitle="Place Order"
                    isSubmit
                    onSubmit={() => {}}
                  />

                  {/* <div className="bg-white md:rounded-2xl p-5 md:p-5 mt-5">
                    <h3 className="text-xl font-semibold pb-3">Your Basket</h3>
                    <div className="mt-5 flex flex-col gap-3 divide-slate-200/70">
                      {[1, 2, 3].map((items, i) => (
                        <CheckoutProductRow />
                      ))}
                    </div>
                  </div> */}
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
