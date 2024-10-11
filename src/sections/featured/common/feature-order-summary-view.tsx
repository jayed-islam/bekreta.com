import { useAppSelector } from "@/redux/hooks";
import {
  selectFeaturedOrderSubtotal,
  selectFeaturedOrderTotalPrice,
  selectTotalItems,
} from "@/redux/reducers/featured/featuredProductSlice";
import FeaturedOrderDeliveryOptions from "@/sections/quick-order/feature-order-delivery-option";
import { LoadingButton } from "@mui/lab";
import React from "react";

interface Props {
  type?: "submit" | "button";
  onSubmit?: () => void;
}

const FeaturedOrderSummaryView = ({ onSubmit, type = "button" }: Props) => {
  const { deliveryCharge } = useAppSelector((state) => state.featuredProduct);

  const subtotal = useAppSelector(selectFeaturedOrderSubtotal);
  const totalPrice = useAppSelector(selectFeaturedOrderTotalPrice);
  const totalItem = useAppSelector(selectTotalItems);
  return (
    <div className="rounded-xl border">
      <div className="p-3 bg-gray-100 border-b rounded-t-xl">
        <h2 className="text-md font-semibold">Order Summary</h2>
      </div>
      <div className="p-3 flex flex-col gap-3">
        <FeaturedOrderDeliveryOptions />
        <div className="text-md">
          <div className="flex justify-between">
            <span>সাব টোটাল ({totalItem} টি)</span>
            <span className="font-semibold">Tk {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>ডেলিভারি চার্জ</span>
            <span className="font-bold">Tk {deliveryCharge}</span>
          </div>
          <div className="flex justify-between border-t mt-2 pt-2 border-gray-300 text-xl">
            <span className="font-semibold text-lg">সর্বমোট</span>
            <span className="font-bold">Tk {totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <LoadingButton
          type={type}
          size="large"
          color="success"
          variant="contained"
          onClick={type === "button" ? onSubmit : undefined}
          sx={{
            textTransform: "capitalize",
            mt: 1,
            borderRadius: 2,
          }}
        >
          Place Order
        </LoadingButton>
      </div>
    </div>
  );
};

export default FeaturedOrderSummaryView;
