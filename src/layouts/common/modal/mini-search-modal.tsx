"use client";
import { paths } from "@/layouts/paths";
import { BooleanState } from "@/types/utils";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

interface ISearchModal {
  dialog: BooleanState;
}

const MiniSearchModal = ({ dialog }: ISearchModal) => {
  const [query, setQuery] = useState("");

  const router = useRouter();

  const onSubmit = () => {
    router.push(`${paths.product.category}?search=${query}`);
    dialog.setFalse();
  };

  return (
    <>
      <Transition appear show={dialog.value} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={dialog.setFalse}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-3 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">
                  <div className="">
                    <div className="bg-gray-100 flex items-center rounded-md  relative">
                      <input
                        type="text"
                        placeholder="Search for products..."
                        onChange={(e) => setQuery(e.target.value)}
                        className={`flex-grow border border-gray-100 bg-transparent border-none focus:outline-none h-[55px] px-5 w-full rounded-md`}
                      />
                      <button
                        type="button"
                        onClick={onSubmit}
                        className="absolute right-5"
                      >
                        <Icon
                          icon="iconamoon:search-light"
                          className="text-gray-600 text-xl"
                        />
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MiniSearchModal;
