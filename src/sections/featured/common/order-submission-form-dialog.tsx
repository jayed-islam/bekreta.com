import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { BooleanState } from "@/types/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { RHFSelect, RHFTextField } from "@/components/react-hook-form";
import { IDivision } from "@/types/address";
import divisions from "@/data/division";
import useLocationSelect from "@/hooks/use-location";
import {
  selectTotal,
  setDistrictName,
} from "@/redux/reducers/featured/featuredProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { orderSubmissionSchema } from "./order-validation";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { useCreateFeaturedOrderMutation } from "@/redux/reducers/featured/featuredProductApi";

interface Props {
  dialog: BooleanState;
  successModal: BooleanState;
  setOrderID: any;
}

export default function OrderSubmissionFormDialog({
  dialog,
  successModal,
  setOrderID,
}: Props) {
  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: zodResolver(orderSubmissionSchema),
  });

  const { products: featuredProducts } = useAppSelector(
    (state) => state.featuredProduct
  );
  const totalPrice = useAppSelector(selectTotal);

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
        setOrderID(response.data._id);
        dialog.setFalse();
        reset();
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
    <React.Fragment>
      <Dialog
        open={dialog.value}
        onClose={dialog.setFalse}
        maxWidth="sm"
        fullWidth
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <DialogTitle>
            Provide your location details and make the order easy!!!
          </DialogTitle>
          <DialogContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
              <RHFTextField name="fullName" label="Full Name" />
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

              <RHFTextField
                name="detailAddress"
                label="Detail Address"
                className="lg:col-span-2"
              />
            </div>
          </DialogContent>
          <div className="flex items-center justify-end pr-5 pb-5 gap-5">
            <Button
              onClick={dialog.setFalse}
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
          </div>
        </FormProvider>
      </Dialog>
    </React.Fragment>
  );
}
