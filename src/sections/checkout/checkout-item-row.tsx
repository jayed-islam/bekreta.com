import useBoolean from "@/hooks/use-boolean";
import ActionButton from "@/layouts/common/buttons/action-button";
import DeleteConformationModal from "@/layouts/common/modal/delete-modal";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React from "react";

const CheckoutProductRow = () => {
  const click = () => {
    console.log("ff");
  };
  const dialog = useBoolean();
  return (
    <div className="relative flex bg-white p-3 border rounded-xl gap-3 shadow-sm">
      <div className="relative h-28 w-24  flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 border">
        <img
          src="/assets/images/category/jewelry.avif"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between ">
          <div className="flex-[1.5] ">
            <h3 className="text-base font-semibold">
              <a href="/product-detail">Modern Table Lamp</a>
            </h3>
            <div className="mt-1.5 sm:mt-2.5  hidden sm:flex text-sm text-slate-600 ">
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
              <div className="flex items-center justify-between w-[104px] sm:w-28">
                <ActionButton icon="ph:plus" />
                <span className="select-none block flex-1 text-center leading-none">
                  5
                </span>
                <ActionButton icon="ph:minus" />
              </div>
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
        <div className="flex mt-auto pt-4 items-end justify-between text-sm">
          <div className="hidden sm:block text-center relative">
            <div className="nc-NcInputNumber flex items-center justify-between space-x-5 relative z-10">
              <div className="nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28">
                <ActionButton icon="ph:minus" />
                <span className="select-none block flex-1 text-center leading-none">
                  5
                </span>
                <ActionButton icon="ph:plus" onClick={click} />
              </div>
            </div>
          </div>
          <button
            onClick={dialog.setTrue}
            type="button"
            className="relative z-10 flex items-center mt-3 font-semibold text-green-600 hover:text-primary-500 text-sm "
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
