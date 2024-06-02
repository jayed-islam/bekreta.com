"use client";

import React, { RefObject, useEffect, useRef, useState } from "react";
import { IProductItem } from "@/types/products";
import RelatedProductsSection from "../product-details-related-product-view";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { features, queries, socialInfo } from "@/constants";
import QuestionTab from "../product-details-sections/qurstion-section";
import ReviewTab from "../product-details-sections/review-section";
import DescriptionTab from "../product-details-sections/description-section";
import Tab from "../product-details-sections";
import useBoolean from "@/hooks/use-boolean";
import CartSidebar from "@/components/common/add-to-carted-product-notify-view";
import SpecificationSection from "../product-details-sections/specification-section";
import DescriptionSection from "../product-details-sections/description-section";
import QuestionSection from "../product-details-sections/qurstion-section";
import ReviewSection from "../product-details-sections/review-section";
import LeftSideImageView from "../left-side-image-view";
import MiddleProductDescription from "../middle-product-description-view";

interface IProductDetailsProps {
  product: IProductItem;
  id: string;
}

const ProductsDetailsView = ({ id, product }: IProductDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState("Specification");
  const [relatedProducts, setRelatedProducts] = useState<IProductItem[]>([]);
  const { name, price, desc, review, images, _id, status, brand, category } =
    product;

  // for image zoom in out

  const questions = 0;
  const sidebar = useBoolean();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/shop/related?category=${category}&page=${page}&size=${size}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data?.status === "success") {
            setRelatedProducts(data?.data);
            setCount(data?.count);
            setIsLoading(false);
          }
        } else {
          console.error("Failed to fetch products");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error while fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page, count, size, category]);

  const handleClick = (label: string) => {
    setActiveTab(label);
  };

  return (
    <>
      <div className="lg:flex relative max-w-6xl mx-auto xl:px-0 gap-7 pt-5 pb-11 md:pt-16 md:pb-16">
        <div className="flex-1">
          <div className="md:flex itmes-start sm:px-5 lg:px-0 ">
            <LeftSideImageView images={images} />
            <MiddleProductDescription product={product} />
          </div>

          <div className="flex-1 px-3 py-7 md:mt-9 bg-gray-100 mt-11">
            <div className="flex items-center gap-3 flex-wrap sm:gap-3">
              {queries.map((que, index) => (
                <Tab
                  label={que.name}
                  activeTab={activeTab}
                  onClick={handleClick}
                >
                  {que.name} 0
                </Tab>
              ))}
            </div>

            <SpecificationSection activeTab={activeTab} />
            <DescriptionSection activeTab={activeTab} />
            <QuestionSection
              activeTab={activeTab}
              questions={questions}
              product={product}
            />
            <ReviewSection
              activeTab={activeTab}
              questions={questions}
              product={product}
            />
          </div>
        </div>

        <RelatedProductsSection
          recentItems={relatedProducts.slice(0, 3)}
          relatedProducts={relatedProducts.slice(3, 6)}
        />
      </div>
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
      {sidebar.value && <CartSidebar dialog={sidebar} />}
    </>
  );
};

export default ProductsDetailsView;
