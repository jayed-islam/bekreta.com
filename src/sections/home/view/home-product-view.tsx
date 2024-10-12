"use client";

import ProductsSceleton from "@/components/skeleton/product-skeleton";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../layouts/common/product/product-card";
import { paths } from "@/layouts/paths";
import { IProduct } from "@/types/products";
import ProductCardNew from "@/layouts/common/product/product-new-card";
import QuickOrderDialog from "@/sections/quick-order/view/quick-order-dilaog";
import useBoolean from "@/hooks/use-boolean";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
  newItems: IProduct[];
  isLoading: boolean;
}

const HomeProductsView = ({ isLoading, newItems }: Props) => {
  const cardsArray = Array.from({ length: 11 }, (_, index) => index);
  const quickOrderDialog = useBoolean();
  const router = useRouter();
  return (
    <div className="w-full bg-gray-100">
      <div className="max-w-6xl mx-auto px-3 md:px-5 xl:px-0 pb-24">
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

        <div className="mt-9 flex items-center justify-center">
          <Button
            variant="contained"
            color="success"
            sx={{
              textTransform: "capitalize",
            }}
            onClick={() => router.push(paths.product.products)}
          >
            Show more
          </Button>
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
