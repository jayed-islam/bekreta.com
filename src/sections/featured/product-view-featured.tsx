"use client";

import React, { useEffect } from "react";
import ImageViewFeatured from "./image-view-featured";
import { IProduct } from "@/types/products";
import { Divider, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import FeaturedProductCheckoutItem from "./cart-product-item-featured";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectShippingFee,
  selectSubtotal,
  selectTotal,
  selectTotalItems,
  setFeaturedProduct,
} from "@/redux/reducers/featured/featuredProductSlice";
import { useGetStatusWiseFeaturedProductsQuery } from "@/redux/reducers/featured/featuredProductApi";
import {
  getProductStatus,
  getStatusStyles,
} from "../product/common/product-constants";

interface Props {}

const ProductViewFeatured = ({}: Props) => {
  const { products } = useAppSelector((state) => state.featuredProduct);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetStatusWiseFeaturedProductsQuery();

  useEffect(() => {
    if (data && data.data && Object.keys(data).length > 0) {
      dispatch(setFeaturedProduct(data.data as IProduct));
    }
  }, [data, dispatch]);

  const subtotal = useAppSelector(selectSubtotal);
  const total = useAppSelector(selectTotal);
  const shippingFee = useAppSelector(selectShippingFee);
  const totalItem = useAppSelector(selectTotalItems);

  // const {
  //   name = "",
  //   images = [],
  //   price = 0,
  //   stock = 0,
  //   status = "",
  //   specifications = [],
  // } = data?.data as IProduct;
  return (
    <div className="max-w-6xl mx-auto xl:px-0 gap-7 pt-5 pb-11 md:pb-16">
      {/* <Typography variant="h5" className="pb-1.5 font-semibold">
        {data?.data.name}
      </Typography>
      <Divider /> */}
      <div className="lg:flex mt-3">
        <>
          <div className="flex-1 flex gap-5 items-start">
            {isLoading ? (
              <div className="animate-pulse">
                <div className=" bg-slate-200 h-[300px] md:h-[300px] xl:h-[371px] md:w-[351px] lg:w-[400px] border rounded-xl"></div>
                {/* <div className="flex-1 space-y-4 py-1">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                  </div> */}
              </div>
            ) : (
              <ImageViewFeatured
                images={data?.data.images || []}
                name={data?.data.name || ""}
              />
            )}

            <div>
              <Typography variant="h5" className="pb-1.5 font-semibold">
                {data?.data.name}
              </Typography>
              <div className="py-5">
                <Typography className="text-md font-semibold mb-2">
                  Specification
                </Typography>
                {data?.data.specifications.map((item, index) => (
                  <h2 className="text-sm md:text-md">{item}</h2>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <h2 className="text-xl">Price:</h2>
                <h2 className="text-xl md:text-2xl font-bold text-green-500">
                  ৳{data?.data.price}
                </h2>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <h2 className="text-lg">Stock:</h2>
                <h2 className="text-lg md:text-xl font-bold">
                  {data?.data.stock}{" "}
                  <span className="font-normal">items only</span>
                </h2>
              </div>
            </div>
          </div>
          <Stack spacing={2} className="w-[31%]">
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
                  loading={false}
                  className="bg-green-500 text-white capitalize w-full py-2 mt-5 rounded-xl hover:bg-green-600"
                >
                  Place Order
                </LoadingButton>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl">
              <div className="p-3 bg-white border rounded-t-xl">
                <h2 className="text-md font-semibold">Your Basket</h2>
              </div>
              <div className="p-3 flex flex-col gap-3">
                {isLoading ? (
                  <div className="animate-pulse flex space-x-4 bg-white p-2 rounded-xl">
                    <div className=" bg-slate-200 h-16 w-16 border rounded-xl"></div>
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-2 bg-slate-200 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  products.map((product, index) => (
                    <FeaturedProductCheckoutItem
                      featuredItem={product}
                      key={index}
                    />
                  ))
                )}
              </div>
            </div>
          </Stack>
        </>
      </div>
    </div>
  );
};

export default ProductViewFeatured;
