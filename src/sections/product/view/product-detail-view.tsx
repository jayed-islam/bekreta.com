"use client";

import React, { RefObject, useEffect, useRef, useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { IProductItem } from "@/types/products";
import RelatedProductsSection from "../common/product-details-related-product-view";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { features, queries, socialInfo } from "@/constants";
import QuestionTab from "../product-details-tab/qurstion-tab";
import ReviewTab from "../product-details-tab/review-tab";
import DescriptionTab from "../product-details-tab/description-tab";
import Tab from "../product-details-tab";
import useBoolean from "@/hooks/use-boolean";
import CartSidebar from "@/components/common/add-to-carted-product-notify-view";

interface IProductDetailsProps {
  product: IProductItem;
  id: string;
}

const ProductsDetailsView = ({ id, product }: IProductDetailsProps) => {
  const [isLove, setIsLove] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState("Specification");
  const [relatedProducts, setRelatedProducts] = useState<IProductItem[]>([]);
  const { name, price, desc, review, images, _id, status, brand, category } =
    product;
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // for image zoom in out
  const productImageRef: RefObject<HTMLImageElement> = useRef(null);

  const handleImageZoom = (e: React.MouseEvent<HTMLImageElement>) => {
    const image = productImageRef.current;
    if (image) {
      const { left, top, width, height } = image.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const xPercent = (x / width) * 100;
      const yPercent = (y / height) * 100;
      image.style.transformOrigin = `${xPercent}% ${yPercent}%`;
      image.style.transform = "scale(1.5)";
    }
  };

  const handleImageZoomReset = () => {
    const image = productImageRef.current;
    if (image) {
      image.style.transform = "scale(1)";
    }
  };

  const questions = 0;
  const sidebar = useBoolean();

  // data fatching related product
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

  const handleImageClick = async (index: number) => {
    for (let i = 0; i < images.length; i++) {
      if (i !== index) {
        await new Promise((resolve) => {
          const img = new Image();
          img.src = images[i];
          img.onload = resolve;
        });
      }
    }

    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setIsLightboxOpen(false);
    setLightboxIndex(0);
  };

  const handlePrevImage = () => {
    setLightboxIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNextImage = () => {
    setLightboxIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleClick = (label: string) => {
    setActiveTab(label);
  };

  return (
    <div>
      <div className="  bg-white xl:p-0 ">
        <div className="lg:flex relative pt-5 md:pt-11 pb-16 shadow-md ">
          <div className="lg:flex relative max-w-7xl mx-auto xl:px-0 gap-7">
            {/* products details  */}
            <div className="flex-1">
              <div className="lg:flex itmes-start">
                <div className="w-full lg:w-[41%] lg:px-5 xl:px-0">
                  <div className="relative">
                    <div
                      className="h-[300px] md:h-[300px] xl:h-[371px] relative sm:border border-gray-300 sm:p-2 overflow-hidden cursor-pointer"
                      onMouseMove={handleImageZoom}
                      onMouseLeave={handleImageZoomReset}
                      onClick={() => handleImageClick(0)}
                    >
                      <img
                        src={currentImage}
                        alt="Product Image"
                        className="w-full h-full object-fill transform transition-transform duration-300"
                        ref={productImageRef}
                      />
                    </div>
                    <div className="flex items-center gap-2 justify-start mt-5 shadow-md border p-2 xl:-ml-11 sm:w-[300px] mx-3">
                      {images?.map((img, i) => (
                        <div
                          className={`border p-2 border-gray-300 ${
                            currentImage === img && "border-orange-500"
                          }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className={` h-11 w-11 sm:h-16 sm:w-16`}
                            onClick={() => setCurrentImage(images[i])}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-3.5 left-3.5 px-2.5 py-1.5 text-xs bg-red-500 nc-shadow-lg flex items-center justify-center text-white  ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                        ></path>
                      </svg>
                      <span className="ml-1 leading-none">New in</span>
                    </div>
                    <button
                      className={`w-9 h-9 flex items-center justify-center rounded-full bg-white  text-neutral-700 absolute right-3.5 top-3.5 `}
                      onClick={() => setIsLove(!isLove)}
                    >
                      {isLove ? (
                        <Icon
                          icon="solar:heart-outline"
                          className="text-red-500 text-[23px]"
                        />
                      ) : (
                        <svg
                          className={`w-5 h-5 text-gray-900`}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className='className="w-full px-3 flex-1 mt-3 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10"'>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-indigo-600">
                      {name}
                    </h2>
                    <div className="flex items-center flex-wrap gap-2 mt-3">
                      {socialInfo.map((info, i) => (
                        <div className="flex items-center px-4 gap-2 py-1.5 border cursor-pointer hover:bg-red-500 transition-all duration-150 ease-in hover:text-white border-gray-300">
                          <Icon icon={info.icon} className="text-xl" />
                          <p className="text-sm">{info.name}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center flex-wrap gap-5 mt-5">
                      <div className="flex items-center">
                        {[1, 2, 3, 4].map((i) => (
                          <Icon icon="noto:star" className="text-xl" />
                        ))}
                        <Icon
                          icon="la:star-half-alt"
                          className="text-gray-400 text-sm"
                        />
                      </div>
                      <h2 className="text-[13px] border-l px-5 border-r hover:text-red-500">
                        Read Reviews: (0)
                      </h2>
                      <h2 className="text-[13px] hover:text-red-500">
                        Rrite a review
                      </h2>
                    </div>

                    <div className="mt-7">
                      <h3 className="">
                        <span className="text-sm font-semibold">
                          Condition:{" "}
                        </span>
                        <span className="text-gray-500 text-sm pl-1">
                          {" "}
                          New Product
                        </span>
                      </h3>
                      <h3 className="pt-1.5">
                        <span className="text-sm font-semibold">Brand: </span>
                        <span className="text-gray-500 text-sm pl-1">
                          {" "}
                          {brand}
                        </span>
                      </h3>
                      <h3 className="pt-1.5">
                        <span className="text-sm font-semibold">
                          Product Code:{" "}
                        </span>
                        <span className="text-gray-500 text-sm pl-1">
                          {" "}
                          567890
                        </span>
                      </h3>
                    </div>

                    <div className="border-y py-5 mt-5 flex items-center gap-7">
                      <h3 className="text-3xl font-semibold text-red-500">
                        ${parseInt(price.toString())}
                      </h3>
                      <h3 className="text-md font-semibold">
                        <span>Regular Price:</span>
                        <span className="text-gray-400 pl-2 line-through ">
                          ${parseInt(price.toString()) + 5}
                        </span>
                      </h3>
                    </div>
                  </div>

                  <p className="pt-3 last:pb-0 text-slate-600 text-sm  leading-6">
                    {desc}
                  </p>

                  <div className="flex items-center gap-5 mt-7">
                    <h3 className="font-semibold">301 Items</h3>
                    <div className="px-2 py-1 bg-green-500 border border-green-700 text-white font-semibold text-sm">
                      In stock
                    </div>
                  </div>

                  <div className="flex space-x-3.5 mt-7">
                    <div className="flex items-center justify-center bg-slate-100/70 px-2 py-3 sm:p-3.5 rounded-full">
                      <div className=" flex items-center justify-between space-x-5 w-full">
                        <div className="flex items-center justify-between w-[104px] sm:w-28">
                          <button
                            className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400  bg-white  focus:outline-none hover:border-neutral-700  disabled:hover:border-neutral-400  disabled:opacity-50 disabled:cursor-default"
                            type="button"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <span className="select-none block flex-1 text-center leading-none">
                            5
                          </span>
                          <button
                            className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400  bg-white focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400  disabled:opacity-50 disabled:cursor-default"
                            type="button"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={sidebar.toggle}
                      className="w-full lg:max-w-max relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 bg-blue-gray-700 text-white disabled:bg-opacity-90  hover:bg-blue-gray-800 shadow-xl flex-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      <Icon
                        icon="iconamoon:shopping-bag-light"
                        className="text-xl"
                      />
                      <span className="ml-3">Add to cart</span>
                    </button>
                  </div>

                  <div className=" mt-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                      {features.map((feature, index) => (
                        <div
                          key={index}
                          className={`flex flex-col p-5 rounded-2xl dark:bg-opacity-90 ${feature.bg} cursor-pointer`}
                        >
                          <Icon icon={feature.icon} />
                          <div className="mt-2.5">
                            <p className="font-semibold text-slate-900">
                              {feature.title}
                            </p>
                            <p className="text-slate-500 mt-0.5 text-sm">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 px-3 py-7 md:mt-9 bg-gray-100">
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

                {/*specifications */}
                <div
                  className={`bg-white px-5 py-5 shadow-sm mt-6 ${
                    activeTab === "Specification" ? "" : "hidden"
                  }`}
                >
                  <h3 className="font-semibold text-xl">Specification</h3>
                  <div className="h-44"></div>
                </div>

                {/*description */}
                <DescriptionTab activeTab={activeTab} />

                {/*questions */}
                <QuestionTab
                  activeTab={activeTab}
                  questions={questions}
                  product={product}
                />

                {/*reviews */}
                <ReviewTab
                  activeTab={activeTab}
                  questions={questions}
                  product={product}
                />
              </div>
            </div>

            {/* side products  */}
            <RelatedProductsSection
              recentItems={relatedProducts.slice(0, 3)}
              relatedProducts={relatedProducts.slice(3, 6)}
            />
          </div>
        </div>

        {isLightboxOpen && (
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
        )}
      </div>
      {sidebar.value && <CartSidebar dialog={sidebar} />}
    </div>
  );
};

export default ProductsDetailsView;
