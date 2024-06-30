"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import PageHeader from "@/components/common/page-header";
import ProductsSceleton from "@/components/skeleton/product-skeleton";

import { Icon } from "@iconify-icon/react/dist/iconify.js";
import LeftSideFilter from "../common/left-side-filtered-section";
import { useSearchParams } from "next/navigation";
import { IProductFilters, IProductItem } from "@/types/products";
import { availabilities } from "@/utils/products";
import NoDataFoundView from "@/components/no-data/no-data-view";
import ProductCard from "@/layouts/common/product/product-card";
import useBoolean from "@/hooks/use-boolean";
import { useGetProductsQuery } from "@/redux/reducers/product/productApi";
import useDebounce from "@/hooks/use-debounce";

interface CategoryWiseProductProps {}

const defaultFilters: IProductFilters = {
  category: "",
  searchTerm: "",
  maxPrice: Number.MAX_SAFE_INTEGER,
  minPrice: 1,
};

const CategoryWiseProductFilterView: React.FC<
  CategoryWiseProductProps
> = () => {
  const filterSidebar = useBoolean();
  const [filters, setFilters] = useState(defaultFilters);
  const [values, setValues] = useState<[number, number]>([5, 2001]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [sortId, setSortId] = useState<number>(1);
  const pages: number = Math.ceil(count / size);

  const searchParams: any = useSearchParams();
  const categoryId: string | null = searchParams.get("category");
  const search: string | null = searchParams.get("search");

  const fakeArray: number[] = Array.from({ length: 12 });

  const handleFilters = useCallback((name: string, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newSize: number = parseInt(event.target.value);
    setSize(newSize);
    setPage(0);
  };

  const handleSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedSortId: number = parseInt(event.target.value);
    setSortId(selectedSortId);
  };

  const debouncedFilters = useDebounce(filters, 1000);

  const { data, isFetching } = useGetProductsQuery({
    category: categoryId as string,
    limit: 25,
    minPrice: debouncedFilters.minPrice,
    maxPrice: debouncedFilters.maxPrice,
  });

  const breadcrumbItems = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Category", url: "/" },
  ];

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
                onFilters={handleFilters}
              />
            </div>
          </div>

          {/*left side filtered secttion for large screen  */}
          <div className="hidden lg:block">
            <LeftSideFilter
              values={values}
              setValues={setValues}
              onFilters={handleFilters}
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
            <div>
              {isFetching && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 md:gap-x-3 gap-y-3 md:gap-y-5 mt-3">
                  {fakeArray.map((_, index) => (
                    <ProductsSceleton key={index} />
                  ))}
                </div>
              )}
              {data?.data && data?.data.products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 md:gap-x-3 gap-y-3 md:gap-y-5 mt-3">
                  {data?.data.products.map((product, index) => (
                    <ProductCard key={index} product={product} size="sm" />
                  ))}
                </div>
              ) : (
                <NoDataFoundView category={categoryId as string} />
              )}
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
