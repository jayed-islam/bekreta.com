import useBoolean from "@/hooks/use-boolean";
import ActionButton from "@/layouts/common/buttons/action-button";
import DeleteConformationModal from "@/layouts/common/modal/delete-modal";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";

const CartRow = () => {
  const dialog = useBoolean();
  return (
    <>
      <div className="relative flex py-3 px-3 rounded-xl my-3 bg-white first:mt-0 last:mb-0">
        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            className="h-full w-full object-cover"
          />
          <a className="absolute inset-0" href="/product-detail"></a>
        </div>
        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <Link href={`/details/1`} className="text-base font-semibold">
                  Hand-Painted Ceramic Vase
                </Link>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 ">
                  <div className="flex items-center space-x-1.5">
                    <Icon
                      icon="ant-design:bg-colors-outlined"
                      className="text-xl"
                    />
                    <span>Black</span>
                  </div>
                  <span className="mx-4 border-l border-slate-200  "></span>
                  <div className="flex items-center space-x-1.5">
                    <Icon
                      icon="fluent-mdl2:product-variant"
                      className="text-xl"
                    />
                    <span>Gmieai</span>
                  </div>
                </div>
                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <select
                    name="qty"
                    id="qty"
                    className="form-select text-sm rounded-md py-1 border-slate-200  relative z-10"
                  >
                    {[1, 2, 3, 4, 5].map((item, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                  <div className="">
                    <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full">
                      <span className="text-green-500 !leading-none">$500</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block text-center relative">
                <div className="nc-NcInputNumber flex items-center justify-between space-x-5 relative z-10">
                  <div className="nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28">
                    {/* <button
                      className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400  bg-white  focus:outline-none hover:border-neutral-700  disabled:hover:border-neutral-400  disabled:opacity-50 disabled:cursor-default"
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
                    </button> */}
                    <ActionButton icon="ph:plus" />
                    <span className="select-none block flex-1 text-center leading-none">
                      5
                    </span>
                    {/* <button
                      className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400  bg-white focus:outline-none hover:border-neutral-700  disabled:hover:border-neutral-400  disabled:opacity-50 disabled:cursor-default"
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
                    </button> */}
                    <ActionButton icon="ph:minus" />
                  </div>
                </div>
              </div>
              <div className="hidden flex-1 sm:flex justify-end">
                <div className="mt-0.5">
                  <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                    <span className="text-green-500 !leading-none">$500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700  border border-slate-200 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="w-3.5 h-3.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
              <span className="ml-1 leading-none">In Stock</span>
            </div>
            <button
              onClick={dialog.setTrue}
              className="relative z-10 flex items-center mt-3 font-bold text-blue-600 hover:text-primary-500 text-sm "
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
      <DeleteConformationModal dialog={dialog} />
    </>
  );
};

export default CartRow;
