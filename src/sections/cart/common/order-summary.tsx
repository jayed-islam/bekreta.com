import { paths } from "@/layouts/paths";
import { useAppSelector } from "@/redux/hooks";
import {
  selectCartSubtotal,
  selectCartTotalItems,
  selectCartTotalPrice,
} from "@/redux/reducers/cart/cartSlice";
import { RootState } from "@/redux/store";
import DeliveryOptionsComponent from "@/sections/quick-order/order-delivery-option";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

interface Props {
  buttonTitle: string;
  isSubmit?: boolean;
  onSubmit?: VoidFunction;
  isLoading?: boolean;
}

const OrderSummery = ({
  buttonTitle,
  isSubmit = false,
  onSubmit,
  isLoading,
}: Props) => {
  const { cartItems, district } = useAppSelector((state) => state.cart);
  const subtotal = useAppSelector((state: RootState) =>
    selectCartSubtotal(state)
  );
  const totalPrice = useAppSelector((state: RootState) =>
    selectCartTotalPrice(state)
  );
  const totalItems = useAppSelector((state: RootState) =>
    selectCartTotalItems(state)
  );
  return (
    <div
      className={`flex-1 px-5 py-5 md:rounded-2xl  bg-white h-min border shadow ${
        isSubmit ? "" : "sticky top-28"
      }`}
    >
      <div className="">
        <h3 className="text-lg md:text-xl font-semibold">Order Summary</h3>
        <div className="mt-7 text-sm text-slate-500">
          <div className="flex justify-between pb-4">
            <span>Subtotal Items({totalItems})</span>
            <span className="font-semibold text-slate-900 text-lg">
              ৳{subtotal.toFixed(2)}
            </span>
          </div>
          {/* delevaru ahareg */}
          <DeliveryOptionsComponent />
          <div className="flex justify-between font-semibold text-slate-900  text-base pt-4">
            <span>Order total</span>
            <span className="text-xl  text-green-700">
              ৳{totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
        {cartItems.length === 0 && (
          <div className="mt-5">
            <h3 className="text-md mb-5">
              আপনার কার্ট খালি। প্রিয় পণ্য পেতে পণ্য যোগ করুন।
            </h3>
            <Link href={paths.product.category}>
              <Button
                variant="contained"
                color="success"
                size="large"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                পণ্য দেখুন
              </Button>
            </Link>
          </div>
        )}
        {isSubmit ? (
          <LoadingButton
            type="submit"
            onClick={onSubmit}
            variant="contained"
            size="large"
            color="success"
            fullWidth
            disabled={cartItems.length === 0 || isLoading}
            loading={isLoading}
            sx={{
              textTransform: "capitalize",
              mt: 3,
            }}
          >
            {buttonTitle}
          </LoadingButton>
        ) : (
          <Link href={paths.checkout}>
            <Button
              disabled={cartItems.length === 0}
              type="button"
              fullWidth
              color="success"
              variant="contained"
              size="large"
              sx={{
                textTransform: "capitalize",
                mt: 3,
                borderRadius: "0.5rem",
              }}
            >
              {buttonTitle}
            </Button>
          </Link>
        )}
        <div className="mt-5 text-sm text-slate-500  flex items-center justify-center">
          <p className="block relative pl-5">
            <Icon icon="ph:info-light" />
            Learn more{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="##"
              className="text-slate-900  underline font-medium"
            >
              Bikreta
            </Link>{" "}
            and{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="##"
              className="text-slate-900  underline font-medium"
            >
              Shipping
            </Link>{" "}
            information
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
