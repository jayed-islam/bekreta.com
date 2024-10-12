"use client";

import { paths } from "@/layouts/paths";
import Link from "next/link";
import React from "react";
import logo from "../../../public/assets/logo.jpg";
import Image from "next/image";
import { scrollToTop } from "@/hooks/use-clicktoTop";

const FeaturedProductFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-100">
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <div
            className="inline-block rounded-full bg-[#2e7d32] p-2 text-white shadow transition hover:bg-green-800 sm:p-3 lg:p-4 cursor-pointer"
            onClick={scrollToTop}
          >
            <span className="sr-only">Back to top</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center  lg:justify-start">
              <Image src={logo} alt="" className="w-32" />
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
              Discover the best deals and latest trends in our online store.
              From the latest fashion to cutting-edge electronics, we have
              something for everyone. Shop with confidence and enjoy seamless
              online shopping with fast delivery and exceptional customer
              service.
            </p>
          </div>

          <Link
            href={paths.root}
            className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12 bg-[#2e7d32] p-2 rounded-xl text-white"
          >
            Go Bekreta Main Site
          </Link>
        </div>

        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
          Copyright &copy; {currentYear}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FeaturedProductFooter;
