"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchTerm } from "@/redux/reducers/product/productSlice";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent } from "react";
import { paths } from "@/layouts/paths";
import { LuSearch } from "react-icons/lu";
import { IconButton } from "@mui/material";

export default function HomeHeaderSearch() {
  const { searchTerm } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Handle input change and update search term
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  // Handle search submission and route to the products page
  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      router.push(paths.product.products);
    }
  };

  // Handle key down event to trigger search on "Enter"
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="w-[400px] xl:w-[500px]">
      <div className="relative">
        <div className="flex items-center bg-white rounded-md w-full">
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-grow px-5 h-[55px] rounded-md border-none focus:outline-none"
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
          />
          <IconButton
            sx={{
              position: "absolute",
              right: 4,
            }}
          >
            <LuSearch
              onClick={handleSearchSubmit}
              className="text-2xl text-gray-600"
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
