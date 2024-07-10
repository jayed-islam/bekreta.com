import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import React from "react";
import { Fragment } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { profileInfo } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/reducers/auth/authSlice";

const ProfilePopover = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`${open ? "text-white" : "text-white/90"}`}
            >
              <button
                className={`ring-inset text-opacity-90 group w-10 h-10 sm:w-12 sm:h-12 rounded-full  outline-none border-2 border-orange-700 cursor-pointer relative focus:outline-none flex items-center justify-center`}
                type="button"
              >
                <Icon icon="ph:user" className="text-lg md:text-2xl" />
              </button>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[230px] px-4 mt-3.5 -right-10 sm:right-0 sm:px-0 opacity-100 translate-y-0">
                {({ close }) => (
                  <div>
                    {" "}
                    <div className="overflow-hidden rounded-3xl shadow-lg">
                      <div className="relative grid grid-cols-1 gap-6 bg-white py-7 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-7 w-7 md:w-12 md:h-12">
                            <img
                              src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                              className="absolute inset-0 w-full h-full object-cover rounded-full"
                            />
                            <span className="wil-avatar__name">J</span>
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-semibold text-sm md:text-md">
                              Edit name
                            </h4>
                            <p className="text-xs mt-0.5">
                              {user && user?.email}
                            </p>
                          </div>
                        </div>
                        <div className="w-full border-b border-neutral-200"></div>
                        {profileInfo.map((info, index) => (
                          <Link
                            onClick={() => close()}
                            href={info.path}
                            className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none"
                          >
                            <div className="flex items-center justify-center flex-shrink-0 text-neutral-500">
                              <Icon icon={info.icon} />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium ">
                                {info.title}
                              </p>
                            </div>
                          </Link>
                        ))}
                        <div className="w-full border-b border-neutral-200"></div>

                        <button
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                          onClick={() => {
                            handleLogout();
                            close();
                          }}
                        >
                          <div className="flex items-center justify-center flex-shrink-0 text-neutral-500">
                            <Icon icon="solar:logout-2-outline" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium ">Log out</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default ProfilePopover;
