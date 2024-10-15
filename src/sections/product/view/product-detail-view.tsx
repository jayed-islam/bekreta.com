"use client";

import React, { useEffect, useState } from "react";
import {
  IGetSingleAndRelatedProductListResponse,
  IProduct,
  IProductItem,
} from "@/types/products";
import { queries } from "@/constants";
import Tab from "../product-details-sections";
import DescriptionSection from "../product-details-sections/description-section";
import ReviewSection from "../product-details-sections/product-review-section";
import LeftSideImageView from "../left-side-image-view";
import MiddleProductDescription from "../middle-product-description-view";
import useBoolean from "@/hooks/use-boolean";
import QuickOrderDialog from "@/sections/quick-order/view/quick-order-dilaog";
import RelatedProductView from "../product-details-related-product-view";
import RecentlyViewedProductView from "../product-details-recently-viewed-product-view";
import { useAppDispatch } from "@/redux/hooks";
import { addLastVisitedProduct } from "@/redux/reducers/product/productSlice";
import { CartItem } from "@/types/cart";
import ReactImageMagnify from "react-image-magnify";
import ImageMagnifyGallery from "../image-magnify-view";

interface IProductDetailsProps {
  product?: IProductItem;
  id: string;
  data: IGetSingleAndRelatedProductListResponse;
}

const ProductsDetailsView = ({ id, product, data }: IProductDetailsProps) => {
  const [activeTab, setActiveTab] = useState("Qualities");

  const questions = 0;

  const handleClick = (label: string) => {
    setActiveTab(label);
  };

  const quickOrderDialog = useBoolean();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data.data.product) {
      const item: CartItem = {
        productId: data.data.product._id,
        name: data.data.product.name,
        price: data.data.product.price,
        image: data.data.product.images[0],
        quantity: 1,
        category: data.data.product.category.name ?? "",
        about: data.data.product.about,
      };
      dispatch(addLastVisitedProduct(item));
    }
  }, [product, dispatch, data.data]);

  const isOutOfStock = data.data.product?.status === "OUT_OF_STOCK";

  console.log("status", data.data.product?.status, data.data.product?.stock);

  return (
    <>
      <div className="lg:flex max-w-6xl mx-auto xl:px-0 gap-7 pt-5 pb-11 md:pt-16 md:pb-16 relative">
        <div className="lg:flex-1 w-full">
          <div className="w-full lg:flex lg:items-start gap-7 sm:px-5 lg:px-0">
            <div className="hidden lg:flex w-full">
              <ImageMagnifyGallery images={data.data.product?.images} />
            </div>
            <div className="lg:hidden w-full">
              <LeftSideImageView product={data?.data.product as IProduct} />
            </div>

            <MiddleProductDescription
              product={data?.data.product as IProduct}
              quickOrderDialog={quickOrderDialog}
            />
          </div>

          <div className="flex-1 px-5 py-7  bg-gray-100 mt-11">
            <div className="flex items-center gap-3 flex-wrap sm:gap-3">
              {queries.map((que, index) => (
                <Tab
                  label={que.name}
                  activeTab={activeTab}
                  onClick={handleClick}
                  value={que.id}
                >
                  {que.name}
                </Tab>
              ))}
            </div>

            <DescriptionSection
              activeTab={activeTab}
              product={data.data.product as IProduct}
            />

            <ReviewSection
              activeTab={activeTab}
              product={data?.data.product as IProduct}
            />
          </div>
        </div>

        <div className="w-full lg:w-[301px] mt-5 lg:mt-0 h-min lg:sticky top-11">
          {data?.data?.relatedProducts.length > 0 && (
            <RelatedProductView
              relatedProducts={data?.data.relatedProducts as IProduct[]}
            />
          )}

          <RecentlyViewedProductView
            currentProductId={data?.data?.product?._id as string}
          />
        </div>
      </div>
      <QuickOrderDialog
        onClose={quickOrderDialog.setFalse}
        open={quickOrderDialog.value}
      />
    </>
  );
};

export default ProductsDetailsView;
