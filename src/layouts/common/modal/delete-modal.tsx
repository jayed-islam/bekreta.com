import SmallLoader from "@/components/loader/small-loader";
import { useAppDispatch } from "@/redux/hooks";
import { useRemoveFromCartMutation } from "@/redux/reducers/cart/cartApi";
import { BooleanState } from "@/types/utils";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { Fragment, useContext, useState } from "react";
import toast from "react-hot-toast";

interface ICartDialogProps {
  dialog: BooleanState;
  productId: string;
}

const DeleteConformationModal = ({ dialog, productId }: ICartDialogProps) => {
  const dispatch = useAppDispatch();

  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

  const handleRemoveProduct = async (productId: string) => {
    try {
      const res = await removeFromCart(productId).unwrap();
      if (res.success) {
        console.log(res.message);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message);
    }
  };

  return (
    <>
      <Transition appear show={dialog.value} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30 px-5"
          onClose={dialog.setFalse}
        >
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[415px] transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all p-9">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <h3>Remove From Cart</h3>
                  </Dialog.Title>

                  <button
                    className="absolute top-5 right-5"
                    type="button"
                    onClick={dialog.setFalse}
                  >
                    <Icon
                      icon="carbon:close"
                      className="text-slate-100 text-xl"
                    />
                  </button>
                  <div className=" bg-white flex flex-col items-start justify-center">
                    <h3 className="text-sm pt-2 pb-6">
                      Item(s) will be removed from cart
                    </h3>
                    <div className="flex items-center gap-2 justify-end w-full">
                      <div
                        className="px-5 text-sm rounded-3xl bg-gray-100 border border-gray-300 hover:bg-gray-200 transition-all duration-300 text-slate-500 flex items-center justify-center h-9 cursor-pointer"
                        onClick={dialog.setFalse}
                      >
                        <p>CANCEL</p>
                      </div>
                      <button
                        className="px-5 text-sm rounded-3xl bg-red-500 hover:bg-red-600 transition-all duration-300 text-white flex items-center justify-center h-9 border border-transparent cursor-pointer"
                        onClick={() => handleRemoveProduct(productId)}
                      >
                        {isLoading ? <SmallLoader /> : "REMOVE"}
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

export default DeleteConformationModal;
