"use client";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { useRef } from "react";
import Slider from "react-slick";
import BannerProductCard from "./common/banner-product-card";
import { offerProductSettings } from "@/utils/react-slick-utils";
import Image from "next/image";
import banner from "../../../public/assets/bg-light-banner.jpg";
import { IProduct } from "@/types/products";

interface Props {
  offerItems: IProduct[];
  isLoading: boolean;
}

const HomeBanner = ({ isLoading, offerItems }: Props) => {
  const sliderRef = useRef<Slider | null>(null);
  const bannerRef = useRef<Slider | null>(null);

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };
  const bannerPrevious = () => {
    bannerRef.current?.slickPrev();
  };

  const bannerNext = () => {
    bannerRef.current?.slickNext();
  };

  const banners = ["assets/banner.avif", "assets/banner2.avif"];

  const fakeArr = Array.from({ length: 3 }, (_, index) => index);

  return (
    <div className="bg-gray-100 w-full">
      <div className="max-w-6xl mx-auto flex lg:gap-5 flex-col lg:flex-row sm:px-3 md:px-5 xl:px-0">
        <div className="flex-1 w-full lg:w-[60%]">
          {/* <Slider {...bannerSettings} ref={bannerRef}>
            {banners.map((banner, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-full h-52 sm:h-72 md:h-[400px] lg:h-[491px] relative lg:rounded-2xl bg-gray-300"
              >
                <img
                  src={banner}
                  className="w-full h-full object-cover lg:rounded-2xl "
                />
                <div className="absolute inset-0 left-5 right-5 flex items-center justify-between z-20">
                  <button
                    className="text-white h-11 flex items-center justify-center w-11 bg-black bg-opacity-50 rounded-full hover:text-orange-600 transition-all duration-150"
                    onClick={bannerPrevious}
                  >
                    <Icon
                      icon="iconamoon:arrow-left-2-thin"
                      className="text-3xl"
                    />
                  </button>
                  <button
                    className="text-white h-11 flex items-center justify-center w-11 bg-black bg-opacity-50 rounded-full hover:text-orange-600 transition-all duration-150"
                    onClick={bannerNext}
                  >
                    <Icon
                      icon="iconamoon:arrow-right-2-thin"
                      className="text-3xl"
                    />
                  </button>
                </div>
              </div>
            ))}
          </Slider> */}
          <div className="flex items-center justify-center w-full h-52 sm:h-72 md:h-[400px] lg:h-[491px] relative  bg-gray-300">
            <Image
              alt="Bekreta"
              src={banner}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full hidden lg:block sm:max-w-[18rem] h-full border py-5 bg-white">
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
          <Slider {...offerProductSettings} ref={sliderRef}>
            {isLoading
              ? fakeArr.map((i) => (
                  <div className="animate-pulse flex px-5 mt-5" key={i}>
                    <div className="bg-slate-200 h-48 w-full"></div>
                    <div className="flex-1 py-1 mt-3">
                      <div className="h-3 bg-slate-200 rounded"></div>
                      <div className="h-3 bg-slate-200 rounded mt-2"></div>
                      <div className="">
                        <div className="grid grid-cols-3 gap-4 mt-5">
                          <div className="h-3 bg-slate-200 rounded col-span-2"></div>
                          <div className="h-3 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div className="h-3 mt-3 bg-slate-200 rounded"></div>
                        <div className="h-3 mt-3 bg-slate-200 rounded"></div>
                        <div className="h-[3rem] mt-5 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))
              : offerItems?.map((product, index) => (
                  <div className="w-full">
                    <BannerProductCard
                      key={index}
                      product={product}
                      index={index}
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
