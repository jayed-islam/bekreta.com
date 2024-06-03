import useBoolean from "@/hooks/use-boolean";
import DeleteConformationModal from "@/layouts/common/modal/delete-modal";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { useContext, useEffect, useState } from "react";

const CheckoutProductRow = () => {
  const dialog = useBoolean();
  return (
    <div className="relative flex py-7 first:pt-0 last:pb-0">
      <div className="relative h-32 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <img
          src="/assets/images/category/jewelry.avif"
          className="h-full w-full object-cover"
        />
        <a className="absolute inset-0" href="/product-detail"></a>
      </div>

      <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between ">
            <div className="flex-[1.5] ">
              <h3 className="text-base font-semibold">
                <a href="/product-detail">Modern Table Lamp</a>
              </h3>
              <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 ">
                <div className="flex items-center space-x-1.5">
                  <Icon icon="tdesign:fill-color-1" />
                  <span>Black</span>
                </div>
                <span className="mx-4 border-l border-slate-200  "></span>
                <div className="flex items-center space-x-1.5">
                  <Icon icon="tabler:brand-kbin" />
                  <span>Gamio</span>
                </div>
              </div>
              <div className="mt-3 flex justify-between w-full sm:hidden relative">
                <select
                  name="qty"
                  id="qty"
                  className="form-select text-sm rounded-md py-1 border-slate-200  relative z-10 dark:bg-slate-800 "
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <option value={i} key={i}>
                      {i}
                    </option>
                  ))}
                </select>
                <div className="">
                  <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full">
                    <span className="text-green-500 !leading-none">$50</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden flex-1 sm:flex justify-end">
              <div className="mt-0.5">
                <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                  <span className="text-green-500 !leading-none">$50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-auto pt-4 items-end justify-between text-sm">
          <div className="hidden sm:block text-center relative">
            <div className="nc-NcInputNumber flex items-center justify-between space-x-5 relative z-10">
              <div className="nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28">
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <span className="select-none block flex-1 text-center leading-none">
                  5
                </span>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="relative z-10 flex items-center mt-3 font-medium text-cyan-500 hover:text-primary-500 text-sm "
          >
            <span>Remove</span>
          </button>
        </div>
      </div>
      <DeleteConformationModal dialog={dialog} />
    </div>
  );
};

export default CheckoutProductRow;
