import { paths } from "@/layouts/paths";
import { ICategoriesResponse } from "@/types/category";
import Link from "next/link";
import React from "react";
import HomeCategoryItem from "./home-category-item";
import { Button } from "@mui/material";

const HomeTopCategoryView = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/category`,
    {
      cache: "no-cache",
    }
  );
  const data: ICategoriesResponse = await res.json();

  return (
    <div className="bg-gray-100">
      <div className="max-w-6xl mx-auto py-3 md:py-5 flex items-center gap-5 justify-between flex-col md:flex-row">
        <div className="flex gap-3 items-center pl-3 xl:pl-0 md:overflow-hidden scrollbar-hide md:pr-5 flex-wrap md:flex-nowrap flex-1">
          {data?.data.map((category) => (
            <HomeCategoryItem category={category} key={category._id} />
          ))}
        </div>
        <Link href={paths.orderTrucking}>
          <div className="border shadow-sm bg-orange-600 text-white px-3 py-1 text-sm md:text-[17px] md:py-2 text-md font-semibold hover:shadow-lg transition-all duration-200 hover:border-green-500 cursor-pointer">
            অর্ডার ট্র্যাকিং
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeTopCategoryView;
