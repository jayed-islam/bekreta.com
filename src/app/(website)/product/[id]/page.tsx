import { Metadata } from "next";
import { FC } from "react";
import { redirect } from "next/navigation";
import { IProductItem } from "@/types/products";
import { gerProductById } from "@/utils/server-fun/fetch-product-by-id";
import { paths } from "@/layouts/paths";
import ProductsDetailsView from "@/sections/product/view/product-detail-view";

interface IProductProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: IProductProps): Promise<Metadata> {
  const { id } = params;
  const data: IProductItem = await gerProductById(id);

  return {
    title: data?.name ? data.name : "Not Found",
  };
}

const ProductDetailPage: FC<IProductProps> = async ({ params }) => {
  const { id } = params;

  const product: IProductItem = await gerProductById(id);

  if (product === undefined) {
    redirect(paths.page404);
  }

  return <ProductsDetailsView product={product} id={id} />;
};

export default ProductDetailPage;
