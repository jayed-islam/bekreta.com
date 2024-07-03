import { paths } from "@/layouts/paths";
import { useAppSelector } from "@/redux/hooks";
import {
  selectCartSubtotal,
  selectCartTotalItems,
  selectCartTotalPrice,
  selectDeliveryCharge,
} from "@/redux/reducers/cart/cartSlice";
import { RootState } from "@/redux/store";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

interface Props {
  buttonTitle: string;
  isSubmit?: boolean;
  onSubmit?: VoidFunction;
}

const OrderSummery = ({ buttonTitle, isSubmit = false, onSubmit }: Props) => {
  const subtotal = useAppSelector((state: RootState) =>
    selectCartSubtotal(state)
  );
  const deliveryCharge = useAppSelector((state: RootState) =>
    selectDeliveryCharge(state)
  );
  const totalPrice = useAppSelector((state: RootState) =>
    selectCartTotalPrice(state)
  );
  const totalItems = useAppSelector((state: RootState) =>
    selectCartTotalItems(state)
  );
  return (
    <div
      className={`flex-1 px-5 py-5 md:rounded-2xl  bg-white h-min border ${
        isSubmit ? "" : "sticky top-28"
      }`}
    >
      <div className="">
        <div className="">
          <h3 className="text-lg font-semibold">Order Summary</h3>
        </div>
        <div className="mt-7 text-sm text-slate-500 divide-y divide-slate-200/70 ">
          <div className="flex justify-between pb-4">
            <span>Subtotal Items({totalItems})</span>
            <span className="font-semibold text-slate-900 text-lg">
              ৳{subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span>Delivery Charge (Inside Dhaka)</span>
            <span className="font-semibold text-slate-900 text-lg">
              ৳{deliveryCharge}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-slate-900  text-base pt-4">
            <span>Order total</span>
            <span className="text-xl  text-green-700">
              ৳{totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
        {isSubmit ? (
          <Button
            type="submit"
            onClick={onSubmit}
            className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 text-white disabled:bg-opacity-90 bg-green-600  hover:bg-green-700 shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 capitalize"
          >
            {buttonTitle}
          </Button>
        ) : (
          <Link
            href={paths.checkout}
            className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 text-white disabled:bg-opacity-90 bg-green-600  hover:bg-green-700 shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 "
          >
            {buttonTitle}
          </Link>
        )}
        <div className="mt-5 text-sm text-slate-500  flex items-center justify-center">
          <p className="block relative pl-5">
            <Icon icon="ph:info-light" />
            Learn more{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="##"
              className="text-slate-900  underline font-medium"
            >
              Taxes
            </a>{" "}
            and{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="##"
              className="text-slate-900  underline font-medium"
            >
              Shipping
            </a>{" "}
            information
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
