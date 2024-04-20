import { categories } from "@/constants";
import { paths } from "@/layouts/paths";
import Link from "next/link";
import React from "react";

const HomeHeaderCategoryView = () => {
  return (
    <div className="">
      <div className="overflow-x-auto scrollbar-hide max-w-7xl mx-auto py-5">
        <div className="xl:flex hidden">
          {categories.map((category, index) => (
            <Link
              href={`${paths.product.category}?category=${category.keyword}`}
              key={index}
              className="w-20 md:w-32 flex-shrink-0 flex flex-col rounded-xl items-center justify-center cursor-pointer "
            >
              <img
                src={category.image}
                className="h-14 w-14 md:h-24 md:w-24 rounded-full hover:p-2 bg-white transition-all duration-200 ease-in-out shadow-md border"
                alt=""
              />
              <h3 className="text-xs sm:text-sm font-semibold transition-all duration-100 ease-in mt-2 md:mt-3 group-hover:text-red-500 text-center">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
        <div className="xl:hidden flex">
          {categories.map((category, index) => (
            <Link
              href={`${paths.product.category}/?category=${category.keyword}`}
              key={index}
              className="w-20 md:w-32 flex-shrink-0 flex flex-col rounded-xl items-center justify-center cursor-pointer "
            >
              <img
                src={category.image}
                className="h-14 w-14 md:h-24 md:w-24 rounded-full hover:p-2 bg-white transition-all duration-200 ease-in-out shadow-md border"
                alt=""
              />
              <h3 className="text-xs sm:text-sm font-semibold transition-all duration-100 ease-in mt-2 md:mt-3 group-hover:text-red-500 text-center">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeHeaderCategoryView;
