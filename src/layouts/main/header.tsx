"use client";

import React, { useEffect, useState } from "react";
import { mainMenuItems } from "./config-navigation";
import Link from "next/link";
import { paths } from "../paths";
import { Icon } from "@iconify-icon/react";
import {
  Button,
  IconButton,
} from "../../components/material-tailwind/material-tailwind-components";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../../public/assets/shop_logo.png";
import CartHeaderPopup from "../common/modal/cart-header-popover";

export default function Header() {
  //   const { authenticated, user } = useAppSelector((state) => state.auth);
  const authenticated = false;
  const [open, setOpen] = useState(false);

  //   const websiteRoles: string[] = [UserRoles.user, UserRoles.admin];

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pathname = usePathname();

  const isIncluded: boolean =
    pathname.includes("/checkout") || pathname.includes("course");

  return (
    <header>
      <div className=" sticky top-0 w-full z-20  bg-blue-gray-900">
        <div className="relative shadow-sm border-slate-100 ">
          <div className="max-w-7xl mx-auto px-5 xl:px-0">
            <div className="h-20 flex justify-between items-center w-full">
              <div className="flex items-center lg:hidden">
                <button
                  onClick={() => setOpen(!open)}
                  className="rounded-lg text-neutral-700 focus:outline-none flex items-center justify-center"
                >
                  {/* <IoIosMenu className="text-2xl" /> */}
                </button>
              </div>
              <div className="flex items-center">
                <Link
                  className="inline-block text-slate-600 flex-shrink-0"
                  href="/"
                >
                  <div className="flex items-end gap-2">
                    <Image
                      alt="Logo"
                      className="block h-10 md:h-12 w-auto"
                      src={logo}
                    />
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                      Bazaro
                    </h3>
                  </div>
                  <p className="hidden md:block text-xs text-gray-400">
                    Online superium shoping center
                  </p>
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
                      <a
                        className=" text-slate-600 flex items-center gap-2 flex-shrink-0"
                        href="/"
                      >
                        <img
                          alt="Logo"
                          className="block h-8 sm:h-10 w-auto"
                          src="shop_logo.png"
                        />
                        <h3 className="text-3xl font-bold text-violet-800">
                          Bazaro
                        </h3>
                      </a>
                      <div className="flex flex-col mt-5 text-slate-600 text-sm">
                        <span>
                          Discover the most outstanding articles on all topics
                          of life. Write your stories and share them
                        </span>
                        <div className="flex justify-between items-center mt-4">
                          <nav className="nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000  ">
                            <Link
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl"
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Facebook"
                            >
                              <Icon icon="" />
                              {/* <GrFacebook /> */}
                            </Link>
                            <Link
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl"
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Twitter"
                            >
                              {/* <BsTwitter /> */}
                            </Link>
                            <Link
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl"
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Youtube"
                            >
                              {/* <BsYoutube /> */}
                            </Link>
                            <Link
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl"
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Telegram"
                            >
                              {/* <BiLogoTelegram /> */}
                            </Link>
                          </nav>
                          <span className="block">
                            <button className="text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700  hover:bg-neutral-100 focus:outline-none flex items-center justify-center bg-neutral-100">
                              <span className="sr-only">Enable dark mode</span>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z"
                                  stroke="currentColor"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </button>
                          </span>
                        </div>
                      </div>
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
                      <div className="mt-5">
                        <form
                          action=""
                          method="POST"
                          className="flex-1 text-slate-900"
                        >
                          <div className="bg-slate-50 flex items-center space-x-1 py-3 px-4 rounded-xl h-full">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M22 22L20 20"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                            <input
                              placeholder="Type and press enter"
                              className="border-none bg-transparent focus:outline-none pl-2 focus:ring-0 w-full text-md "
                              type="search"
                            />
                          </div>
                          <input type="submit" value="" />
                        </form>
                      </div>
                    </div>
                    <ul className="flex flex-col py-6 px-2 space-y-1">
                      <li className="text-slate-900 " data-headlessui-state="">
                        <a
                          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 rounded-lg"
                          href="/"
                        >
                          <span className="block w-full">Men</span>
                        </a>
                      </li>
                      <li className="text-slate-900" data-headlessui-state="">
                        <a
                          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 rounded-lg"
                          href="/"
                        >
                          <span className="block w-full">Women</span>
                        </a>
                      </li>
                      <li className="text-slate-900" data-headlessui-state="">
                        <a
                          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 rounded-lg"
                          href="/"
                        >
                          <span className="block w-full">Beauty</span>
                        </a>
                      </li>
                      <li className="text-slate-900 " data-headlessui-state="">
                        <a
                          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 rounded-lg"
                          href="/"
                        >
                          <span className="block w-full">Sport</span>
                        </a>
                      </li>
                      <li className="text-slate-900 " data-headlessui-state="">
                        <a
                          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 rounded-lg"
                          href="/"
                        >
                          <span className="">Electronics</span>
                          <span className="block flex-grow">
                            <span
                              className="flex justify-end flex-grow"
                              id="headlessui-disclosure-button-:r2k:"
                              aria-expanded="false"
                              data-headlessui-state=""
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="ml-2 h-4 w-4 text-neutral-500"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </span>
                        </a>
                      </li>
                      <li className="text-slate-900 " data-headlessui-state="">
                        <a
                          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 rounded-lg"
                          href="/"
                        >
                          <span className="">Explore</span>
                          <span className="block flex-grow">
                            <span
                              className="flex justify-end flex-grow"
                              id="headlessui-disclosure-button-:r2m:"
                              aria-expanded="false"
                              data-headlessui-state=""
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="ml-2 h-4 w-4 text-neutral-500"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* small hidden */}
              <div className="lg:flex items-center gap-5 hidden">
                <div></div>
                <form
                  // onSubmit={handleSubmit(onSubmit)}
                  className="bg-white flex items-center rounded-md w-[500px] relative"
                >
                  <input
                    type="text"
                    name="search"
                    placeholder="Search for products..."
                    className="flex-grow bg-white px-5 rounded-md h-[55px] w-full border-none focus:outline-none"
                    // {...register("search", { required: true })}
                  />
                  <button type="submit" className="absolute right-5">
                    {/* <RiSearchLine  /> */}
                    <Icon
                      icon="teenyicons:search-outline"
                      className="h-5 w-5 text-gray-600"
                    />
                  </button>
                </form>
              </div>

              {/* ooffers section */}

              <div
                // onClick={handleLogout}
                className="lg:flex items-center gap-3 mr-7 cursor-pointer hidden"
              >
                <Icon
                  icon="ph:gift-light"
                  className="text-orange-600 font-extrabold text-2xl"
                />
                <div>
                  <h3 className="font-semibold text-white">Offers</h3>
                  <p className="text-xs text-gray-400 ">Letest Offers</p>
                </div>
              </div>

              <Link
                href="/signin"
                className="lg:flex items-center gap-3 mr-7 cursor-pointer hidden"
              >
                <Icon
                  icon="iconoir:profile-circle"
                  className="text-orange-600 font-extrabold text-2xl"
                />
                <div>
                  <h3 className="font-semibold text-white">Create Account</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-400 ">
                    <Link
                      href="/signup"
                      className="hover:text-orange-600 transition-all duration-150 ease-in"
                    >
                      Signup
                    </Link>
                    <p>or</p>
                    <Link
                      href="/signin"
                      className="hover:text-orange-600 transition-all duration-150 ease-in"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </Link>

              {/* <div className=" flex items-center justify-end gap-3">
                {user?.uid && (
                  <div className="hidden lg:block">
                    <div className=" md:relative">
                      <button
                        id="profileButton"
                        onClick={toggleProfile}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white hover:text-orange-700 focus:outline-none flex items-center justify-center border-[2px] border-orange-700"
                        type="button"
                      >
                        <svg
                          className=" w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                <div className="relative">
                  <button
                    id="wishlistButton"
                    onClick={toggleWishlist}
                    className={` hidden text-opacity-90 group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate100 rounded-full lg:inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 border-2 border-orange-700 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer relative" type="button ${
                      wishlistItems?.length === 0
                        ? "bg-red-50 text-red-500"
                        : " text-white hover:text-orange-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 flex items-center justify-center absolute top-1 right-[1px] rounded-full text-[10px] leading-none text-white font-medium ${
                        wishlistItems?.length === 0
                          ? "bg-red-500 text-white"
                          : "bg-blue-500"
                      }`}
                    >
                      <span className="">{wishlistItems?.length}</span>
                    </div>
                    <AiOutlineHeart size={24} />
                  </button>
                </div>

                <div className="relative">
                  <button
                    id="cartButton"
                    onClick={toggleCart}
                    className={` hidden text-opacity-90 group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate100 rounded-full lg:inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 border-2 border-orange-700 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer relative" type="button ${
                      cartItems?.length === 0
                        ? "bg-red-50 text-red-500"
                        : " text-white hover:text-orange-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 flex items-center justify-center absolute top-1 right-[1px] rounded-full text-[10px] leading-none text-white font-medium ${
                        cartItems?.length === 0
                          ? "bg-red-500 text-white"
                          : "bg-blue-500"
                      }`}
                    >
                      <span className="">{cartItems?.length}</span>
                    </div>
                    <HiOutlineShoppingBag size={24} />
                  </button>

                  <Link
                    to="/cart"
                    className={` lg:hidden text-opacity-90 group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate100 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer relative" type="button ${
                      cartItems?.length === 0
                        ? "bg-red-50 text-red-500"
                        : "bg-slate-100"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 flex items-center justify-center absolute top-1.5 right-[1px] rounded-full text-[10px] leading-none text-white font-medium ${
                        cartItems?.length === 0
                          ? "bg-red-500 text-white"
                          : "bg-blue-500"
                      }`}
                    >
                      <span className="mt-[1px]">{cartItems?.length}</span>
                    </div>
                    <HiOutlineShoppingBag size={24} />
                  </Link>

                  <div
                    ref={cartDivRef}
                    id="cartDiv"
                    className={`${
                      cartOpen ? "block opacity-100" : "hidden opacity-0 "
                    } transition-opacity duration-300 ease-in-out`}
                    onClick={toggleCart}
                  >
                    <CartedISubMenu
                      cartItems={cartItems}
                      handleIncrease={handleIncrease}
                      handleDecrease={handleDecrease}
                      removeFromCart={removeFromCart}
                    />
                  </div>

                  <div
                    ref={profileRef}
                    id="profileDiv"
                    className={`${
                      profileOpen ? "block opacity-100" : "hidden opacity-0 "
                    } transition-opacity duration-300 ease-in-out`}
                    onClick={toggleProfile}
                  >
                    <ProfileSubMenu />
                  </div>

                  <div
                    ref={wishlistRef}
                    id="wishlistDiv"
                    className={`${
                      wishlistOpen ? "block opacity-100" : "hidden opacity-0 "
                    } transition-opacity duration-300 ease-in-out`}
                    onClick={toggleWishlist}
                  >
                    <WistlistNavbarCard
                      wishlistItems={wishlistItems}
                      addToWishlist={addToWishlist}
                    />
                  </div>
                </div>
              </div> */}
              <div>
                <CartHeaderPopup />
              </div>
            </div>
          </div>
        </div>
        {/* <CartSIdebar
          lastAddedItem={lastAddedItem}
          showCartSidebar={showCartSidebar}
        /> */}
      </div>
    </header>
  );
}
