"use client";

import React, { useEffect, useState } from "react";
import { mainMenuItems } from "./config-navigation";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";

import Image from "next/image";
import logo from "../../../public/assets/logo.jpg";
import { paths } from "../paths";
import HomeHeaderSearch from "../common/search/home-header-search";
import ProfilePopover from "../common/modal/profile-popover";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openCartDrawer } from "@/redux/reducers/cart/cartSlice";

export default function Header() {
  const [open, setOpen] = useState(false);

  const { cartItems } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleOpenDrawer = () => {
    dispatch(openCartDrawer());
  };

  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 201 || window.scrollY < lastScrollY) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`w-full transition-all duration-700 bg-slate-900 z-10 ${
        isSticky && "sticky top-0"
      }`}
    >
      <div className="relative shadow-sm border-slate-100">
        <div className="max-w-6xl mx-auto px-5 xl:px-0">
          <div className="h-20 flex justify-between items-center w-full">
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="rounded-lg text-neutral-700 focus:outline-none flex items-center justify-center"
              >
                <Icon icon="ion:menu-outline" className="text-3xl text-white" />
              </button>
            </div>
            <div className="flex items-center">
              <Link
                className="inline-block text-slate-600 flex-shrink-0"
                href="/"
              >
                <div className="flex items-end">
                  <Image
                    alt="Logo"
                    className="h-10 md:h-12 w-auto rounded-sm"
                    src={logo}
                  />
                  {/* <h3 className="text-3xl md:text-4xl font-bold text-white">
                    Bazaro
                  </h3> */}
                </div>
                {/* <p className="hidden md:block text-xs text-gray-400">
                  Online superium shoping center
                </p> */}
              </Link>
            </div>
            <div
              className={`bg-white h-screen absolute outline-none transition-all ease-in duration-300 ${
                open ? "w-full top-0 left-0" : "w-0 -left-[200px] top-0"
              }`}
            >
              <div className="z-20 relative  translate-x-0">
                <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg bg-white divide-y-2">
                  <div className="py-6 px-5">
                    <Link
                      className=" text-slate-600 flex items-center gap-2 flex-shrink-0"
                      href="/"
                    >
                      <Image
                        alt="Logo"
                        className="block h-10 md:h-12 w-auto"
                        src={logo}
                      />
                    </Link>
                    <h3 className="text-3xl font-bold text-violet-800">
                      Bazaro
                    </h3>
                    <span className="absolute right-2 top-2 p-1">
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-700  hover:bg-neutral-100   focus:outline-none"
                        onClick={() => setOpen(!open)}
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-5 h-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </span>
                  </div>
                  <ul className="flex flex-col py-6 px-2 space-y-1">
                    {mainMenuItems.map((item, index) => (
                      <li className="text-slate-900" key={index}>
                        <Link
                          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 rounded-lg"
                          href="/"
                        >
                          <span className="block w-full">{item.text}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/*search section*/}
            <div className="lg:flex items-center gap-5 hidden">
              <HomeHeaderSearch />
            </div>

            {/* ooffers section */}

            <Link href={paths.product.category}>
              <div className="md:flex items-center gap-3 mr-7 cursor-pointer hidden">
                <div className="h-5 w-5">
                  <Icon
                    icon="ph:gift-light"
                    className="text-orange-600 font-extrabold text-2xl"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Offers</h3>
                  <p className="text-xs text-gray-400 ">Letest Offers</p>
                </div>
              </div>
            </Link>

            <Link
              href={paths.website.signin}
              className="sm:flex items-center gap-3 mr-7 cursor-pointer hidden"
            >
              <div className="h-5 w-5">
                <Icon
                  icon="iconoir:profile-circle"
                  className="text-orange-600 font-extrabold text-2xl"
                />
              </div>
              <div>
                <h3 className="font-semibold text-white">Create Account</h3>
                <div className="flex items-center gap-1 text-xs text-gray-400 ">
                  <Link
                    href={paths.website.signup}
                    className="hover:text-orange-600 transition-all duration-150 ease-in"
                  >
                    Signup
                  </Link>
                  <p>or</p>
                  <Link
                    href={paths.website.signin}
                    className="hover:text-orange-600 transition-all duration-150 ease-in"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              {user && user._id && <ProfilePopover />}
              {/* <CartHeaderPopover /> */}
              <button
                className={`text-opacity-90 group w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center outline-none border-2 border-orange-700  cursor-pointer relative focus:outline-none focus:ring-0 text-white`}
                type="button"
                onClick={handleOpenDrawer}
              >
                <div
                  className={`w-4 h-4 right-0 flex items-center justify-center absolute top-1 rounded-full text-[10px] leading-none text-white font-medium bg-green-500`}
                >
                  <span className="">{cartItems.length}</span>
                </div>
                <Icon icon="iconoir:cart" className="text-lg md:text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
