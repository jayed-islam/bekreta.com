import { categories } from "@/constants";
import { paths } from "@/layouts/paths";
import Link from "next/link";
import React from "react";

const HomeHeaderCategoryView = () => {
  return (
    <div className="bg-gray-100">
      <div className="overflow-x-auto scrollbar-hide max-w-6xl mx-auto  py-3 md:py-5">
        <div className="md:flex hidden gap-3 justify-between items-center md:pl-5 xl:pl-0">
          {categories.map((category, index) => (
            <Link
              href={`${paths.product.category}?category=${category.keyword}`}
              key={index}
              className="md:w-24 md:h-32 flex-shrink-0 flex flex-col rounded-xl items-center justify-center cursor-pointer group"
            >
              <div className="rounded-full transition-all duration-200 ease-in-out border md:h-24 md:w-24  flex items-center justify-center shadow bg-white">
                <img
                  src={category.image}
                  className="rounded-full object-cover h-20 w-20 group-hover:scale-110 transition-all duration-300"
                  alt=""
                />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold transition-all duration-300 ease-in mt-2 group-hover:text-green-500 text-center">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
        <div className="md:hidden flex gap-2 pl-3">
          {categories.map((category, index) => (
            <Link
              href={`${paths.product.category}?category=${category.keyword}`}
              key={index}
              className="w-16 h-24 md:w-24 md:h-32 flex-shrink-0 flex flex-col rounded-xl items-center justify-center cursor-pointer group"
            >
              <div className="rounded-full transition-all duration-200 ease-in-out border h-16 w-16  flex items-center justify-center shadow bg-white overflow-hidden">
                <img
                  src={category.image}
                  className="rounded-full object-cover h-[3.5rem] w-[3.5rem] group-hover:scale-110 transition-all duration-300"
                  alt=""
                />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold transition-all duration-300 ease-in mt-2 group-hover:text-green-500 text-center">
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
