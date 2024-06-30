"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageHeader from "@/components/common/page-header";
import ProductsSceleton from "@/components/skeleton/product-skeleton";

import Pagination from "../common/product-filtered-pagination";
import Link from "next/link";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import LeftSideFilter from "../common/left-side-filtered-section";
import { useSearchParams } from "next/navigation";
import { IProductItem } from "@/types/products";
import { availabilities } from "@/utils/products";
import { paths } from "@/layouts/paths";
import NoDataFoundView from "@/components/no-data/no-data-view";
import HeadFilterSectionView from "../head-filter-section";
import ProductCard from "@/layouts/common/product/product-card";
import useBoolean from "@/hooks/use-boolean";
import { useGetProductsQuery } from "@/redux/reducers/product/productApi";

interface CategoryWiseProductProps {}

const CategoryWiseProductFilterView: React.FC<
  CategoryWiseProductProps
> = () => {
  const filterSidebar = useBoolean();
  const { register, handleSubmit } = useForm();
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [values, setValues] = useState<[number, number]>([5, 2001]);
  const [isActive, setActive] = useState<boolean>(true);

  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [products, setProducts] = useState<IProductItem[]>([]);
  const [sortId, setSortId] = useState<number>(1);
  const pages: number = Math.ceil(count / size);

  const searchParams: any = useSearchParams();
  const categoryId: string | null = searchParams.get("category");
  const search: string | null = searchParams.get("search");

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const fakeArray: number[] = Array.from({ length: 12 });

  const handleToggle = (): void => {
    setActive(!isActive);
  };

  const handleSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newSize: number = parseInt(event.target.value);
    setSize(newSize);
    setPage(0);
  };

  const handleFilterChange = (filter: string): void => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleBrandChange = (brandName: string): void => {
    if (selectedBrands.includes(brandName)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brandName));
    } else {
      setSelectedBrands([...selectedBrands, brandName]);
    }
  };

  const handleBrandClick = (brandName: string): void => {
    if (selectedBrands.includes(brandName)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brandName));
    } else {
      setSelectedBrands([...selectedBrands, brandName]);
    }
  };

  const filteredProducts = products.filter((product) => {
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    if (selectedFilters.length === 0) {
      return true;
    } else {
      return selectedFilters.includes(product.status);
    }
  });

  const brandSet = new Set(products.map((product) => product.brand));
  const uniqueBrandNames: string[] = Array.from(brandSet);

  const handleSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedSortId: number = parseInt(event.target.value);
    setSortId(selectedSortId);
  };

  const handlePrevClick = (): void => {
    setPage(page - 1);
  };

  const handleNextClick = (): void => {
    setPage(page + 1);
  };

  const handleLastPageClick = (): void => {
    setPage(pages - 1);
    const lastpage: number = pages - 1;
    localStorage.setItem("curAppPage", lastpage.toString());
  };

  const { data, isLoading } = useGetProductsQuery({
    category: categoryId as string,
  });

  const breadcrumbItems = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Category", url: "/" },
  ];

  const onSubmit = (data: any): void => {
    console.log(data);
  };

  return (
    <div className="relative w-full bg-gray-100 z-10 pb-32 overflow-x-hidden">
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        pageName="Choice your favirote Brands"
      />
      {/* <HeadFilterSectionView
        isLoading={isLoading}
        uniqueBrandNames={uniqueBrandNames}
      /> */}

      <div className="max-w-6xl mx-auto px-3 xl:px-0">
        <div className="flex flex-col lg:flex-row gap-5 mt-5">
          <div
            className={`z-40 lg:hidden flex w-full  justify-end h-full overflow-x-hidden bg-black bg-opacity-20 fixed right-0 top-0 transform transition duration-200 ease-in-out  ${
              !filterSidebar.value && "translate-x-full lg:hidden"
            }`}
          >
            <div className=" mt-20 w-[281px] bg-white relative">
              <div>
                <div
                  onClick={filterSidebar.setFalse}
                  className="px-2 py-1 bg-gray-100  -left-5 top-9 absolute border border-gray-400 flex items-center justify-center h-9 cursor-pointer"
                >
                  <Icon icon="mingcute:close-line" className="text-xl" />
                </div>
              </div>

              <LeftSideFilter
                values={values}
                setValues={setValues}
                selectedFilters={selectedFilters}
                handleFilterChange={handleFilterChange}
                selectedBrands={selectedBrands}
                handleBrandChange={handleBrandChange}
                uniqueBrandNames={uniqueBrandNames}
                availabilities={availabilities}
              />
            </div>
          </div>

          {/*left side filtered secttion for large screen  */}
          <div className="hidden lg:block">
            <LeftSideFilter
              values={values}
              setValues={setValues}
              selectedFilters={selectedFilters}
              handleFilterChange={handleFilterChange}
              selectedBrands={selectedBrands}
              handleBrandChange={handleBrandChange}
              uniqueBrandNames={uniqueBrandNames}
              availabilities={availabilities}
            />
          </div>

          {/* filtered header section */}
          <div className="flex-1 min-h-screen">
            <div className=" rounded-lg shadow-sm bg-white flex lg:items-center justify-between px-3 py-2.5">
              <h3 className="text-md font-semibold hidden lg:block">Router</h3>
              <div className="lg:hidden">
                <button
                  onClick={filterSidebar.setTrue}
                  className="flex items-center text-sm gap-2 px-3 py-1 rounded-sm bg-gray-100"
                >
                  <Icon icon="ion:filter" className="text-xl" />
                  Filter
                </button>
              </div>
              <div className="flex items-center gap-5">
                <div className="items-center gap-3 hidden lg:flex">
                  <h3 className="text-sm font-medium">Show :</h3>
                  <select
                    name=""
                    id=""
                    className="h-full outline-none bg-gray-100 px-1 py-1 rounded text-sm"
                    value={size}
                    onChange={handleSizeChange}
                  >
                    <option value="20">11</option>
                    <option value="20">15</option>
                    <option value="20">20</option>
                    <option value="20">30</option>
                    <option value="20">40</option>
                    <option value="20">40</option>
                    <option value="20">55</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 font-normal">
                  <h3 className="text-sm font-medium ">Sort By :</h3>
                  <select
                    name="sort"
                    id="sort"
                    className="bg-gray-100 px-1 py-1 h-full rounded outline-none text-sm -mt-1"
                    value={sortId}
                    onChange={handleSortChange}
                  >
                    <option value={1}>Default</option>
                    <option value={1}>Price (Low - High)</option>
                    <option value={-1}>Price (High - Low)</option>
                  </select>
                </div>
              </div>
            </div>
            {/* {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 md:gap-x-3 gap-y-3 md:gap-y-5 mt-3">
                {fakeArray.map((_, index) => (
                  <ProductsSceleton key={index} />
                ))}
              </div>
            ) : (
              <> */}
            {/* {filteredProducts?.length > 0 ? ( */}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 md:gap-x-3 gap-y-3 md:gap-y-5 mt-3">
              {data?.data.products.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  index={index}
                  btnStyle="py-1 rounded-lg"
                />
              ))}
            </div>
            {/* ) : (
                  <NoDataFoundView />
                )} */}
            {/* </>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductFilterView;
