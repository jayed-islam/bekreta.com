import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import React from "react";

const CheckoutOrderSummery = () => {
  return (
    <div className="flex-1">
      <div className="mt-9 px-3">
        <h3 className="text-xl font-semibold">Order Info</h3>
        <div className="mt-7 text-sm text-slate-500 divide-y divide-slate-200/70">
          <div className="flex justify-between pb-4">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-900 ">$50</span>
          </div>
          <div className="flex justify-between py-4">
            <span>Shipping estimate</span>
            <span className="font-semibold text-slate-900 ">$100.00</span>
          </div>
          <div className="flex justify-between py-4">
            <span>Tax estimate</span>
            <span className="font-semibold text-slate-900 ">$50</span>
          </div>
          <div className="flex justify-between font-semibold text-slate-900  text-base pt-4">
            <span>Order total</span>
            <span>$300</span>
          </div>
        </div>
        <button
          type="submit"
          className=" relative h-[60px] inline-flex items-center justify-center rounded-full transition-colors  font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 text-slate-50 shadow-xl mt-8 w-full bg-blue-gray-800
        hover:bg-blue-gray-900 text-white"
        >
          Confirm Order
        </button>
        <div className="mt-5 text-sm text-slate-500  flex items-center justify-center">
          <p className="relative pl-5 flex items-center gap-2">
            <Icon icon="ph:info-light" />
            Learn more{" "}
            <h3 className="text-slate-900  underline font-medium">
              Taxes
            </h3> and{" "}
            <h3 className="text-slate-900  underline font-medium">Shipping</h3>{" "}
            information
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutOrderSummery;
