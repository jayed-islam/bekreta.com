"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageHeader from "@/components/common/page-header";
import ProductsSceleton from "@/components/skeleton/product-skeleton";
import ProductCard from "@/sections/home/common/product-card";
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

interface CategoryWiseProductProps {}

const CategoryWiseProductFilterView: React.FC<
  CategoryWiseProductProps
> = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  const fakeArray: number[] = Array.from({ length: 16 });

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

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/shop/categorywise?category=${categoryId}&page=${page}&size=${size}&sortId=${sortId}&min=${values[0]}&max=${values[1]}&search=${search}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data?.status === "success") {
            setProducts(data?.data);
            setCount(data?.count);
            setIsLoading(false);
          }
        } else {
          console.error("Failed to fetch products");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error while fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [
    page,
    count,
    size,
    sortId,
    values,
    categoryId,
    search,
    selectedFilters,
    selectedBrands,
  ]);

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
      <HeadFilterSectionView
        isLoading={isLoading}
        uniqueBrandNames={uniqueBrandNames}
      />

      <div className="max-w-6xl mx-auto px-3 xl:px-0">
        <div className="flex flex-col lg:flex-row gap-5 mt-5">
          <div
            className={`z-30 lg:hidden flex w-full h-full justify-end overflow-x-hidden bg-black bg-opacity-20 px-2 absolute right-0 top-0 transform ${
              isActive && "translate-x-full lg:hidden"
            } transition duration-200 ease-in-out`}
          >
            <div className="w-[281px] bg-white relative">
              <div>
                <button
                  onClick={handleToggle}
                  className="px-2 py-2 bg-gray-100  -left-5 top-10 absolute border border-gray-400"
                >
                  <Icon icon="mingcute:close-line" className="text-xl" />
                </button>
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
                  onClick={handleToggle}
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
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 md:gap-x-3 gap-y-3 md:gap-y-5 mt-3">
                {fakeArray.map((_, index) => (
                  <ProductsSceleton key={index} />
                ))}
              </div>
            ) : (
              <>
                {/* {filteredProducts?.length > 0 ? ( */}
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 md:gap-x-3 gap-y-3 md:gap-y-5 mt-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((product, index) => (
                      <ProductCard
                        key={index}
                        product={product}
                        index={index}
                        rootPath={paths.product.root}
                      />
                    ))}
                  </div>

                  {/* pagination */}

                  {/* <div className="flex items-center justify-between mt-11">
                      <button
                        disabled={page === 0}
                        onClick={handlePrevClick}
                        className={`flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 ${
                          page === 0 ? "cursor-not-allowed" : undefined
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 rtl:-scale-x-100"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                          />
                        </svg>

                        <span>previous</span>
                      </button>

                      <div className=" hidden md:flex items-center gap-5">
                        <div>
                          <h3 className="text-md">
                            Showing{" "}
                            <span className="font-bold">{page * size + 1}</span>{" "}
                            to{" "}
                            <span className="font-bold">
                              {Math.min((page + 1) * size, count)}
                            </span>{" "}
                            of{" "}
                            <span className="font-bold text-blue-700">
                              {" "}
                              {count}
                            </span>{" "}
                            entries
                          </h3>
                        </div>
                        <div className="items-center hidden md:flex gap-x-3">
                          {renderPageButtons()}
                        </div>
                        <div className="relative">
                          <select
                            className="border py-1.5 px-1 w-11 rounded outline-none appearance-none bg-transparent "
                            value={size}
                            onChange={handleSizeChange}
                          >
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 ">
                            <svg
                              className="fill-current h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 12L6 8h8l-4 4z" />
                            </svg>
                          </div>
                        </div>
                        <button
                          onClick={handleLastPageClick}
                          href="#"
                          className={`border py-2.5 px-1 w-11 rounded outline-none hover:bg-gray-100 flex items-center justify-center ${
                            page === pages - 1
                              ? "cursor-not-allowed"
                              : undefined
                          }`}
                        >
                          <HiOutlineChevronDoubleRight />
                        </button>
                      </div>

                      <button
                        disabled={page === pages - 1}
                        onClick={handleNextClick}
                        className={`flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 ${
                          page === pages - 1 ? "cursor-not-allowed" : undefined
                        }`}
                      >
                        <span>Next</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 rtl:-scale-x-100"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </button>
                    </div> */}

                  <Pagination
                    page={page}
                    pages={pages}
                    handlePrevClick={handlePrevClick}
                    handleNextClick={handleNextClick}
                    handleLastPageClick={handleLastPageClick}
                  />
                </div>
                {/* ) : (
                  <NoDataFoundView />
                )} */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductFilterView;
