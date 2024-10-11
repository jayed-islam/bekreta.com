"use client";

import { paths } from "@/layouts/paths";
import { useAppDispatch } from "@/redux/hooks";
import { setCategoryId } from "@/redux/reducers/product/productSlice";
import { ICategory } from "@/types/category";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  category: ICategory;
}

const HomeCategoryItem = ({ category }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    dispatch(setCategoryId(categoryId));
    router.push(paths.product.products);
  };
  return (
    <div
      onClick={() => handleCategoryClick(category._id)}
      className="flex-shrink-0 border shadow-sm bg-white px-3 py-1 text-sm md:text-[17px] md:py-2 text-md font-semibold hover:shadow-lg transition-all duration-200 hover:border-green-500 cursor-pointer"
    >
      {category.name}
    </div>
  );
};

export default HomeCategoryItem;
