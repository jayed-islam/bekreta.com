import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  selectFeaturedOrderSubtotal,
  selectFeaturedOrderTotalPrice,
  selectTotalItems,
} from "@/redux/reducers/featured/featuredProductSlice";
import toast from "react-hot-toast";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { RHFTextField } from "@/components/react-hook-form";
import useBoolean from "@/hooks/use-boolean";
import { quickOrderSchema } from "@/validations/quick-order-validation";
import { useCreateOrderMutation } from "@/redux/reducers/order/orderApi";
import FeaturedOrderSummaryView from "./feature-order-summary-view";
import { useRouter } from "next/navigation";
import { paths } from "@/layouts/paths";

const MobileOrderForm = () => {
  const methods = useForm({
    resolver: zodResolver(quickOrderSchema),
  });

  const {
    products: featuredProducts,
    deliveryCharge,
    selectedDeliveryOption,
  } = useAppSelector((state) => state.featuredProduct);
  const { user } = useAppSelector((state) => state.auth);

  const successModal = useBoolean();

  const subtotal = useAppSelector(selectFeaturedOrderSubtotal);
  const totalPrice = useAppSelector(selectFeaturedOrderTotalPrice);
  const totalItem = useAppSelector(selectTotalItems);

  const router = useRouter();
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const [createOrder, { isLoading }] = useCreateOrderMutation();

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
      ...(user && { userId: user?._id as string }),
      phone: data.phone,
      name: data.name,
      address: data.address,
      ...(data.orderNote && { orderNote: data.orderNote }),
      totalPrice: totalPrice,
      products,
      deliveryArea: selectedDeliveryOption,
      deliveryCharge,
    };
    try {
      const response = await createOrder(payload).unwrap();

      console.log("res", response);
      if (response.success) {
        toast.success(response.message);
        reset();
        router.push(`${paths.success}?id=${response.data._id}`);
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
          <RHFTextField name="name" label="আপনার নাম" />
          <RHFTextField name="phone" label="মোবাইল নাম্বার" />
          <RHFTextField name="address" label="এড্রেস/ঠিকানা" />
        </div>
        <FeaturedOrderSummaryView type="submit" />
      </FormProvider>
    </div>
  );
};

export default MobileOrderForm;
