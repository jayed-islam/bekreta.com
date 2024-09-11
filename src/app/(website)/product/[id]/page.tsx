import ProductsDetailsView from "@/sections/product/view/product-detail-view";
import { IGetSingleAndRelatedProductListResponse } from "@/types/products";
import React from "react";

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
  return <ProductsDetailsView id={id} data={data} />;
};

export default ProductDetailPage;
