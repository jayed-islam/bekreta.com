"use client";

import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "@/components/common/page-header";
import ProductsSceleton from "@/components/skeleton/product-skeleton";

import { Icon } from "@iconify-icon/react/dist/iconify.js";
import LeftSideFilter from "../common/left-side-filtered-section";
import { useSearchParams } from "next/navigation";
import { IProductFilters } from "@/types/products";
import NoDataFoundView from "@/components/no-data/no-data-view";
import ProductCard from "@/layouts/common/product/product-card";
import useBoolean from "@/hooks/use-boolean";
import { useGetProductsQuery } from "@/redux/reducers/product/productApi";
import useDebounce from "@/hooks/use-debounce";
import { Drawer } from "@mui/material";

interface CategoryWiseProductProps {}

interface QueryParams {
  category: string | null;
  searchTerm: string | null;
}

const defaultFilters: IProductFilters = {
  category: "",
  searchTerm: "",
  maxPrice: Number.MAX_SAFE_INTEGER,
  minPrice: 1,
  status: [],
  isLowestFirst: null,
};

const CategoryWiseProductFilterView: React.FC<
  CategoryWiseProductProps
> = () => {
  const filterSidebar = useBoolean();
  const [filters, setFilters] = useState(defaultFilters);
  const [values, setValues] = useState<[number, number]>([5, 2001]);
  const [queries, setQueries] = useState<QueryParams>({
    category: null,
    searchTerm: null,
  });

  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [sortId, setSortId] = useState<number>(1);

  const filterDrawer = useBoolean();

  // const searchParams: any = useSearchParams();
  // const categoryId: string | null = searchParams.get("category");
  // const searchQuery: string | null = searchParams.get("search");

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const queryParamCategory = urlParams.get("category");
  //   const queryParamSearch = urlParams.get("search");
  //   setQueries((prev) => ({
  //     ...prev,
  //     category: queryParamCategory,
  //     searchTerm: queryParamSearch,
  //   }));
  // }, []);

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    // setQueries({
    //   category: categoryId,
    //   searchTerm: searchQuery,
    // });
    setFilters((prev) => ({
      ...prev,
      category: categoryId as string,
      searchTerm: searchQuery as string,
    }));
  }, [categoryId, searchQuery]);

  console.log("query", queries);

  console.log("query", queries);
  // console.log("search", search);

  const fakeArray: number[] = Array.from({ length: 12 });

  // const handleFilters = useCallback(
  //   (name: string, value: string | number | string[]) => {
  //     setFilters((prev) => {
  //       if (name === "status") {
  //         const newStatus = Array.isArray(value) ? value : [value];
  //         return { ...prev, status: newStatus } as IProductFilters;
  //       } else {
  //         if (name === "category") {
  //           return { ...prev, [name]: value } as IProductFilters;
  //         }
  //         return { ...prev, [name]: value } as IProductFilters;
  //       }
  //     });
  //   },
  //   []
  // );

  const handleFilters = useCallback(
    (name: string, value: string | number | string[]) => {
      setFilters((prev) => {
        if (name === "status") {
          const newStatus = Array.isArray(value) ? value : [value];
          return { ...prev, status: newStatus } as IProductFilters;
        } else if (name === "category") {
          return { ...defaultFilters, category: value } as IProductFilters;
        } else {
          return { ...prev, [name]: value } as IProductFilters;
        }
      });
    },
    []
  );

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
    setFilters((prev) => ({
      ...prev,
      isLowestFirst:
        selectedSortId === 1 ? true : selectedSortId === -1 ? false : null,
    }));
  };

  const debouncedFilters = useDebounce(filters, 1000);

  const { data, isFetching } = useGetProductsQuery({
    category: filters.category ? filters.category : "",
    limit: size,
    minPrice: debouncedFilters.minPrice,
    maxPrice: debouncedFilters.maxPrice,
    status: filters.status.length > 0 ? filters.status : [],
    searchTerm: filters.searchTerm ? filters.searchTerm : "",
    isLowestFirst: filters.isLowestFirst,
  });

  const breadcrumbItems = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Category", url: "/" },
  ];

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setValues([5, 2001]);
    setQueries({ category: null, searchTerm: null });
    setSortId(1);
    setPage(0);
    filterDrawer.setFalse();
  };

  return (
    <div className="relative w-full bg-gray-100 z-10 pb-32 overflow-x-hidden">
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        pageName="Choice your favirote Products"
      />
      {/* <HeadFilterSectionView
        isLoading={isLoading}
        uniqueBrandNames={uniqueBrandNames}
      /> */}

      <div className="max-w-6xl mx-auto px-3 xl:px-0">
        <div className="flex flex-col lg:flex-row gap-5 mt-5">
          {/* <div
            className={`z-20 lg:hidden flex w-full  justify-end h-full overflow-x-hidden bg-black bg-opacity-20 fixed right-0 top-0 transform transition duration-200 ease-in-out  ${
              !filterSidebar.value && "translate-x-full lg:hidden"
            }`}
          >
            <div className="w-[281px] bg-white relative">
              <div>
                <div
                  onClick={filterSidebar.setFalse}
                  className="px-2 py-1 bg-gray-100  -left-5 top-9 absolute border border-gray-400 flex items-center justify-center h-9 cursor-pointer"
                >
                  <Icon icon="mingcute:close-line" className="text-xl" />
                </div>
              </div>

              <LeftSideFilter
                filters={filters}
                values={values}
                setValues={setValues}
                onFilters={handleFilters}
              />
            </div>
          </div> */}

          {/*left side filtered secttion for large screen  */}
          <div className="hidden lg:block">
            <LeftSideFilter
              filters={filters}
              values={values}
              setValues={setValues}
              onFilters={handleFilters}
              resetFilter={handleResetFilters}
            />
          </div>

          {/* filtered header section */}
          <div className="flex-1 min-h-screen">
            <div className=" rounded-lg shadow-sm bg-white flex lg:items-center justify-between px-3 py-2.5">
              <h3 className="text-md font-semibold hidden lg:block">Router</h3>
              <div className="lg:hidden">
                <button
                  onClick={filterDrawer.setTrue}
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
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="11">11</option>
                    <option value="15">15</option>
                    <option value="25">25</option>
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
                    <option value="">Default</option>
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
          </div>
        </div>
      </div>
      <Drawer
        open={filterDrawer.value}
        onClose={filterDrawer.setFalse}
        anchor="right"
      >
        <div className="w-[281px] bg-white relative pt-5 pb-5">
          <div
            onClick={filterDrawer.setFalse}
            className="px-2 py-1 bg-gray-100 right-3 top-3 absolute border border-gray-400 flex items-center justify-center h-9 cursor-pointer"
          >
            <Icon icon="mingcute:close-line" className="text-xl" />
          </div>
          <LeftSideFilter
            filters={filters}
            values={values}
            setValues={setValues}
            onFilters={handleFilters}
            resetFilter={handleResetFilters}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default CategoryWiseProductFilterView;
