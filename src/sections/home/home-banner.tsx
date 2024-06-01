"use client";

import { bannerImages } from "@/constants";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React from "react";

const HomeBanner = () => {
  return (
    <div className="bg-gray-100 w-full">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row lg:gap-5 items-start pt-2">
        <div className="relative w-full lg:flex-1 px-3 xl:px-0">
          <div className="flex items-center justify-center w-full h-52 md:h-96 lg:h-[501px] ">
            <img
              src="assets/banner.avif"
              className="w-full h-full object-cover "
            />
            <div className="absolute inset-0 left-5 right-5 flex items-center justify-between">
              <button className="text-white h-11 flex items-center justify-center w-11 bg-black bg-opacity-50 rounded-full hover:text-orange-600 transition-all duration-150">
                <Icon icon="iconamoon:arrow-left-2-thin" className="text-3xl" />
              </button>
              <button className="text-white h-11 flex items-center justify-center w-11 bg-black bg-opacity-50 rounded-full hover:text-orange-600 transition-all duration-150">
                <Icon
                  icon="iconamoon:arrow-right-2-thin"
                  className="text-3xl"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-72 bg-green-300 h-full"></div>
      </div>
    </div>
  );
};

export default HomeBanner;
