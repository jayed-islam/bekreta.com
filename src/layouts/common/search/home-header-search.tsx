import useBoolean from "@/hooks/use-boolean";
import { paths } from "@/layouts/paths";
import { Popover, Transition } from "@headlessui/react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function HomeHeaderSearch() {
  const topSearchWord = ["enhance", "upgrade", "maximize", "child", "book"];
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const popover = useBoolean();

  const onSubmit = (data: any) => {
    router.push(`${paths.product.category}?search=${data.search}`);
  };

  return (
    <div className="w-[500px]">
      <Popover className="relative w-[500px]">
        {({ open }) => (
          <>
            <Popover.Button className="w-[500px] ring-none">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white flex items-center rounded-md w-[500px] relative"
              >
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="flex-grow bg-white px-5 rounded-md h-[55px] w-full border-none focus:outline-none"
                  {...register("search", { required: true })}
                />
                <button type="submit" className="absolute right-5">
                  <Icon
                    icon="teenyicons:search-outline"
                    className="text-xl mt-1 text-gray-600"
                  />
                </button>
              </form>
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
              <Popover.Panel className="absolute left-0 right-0 z-10 mt-3 transform">
                {({ close }) => (
                  <div className="overflow-hidden rounded-lg shadow-lg bg-white p-5">
                    <div className="lg:flex flex-col items-center gap-2 w-full">
                      {topSearchWord.map((word, index) => (
                        <div
                          onClick={async () => {
                            router.push(
                              `${paths.product.category}?search=${word}`
                            );
                            close();
                          }}
                          key={index}
                          className="w-full hover:bg-gray-200 px-5 py-2 rounded-md text-left cursor-pointer"
                        >
                          <h2 className="text-sm ">{word}</h2>
                        </div>
                      ))}
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
}
