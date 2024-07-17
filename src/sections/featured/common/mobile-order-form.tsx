import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { orderSubmissionSchema } from "./order-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  selectShippingFee,
  selectSubtotal,
  selectTotal,
  selectTotalItems,
  setDistrictName,
} from "@/redux/reducers/featured/featuredProductSlice";
import useLocationSelect from "@/hooks/use-location";
import { useCreateFeaturedOrderMutation } from "@/redux/reducers/featured/featuredProductApi";
import toast from "react-hot-toast";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { RHFSelect, RHFTextField } from "@/components/react-hook-form";
import divisions from "@/data/division";
import { IDivision } from "@/types/address";
import { LoadingButton } from "@mui/lab";
import { Divider, Typography } from "@mui/material";
import useBoolean from "@/hooks/use-boolean";
import OrderSuccessModal from "./success-order-dialog";

const MobileOrderForm = () => {
  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: zodResolver(orderSubmissionSchema),
  });

  const { products: featuredProducts, selectedDistrict: districtNumber } =
    useAppSelector((state) => state.featuredProduct);

  const successModal = useBoolean();
  const totalPrice = useAppSelector(selectTotal);

  const [orderId, setOrderID] = useState("");

  const subtotal = useAppSelector(selectSubtotal);
  const shippingFee = useAppSelector(selectShippingFee);
  const totalItem = useAppSelector(selectTotalItems);

  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = methods;

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

  const divisionValue = watch("division");
  const districtValue = watch("district");
  const subDistrictValue = watch("subDistrict");

  useEffect(() => {
    setSelectedDivision(divisionValue || "");
  }, [divisionValue, setSelectedDivision]);

  useEffect(() => {
    setSelectedDistrict(districtValue || "");
    dispatch(setDistrictName(districtValue || ""));
  }, [dispatch, districtValue, setSelectedDistrict]);

  useEffect(() => {
    setSelectedSubDistrict(subDistrictValue || "");
  }, [setSelectedSubDistrict, subDistrictValue]);

  const [createFeaturedOrder, { isLoading }] = useCreateFeaturedOrderMutation();

  const orderFromRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Object.keys(errors).length > 0 && orderFromRef.current) {
      orderFromRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [errors]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    if (featuredProducts.length === 0) {
      toast.error("Please add minimum 1 product for checkout");
      return;
    }

    const products = featuredProducts.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const payload = {
      phone: data.phone,
      fullName: data.fullName,
      products,
      shippingAddress: {
        detailAddress: data.detailAddress,
        division: selectedDivisionName,
        district: selectedDistrictName,
        subDistrict: selectedSubDistrictName,
      },
      totalPrice: Number(totalPrice),
    };

    try {
      const response = await createFeaturedOrder(payload).unwrap();

      console.log("res", response);
      if (response.success) {
        toast.success(response.message);
        reset();
        setOrderID(response.data._id);
        successModal.setTrue();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.data.message);
    }
  });

  return (
    <div ref={orderFromRef}>
      <h2 className="text-xl font-semibold">Add your Biling details</h2>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-5">
          <RHFTextField name="fullName" label="Full Name" />
          <RHFTextField name="phone" label="Phone" />

          <div className="flex gap-3">
            <RHFSelect
              name="division"
              label="Division"
              options={Object.values(divisions).map((division: IDivision) => ({
                value: division.id,
                label: division.bn_name,
              }))}
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
          </div>

          <RHFSelect
            name="subDistrict"
            label="SubDistrict"
            options={filteredSubDistricts.map((subDistrict) => ({
              value: subDistrict.id,
              label: subDistrict.bn_name,
            }))}
            disabled={!selectedDistrict}
          />

          <RHFTextField
            name="detailAddress"
            label="Detail Address"
            className="lg:col-span-2"
          />
        </div>
        {/* <div className="flex items-center justify-end pr-5 pb-5 gap-5">
          <Button
            variant="contained"
            className="bg-red-500 hover:bg-red-600 capitalize"
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={dialog.setTrue}
            autoFocus
            loading={isLoading}
            type="submit"
            variant="contained"
            className="bg-green-500 hover:bg-green-600 capitalize"
          >
            Confirm Order
          </LoadingButton>
        </div> */}
        <div className="rounded-xl border">
          <div className="p-3 bg-gray-100 border-b rounded-t-xl">
            <h2 className="text-md font-semibold">Order Summary</h2>
          </div>
          <div className="p-3 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Typography variant="body1">
                Subtotal ({totalItem} Items)
              </Typography>
              <Typography variant="subtitle1" className="font-semibold">
                ৳ {subtotal}
              </Typography>
            </div>
            <div className="flex items-center justify-between">
              <Typography variant="body1">
                Shipping Fee (
                {districtNumber === "1" ? "Inside Dhaka" : "Outside Dhaka"})
              </Typography>
              <Typography variant="subtitle1" className="font-semibold">
                ৳ {shippingFee}
              </Typography>
            </div>
            <Divider />
            <div className="flex items-center justify-between">
              <Typography variant="body1" className="font-semibold">
                Total
              </Typography>
              <Typography variant="subtitle1" className="font-semibold">
                ৳ {totalPrice}
              </Typography>
            </div>

            <LoadingButton
              type="submit"
              size="large"
              loading={isLoading}
              disabled={isLoading}
              className={`bg-green-500 text-white capitalize w-full py-2 mt-5  hover:bg-green-600 disabled:bg-gray-300`}
            >
              Place Order
            </LoadingButton>
          </div>
        </div>
      </FormProvider>
      <OrderSuccessModal dialog={successModal} orderId={orderId} />
    </div>
  );
};

export default MobileOrderForm;
