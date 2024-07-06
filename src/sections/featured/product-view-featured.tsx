import React from "react";
import ImageViewFeatured from "./image-view-featured";
import { IProduct } from "@/types/products";
import { Divider, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import FeaturedProductCheckoutItem from "./cart-product-item-featured";

interface Props {
  product: IProduct;
}

const ProductViewFeatured = ({ product }: Props) => {
  return (
    <div className="lg:flex max-w-6xl mx-auto xl:px-0 gap-7 pt-5 pb-11 md:pt-16 md:pb-16">
      <div className="flex-1">
        <ImageViewFeatured images={product.images} />
      </div>
      <Stack spacing={2}>
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
              <Typography variant="body1">Shipping Fee</Typography>
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
                ৳ {total}
              </Typography>
            </div>

            <LoadingButton
              type="submit"
              size="large"
              loading={isLoading}
              className="bg-[rgb(235,106,42)] text-white capitalize w-full py-2 mt-5 rounded-xl hover:bg-[rgb(235,106,42)]"
            >
              Place Order
            </LoadingButton>
          </div>
        </div>
        <div className="bg-gray-100 rounded-xl">
          <div className="p-3 bg-white border rounded-t-xl">
            <h2 className="text-md font-semibold">Your Basket</h2>
          </div>
          <div className="p-3">
            {products.map((product, index) => (
              <FeaturedProductCheckoutItem featuredItem={} key={index} />
            ))}
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default ProductViewFeatured;
