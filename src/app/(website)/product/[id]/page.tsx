import LoadingSpinner from "@/components/loader/global-loading";
import { SplashScreen } from "@/components/loader/splash-screen";
import ProductsDetailsView from "@/sections/product/view/product-detail-view";
import { IGetSingleAndRelatedProductListResponse } from "@/types/products";
import React, { Suspense } from "react";

interface IProductProps {
  params: {
    id: string;
  };
}

const ProductDetailPage = async ({ params }: IProductProps) => {
  const { id } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/product/get-single-detail/${id}`,
    {
      cache: "no-store",
    }
  );
  const data: IGetSingleAndRelatedProductListResponse = await res.json();
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductsDetailsView id={id} data={data} />
    </Suspense>
  );
};

export default ProductDetailPage;
