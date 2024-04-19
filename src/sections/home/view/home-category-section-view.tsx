import { categories } from "@/constants";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

const HomeCategorySection = () => {
  return (
    <div className="bg-gray-100 w-full pt-5 md:pt-16 pb-11">
      <div className="max-w-7xl mx-auto hidden md:block">
        <div className="flex flex-col items-center jsutify-center">
          <h3 className="text-2xl font-semibold pb-2 text-center">
            Featured Category
          </h3>
          <p className="text-center">
            Get Your Desired Product from Featured Category!
          </p>
        </div>
        <div className="px-5 xl:px-0 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-x-3 gap-y-3 sm:gap-y-11 mt-7">
          {categories.map((category, index) => (
            <Link
              href={`/category?category=${category.keyword}`}
              key={index}
              className="group flex flex-col w-full px-4 py-4 sm:py-5 items-center justify-center shadow-sm border-b hover:shadow-lg bg-white cursor-pointer"
            >
              {/* <h3 className='text-gray-500 text-3xl sm:text-5xl'>{React.createElement(iconMapping[category.keyword])}</h3> */}
              <img src={category.image} className="h-20 w-24" alt="" />
              <h3 className="text-[15px] sm:text-[18px] transition-all duration-100 ease-in mt-3 group-hover:text-red-500 text-center">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full md:hidden px-2.5">
        <div className="bg-white px-2 py-3 rounded-md">
          <div className="flex items-center justify-between w-full">
            <div>
              <h3 className="text-md font-semibold">Categories</h3>
              <p className="text-xs">Recommended for you</p>
            </div>
            <div className="border border-orange-600 p-1 rounded flex items-center justify-center text-xs text-orange-600">
              <p>See More</p>
              <Icon
                icon="solar:double-alt-arrow-right-linear"
                className="text-xs"
              />
            </div>
          </div>
          <div className="overflow-x-auto scrollbar-hide mt-5 w-full">
            <div className="grid grid-cols-8 py-2 gap-x-32 gap-y-5 -mx-2 ">
              {categories.map((category, i) => (
                <Link
                  href={`/category?category=${category.keyword}`}
                  key={i}
                  className="w-32 flex flex-col rounded-xl items-center justify-center bg-white cursor-pointer"
                >
                  <img src={category.image} className="h-20 w-24" alt="" />
                  <h3 className="text-sm sm:text-base transition-all duration-100 ease-in mt-3 group-hover:text-red-500 text-center">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategorySection;
