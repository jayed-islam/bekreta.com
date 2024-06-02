"use client";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { paths } from "@/layouts/paths";
import BannerProductCard from "./common/banner-product-card";
import { SampleNextArrow, SamplePrevArrow } from "@/utils/react-slick-utils";

const HomeBanner = () => {
  const sliderRef = useRef<Slider | null>(null);
  var settings = {
    dots: false,
    infinite: false,
    loop: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const banners = ["assets/banner.avif", "assets/banner2.avif"];

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const cardsArray = Array.from({ length: 10 }, (_, index) => index);

  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/shop/products?page=${page}&size=${size}`
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          if (data?.status === "success") {
            setProducts(data?.data);
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
  }, [page, size]);
  return (
    <div className="bg-gray-100 w-full">
      <div className="max-w-6xl mx-auto flex  lg:gap-5 pt-2">
        <div className="w-[75%]">
          <Slider {...settings}>
            {banners.map((banner, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-full h-52 md:h-96 lg:h-[501px]"
              >
                <img src={banner} className="w-full h-full object-cover " />
                <div className="absolute inset-0 left-5 right-5 flex items-center justify-between">
                  <button className="text-white h-11 flex items-center justify-center w-11 bg-black bg-opacity-50 rounded-full hover:text-orange-600 transition-all duration-150">
                    <Icon
                      icon="iconamoon:arrow-left-2-thin"
                      className="text-3xl"
                    />
                  </button>
                  <button className="text-white h-11 flex items-center justify-center w-11 bg-black bg-opacity-50 rounded-full hover:text-orange-600 transition-all duration-150">
                    <Icon
                      icon="iconamoon:arrow-right-2-thin"
                      className="text-3xl"
                    />
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-full lg:w-[25%] h-full border-2 border-green-500 rounded-2xl py-5 bg-white">
          <div className="flex items-center justify-between px-5">
            <h2 className="text-xl font-bold text-green-500">Special Deal</h2>
            <div className="flex items-center gap-3">
              <div
                className="bg-gray-300 h-7 w-7 hover:bg-green-500 transition-all duration-200 rounded-full flex items-center justify-center hover:text-white cursor-pointer"
                onClick={previous}
              >
                <Icon icon="iconamoon:arrow-left-2-thin" className="text-xl" />
              </div>
              <div
                className="bg-gray-300 h-7 w-7 hover:bg-green-500 transition-all duration-200 rounded-full flex items-center justify-center hover:text-white cursor-pointer"
                onClick={next}
              >
                <Icon icon="iconamoon:arrow-right-2-thin" className="text-xl" />
              </div>
            </div>
          </div>
          <Slider {...settings} ref={sliderRef}>
            {products?.slice(19, 30).map((product, index) => (
              <div className="w-full">
                <BannerProductCard
                  key={index}
                  product={product}
                  index={index}
                  rootPath={paths.product.root}
                  timerBoolean
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
