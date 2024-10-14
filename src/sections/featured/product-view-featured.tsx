"use client";

import React, { useEffect, useState } from "react";
import ImageViewFeatured from "./image-view-featured";
import { IGetFeaturedProductResponse, IProduct } from "@/types/products";
import { Button, Divider, Typography } from "@mui/material";
import FeaturedProductCheckoutItem from "./common/cart-product-item-featured";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectFeaturedOrderSubtotal,
  selectFeaturedOrderTotalPrice,
  selectSubtotal,
  selectTotalItems,
  setFeaturedProduct,
} from "@/redux/reducers/featured/featuredProductSlice";
import OfferedProductViewFeatued from "./offered-product-view-featured";
import useResponsive from "@/hooks/use-responsive";
import useBoolean from "@/hooks/use-boolean";
import OrderSubmissionFormDialog from "./common/order-submission-form-dialog";

import MobileOrderForm from "./common/mobile-order-form";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import FeaturedOrderSummaryView from "./common/feature-order-summary-view";
import FeatureOrderSubmissionDialog from "./common/order-submission-form-dialog";

interface Props {
  data: IGetFeaturedProductResponse;
}

const ProductViewFeatured = ({ data }: Props) => {
  const { products } = useAppSelector((state) => state.featuredProduct);
  const dispatch = useAppDispatch();
  const [orderId, setOrderID] = useState("");

  useEffect(() => {
    if (data && data.data && Object.keys(data).length > 0) {
      dispatch(setFeaturedProduct(data.data.featuredProduct as IProduct));
    }
  }, [data, dispatch]);

  const dialog = useBoolean();

  const handleSubmit = () => {
    dialog.setTrue();
  };

  return (
    <div className="max-w-6xl mx-auto xl:px-0 gap-7 pt-5 pb-11 md:pb-16 px-5">
      <div className="lg:flex mt-3 gap-7 md:gap-0">
        <div className="flex-1">
          <div className="flex-1 flex gap-5 items-start md:flex-row flex-col">
            {/* {isLoading ? (
              <div className="animate-pulse w-full">
                <div className=" bg-slate-200 h-[300px] md:h-[300px] xl:h-[371px] md:w-[351px] lg:w-[400px] w-full border rounded-xl"></div>
              </div>
            ) : (
              <ImageViewFeatured
                images={data?.data.featuredProduct.images || []}
                name={data?.data.featuredProduct.name || ""}
                isDetailsViewDialog={false}
              />
            )} */}
            <ImageViewFeatured
              images={data?.data.featuredProduct.images || []}
              name={data?.data.featuredProduct.name || ""}
              isDetailsViewDialog={false}
            />

            <div className="w-full md:w-[65%] pr-5">
              {/* {isLoading ? (
                <div className="animate-pulse w-full">
                  <div className="bg-gray-200 h-3 w-full rounded-md"></div>
                  <div className="bg-gray-200 h-3 w-full mt-2 rounded-md"></div>
                  <div className="flex flex-col space-y-2  my-5">
                    <div className="bg-gray-200 h-4 w-36 rounded-md"></div>
                    <div className="bg-gray-200 h-4 w-48 rounded-md"></div>
                    <div className="bg-gray-200 h-4 w-40 rounded-md"></div>
                    <div className="bg-gray-200 h-4 w-40 rounded-md"></div>
                  </div>
                  <div className="animate-pulse bg-gray-200 h-6 w-20 rounded-md"></div>
                  <div className="bg-gray-200 h-3 mt-7 w-44 rounded-md"></div>
                </div>
              ) : (
                <div>
                  <Typography variant="h5" className="pb-1.5 font-semibold">
                    {data?.data.featuredProduct.name}
                  </Typography>
                  <div className="py-5">
                    <Typography className="text-md font-semibold mb-2">
                      Specification
                    </Typography>
                    {data?.data.featuredProduct.specifications.map(
                      (item, index) => (
                        <h2 className="text-sm md:text-md">{item}</h2>
                      )
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <h2 className="text-xl">Price:</h2>
                    <h2 className="text-xl md:text-2xl font-bold text-green-500">
                      ৳{data?.data.featuredProduct.price}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <h2 className="text-lg">Stock:</h2>
                    <h2 className="text-lg md:text-xl font-bold">
                      {data?.data.featuredProduct.stock}{" "}
                      <span className="font-normal">items only</span>
                    </h2>
                  </div>
                </div>
              )} */}

              <div>
                <h2 className="pb-1.5 font-semibold text-xl md:text-2xl">
                  {data?.data.featuredProduct.name}
                </h2>

                <h2 className="text-xl md:text-2xl font-bold text-green-700 mt-5">
                  ৳{data?.data.featuredProduct.price}{" "}
                  <span className="text-black">টাকা</span>
                </h2>

                <Button
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    mt: 2,
                    display: {
                      lg: "flex",
                      xs: "none",
                    },
                    borderRadius: 2,
                  }}
                  color="success"
                  startIcon={<HiOutlineShoppingBag />}
                  onClick={dialog.setTrue}
                >
                  অর্ডার করুন
                </Button>

                <div className="flex items-center gap-3 mt-3">
                  <h2 className="text-lg">Stock:</h2>
                  <h2 className="text-lg md:text-xl font-bold">
                    {data?.data.featuredProduct.stock}{" "}
                    <span className="font-normal">items only</span>
                  </h2>
                </div>
                <h2 className="text-sm mt-5 font-medium">
                  {data?.data.featuredProduct.about}
                </h2>
                <div className="py-5">
                  <h2 className="text-md font-semibold mb-2">Specification</h2>
                  <div className="flex flex-col gap-2">
                    {data?.data.featuredProduct.specifications.map((item) => (
                      <li className="text-sm md:text-md">{item}</li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* offered product view */}
          <div className="md:flex hidden">
            <OfferedProductViewFeatued
              products={data?.data.offerProducts as IProduct[]}
            />
          </div>
        </div>
        <div className="w-full md:w-[331px] mt-7 md:mt-0" id="mybasket">
          <div className="bg-gray-100 rounded-xl">
            <div className="p-3 bg-white border rounded-t-xl">
              <h2 className="text-md font-semibold">Your Basket</h2>
            </div>
            <div className="p-3">
              {/* {isLoading ? (
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
                products.map((product, index) => {
                  const isCurrentFeatured =
                    product.product.name === data?.data.featuredProduct.name;
                  return (
                    <FeaturedProductCheckoutItem
                      featuredItem={product}
                      isCurrentFeatured={isCurrentFeatured}
                      key={index}
                    />
                  );
                })
              )} */}
              {products.map((product, index) => {
                const isCurrentFeatured =
                  product.product.name === data?.data.featuredProduct.name;
                return (
                  <FeaturedProductCheckoutItem
                    featuredItem={product}
                    isCurrentFeatured={isCurrentFeatured}
                    key={index}
                  />
                );
              })}
            </div>
          </div>

          <div className="md:hidden mt-5" id="orderform">
            <MobileOrderForm />
          </div>

          <div className="rounded-xl border hidden md:block mt-5">
            <FeaturedOrderSummaryView onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <div className="flex md:hidden">
        <OfferedProductViewFeatued
          products={data?.data.offerProducts as IProduct[]}
        />
      </div>
      <FeatureOrderSubmissionDialog
        onClose={dialog.setFalse}
        open={dialog.value}
      />
    </div>
  );
};

export default ProductViewFeatured;
