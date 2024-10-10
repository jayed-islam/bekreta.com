"use client";

import React, { useState } from "react";
import {
  IGetSingleAndRelatedProductListResponse,
  IProduct,
  IProductItem,
} from "@/types/products";
import RelatedProductsSection from "../product-details-related-product-view";
import { queries } from "@/constants";
import Tab from "../product-details-sections";
import DescriptionSection from "../product-details-sections/description-section";
import ReviewSection from "../product-details-sections/product-review-section";
import LeftSideImageView from "../left-side-image-view";
import MiddleProductDescription from "../middle-product-description-view";
import useBoolean from "@/hooks/use-boolean";
import QuickOrderDialog from "@/sections/quick-order/view/quick-order-dilaog";

interface IProductDetailsProps {
  product?: IProductItem;
  id: string;
  data: IGetSingleAndRelatedProductListResponse;
}

const ProductsDetailsView = ({ id, product, data }: IProductDetailsProps) => {
  const [activeTab, setActiveTab] = useState("Reviews");

  // const { data, isLoading } = useGetSingleWithRelatedProductQuery(id);

  const questions = 0;

  const handleClick = (label: string) => {
    setActiveTab(label);
  };

  const quickOrderDialog = useBoolean();

  return (
    <>
      <div className="lg:flex relative max-w-6xl mx-auto xl:px-0 gap-7 pt-5 pb-11 md:pt-16 md:pb-16">
        <div className="flex-1">
          <div className="md:flex itmes-start sm:px-5 lg:px-0 ">
            <LeftSideImageView product={data?.data.product as IProduct} />
            <MiddleProductDescription
              product={data?.data.product as IProduct}
              quickOrderDialog={quickOrderDialog}
            />
          </div>

          <div className="flex-1 px-3 py-7 md:mt-9 bg-gray-100 mt-11">
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

            {/* <SpecificationSection activeTab={activeTab} /> */}

            {/* <QuestionSection
                activeTab={activeTab}
                questions={questions}
                product={data?.data as IProduct}
              /> */}
            <ReviewSection
              activeTab={activeTab}
              questions={questions}
              product={data?.data.product as IProduct}
            />
            <DescriptionSection
              activeTab={activeTab}
              descriptions={data?.data.product?.descriptions as string[]}
            />
          </div>
        </div>

        <div className="w-full lg:w-[301px] mt-5 lg:mt-0">
          {data.data.relatedProducts.length > 0 && (
            <RelatedProductsSection
              currentProductId={data?.data.product._id as string}
              relatedProducts={data?.data.relatedProducts as IProduct[]}
            />
          )}
        </div>
      </div>
      {/* {isLoading ? (
        <ProductDetailLoader />
      ) : (
        
      )} */}
      {/* {isLightboxOpen && (
          <Lightbox
            mainSrc={images[lightboxIndex]}
            nextSrc={images[(lightboxIndex + 1) % images.length]}
            prevSrc={
              images[(lightboxIndex - 1 + images.length) % images.length]
            }
            onCloseRequest={handleLightboxClose}
            onMovePrevRequest={handlePrevImage}
            onMoveNextRequest={handleNextImage}
            imageTitle={`Image ${lightboxIndex + 1} of ${images.length}`}
          />
        )} */}
      <QuickOrderDialog
        onClose={quickOrderDialog.setFalse}
        open={quickOrderDialog.value}
      />
    </>
  );
};

export default ProductsDetailsView;
