"use client";

import React, { useEffect, useState } from "react";
import { IProduct, IProductItem } from "@/types/products";
import RelatedProductsSection from "../product-details-related-product-view";
import { queries } from "@/constants";
import Tab from "../product-details-sections";
import useBoolean from "@/hooks/use-boolean";
import SpecificationSection from "../product-details-sections/specification-section";
import DescriptionSection from "../product-details-sections/description-section";
import QuestionSection from "../product-details-sections/qurstion-section";
import ReviewSection from "../product-details-sections/review-section";
import LeftSideImageView from "../left-side-image-view";
import MiddleProductDescription from "../middle-product-description-view";
import { useGetProductByIdQuery } from "@/redux/reducers/product/productApi";
import { useAppDispatch } from "@/redux/hooks";
import { addLastVisitedProduct } from "@/redux/reducers/product/productSlice";

interface IProductDetailsProps {
  product?: IProductItem;
  id: string;
}

const ProductsDetailsView = ({ id, product }: IProductDetailsProps) => {
  const [activeTab, setActiveTab] = useState("Description");

  const { data, isLoading } = useGetProductByIdQuery(id);

  const questions = 0;

  const handleClick = (label: string) => {
    setActiveTab(label);
  };

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="lg:flex relative max-w-6xl mx-auto xl:px-0 gap-7 pt-5 pb-11 md:pt-16 md:pb-16">
          <div className="flex-1">
            <div className="md:flex itmes-start sm:px-5 lg:px-0 ">
              <LeftSideImageView product={data?.data as IProduct} />
              <MiddleProductDescription product={data?.data as IProduct} />
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
              <DescriptionSection
                activeTab={activeTab}
                descriptions={data?.data.descriptions as string[]}
              />
              {/* <QuestionSection
                activeTab={activeTab}
                questions={questions}
                product={data?.data as IProduct}
              /> */}
              <ReviewSection
                activeTab={activeTab}
                questions={questions}
                product={data?.data as IProduct}
              />
            </div>
          </div>

          <RelatedProductsSection category={data?.data.category as string} />
        </div>
      )}
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
    </>
  );
};

export default ProductsDetailsView;
