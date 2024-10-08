"use client";

import ProductsSceleton from "@/components/skeleton/product-skeleton";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../layouts/common/product/product-card";
import { paths } from "@/layouts/paths";
import { IProduct } from "@/types/products";
import ProductCardNew from "@/layouts/common/product/product-new-card";
import QuickOrderDialog from "@/sections/quick-order/view/quick-order-dilaog";
import useBoolean from "@/hooks/use-boolean";

interface Props {
  newItems: IProduct[];
  isLoading: boolean;
}

const HomeProductsView = ({ isLoading, newItems }: Props) => {
  const cardsArray = Array.from({ length: 11 }, (_, index) => index);
  const quickOrderDialog = useBoolean();
  return (
    <div className="w-full bg-gray-100">
      <div className="flex flex-col items-center justify-center pt-7 md:pt-16 pb-7">
        <h3 className="text-2xl md:text-3xl font-bold text-center">
          Exclusive Items
        </h3>
        <p className="text-md md:text-lg text-center">
          Best collections for you. check it!!
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-3 md:px-5 xl:px-0 pb-11">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-3 md:gap-x-5 gap-y-3 md:gap-y-5 ">
          {isLoading ? (
            <>
              {cardsArray.map((card, index) => (
                <ProductsSceleton key={index} />
              ))}
            </>
          ) : (
            newItems?.map((product, index) => (
              <ProductCardNew
                key={index}
                product={product}
                quickOrderDialog={quickOrderDialog}
              />
            ))
          )}
        </div>
      </div>

      <QuickOrderDialog
        onClose={quickOrderDialog.setFalse}
        open={quickOrderDialog.value}
      />
    </div>
  );
};

export default HomeProductsView;
