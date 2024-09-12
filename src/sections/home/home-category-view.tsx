import { paths } from "@/layouts/paths";
import { ICategoriesResponse } from "@/types/category";
import Link from "next/link";
import React from "react";

const HomeTopCategoryView = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/category`
  );
  const data: ICategoriesResponse = await res.json();
  return (
    <div className="bg-gray-100">
      <div className="max-w-6xl mx-auto py-3 md:py-5">
        <div className="flex gap-3 items-center pl-3 xl:pl-0 md:overflow-hidden scrollbar-hide md:pr-5 flex-wrap md:flex-nowrap">
          {data?.data.map((category, index) => (
            <Link
              href={`${paths.product.category}?category=${category._id}`}
              key={index}
              className="flex-shrink-0 border shadow-sm bg-white px-3 py-1 text-sm md:text-[17px] md:py-2 text-md font-semibold hover:shadow-lg transition-all duration-200 hover:border-green-500"
            >
              {category.name}
            </Link>
          ))}
          {/* {isLoading ? (
            <>
              <div className="animate-pulse md:hidden flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div className=" bg-slate-200 h-7 w-20"></div>
                ))}
              </div>
              <div className="animate-pulse hidden md:flex gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <div className=" bg-slate-200 h-10 w-32"></div>
                ))}
              </div>
            </>
          ) : (
            data?.data.map((category, index) => (
              <Link
                href={`${paths.product.category}?category=${category.title}`}
                key={index}
                className="flex-shrink-0 border shadow-sm bg-white px-3 py-1 text-sm md:text-[17px] md:py-2 text-md font-semibold hover:shadow-lg transition-all duration-200 hover:border-green-500"
              >
                {category.name}
              </Link>
            ))
          )} */}
        </div>
      </div>
    </div>
  );
};

export default HomeTopCategoryView;
