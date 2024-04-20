import { IProductItem } from "@/types/products";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";

interface IQuestionModalProps {
  dialog: {
    value: boolean;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
  };
  product: IProductItem;
}

const QuestionModal = ({ dialog, product }: IQuestionModalProps) => {
  return (
    <>
      <Transition appear show={dialog.value} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={dialog.setFalse}>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-3 md:p-6 text-left align-middle shadow-xl transition-all">
                  <div className=" p-2 py-6 rounded-lg max-w-md mx-auto  md:p-8">
                    <form>
                      <h3 className="text-2xl text-blue-500 pb-7">
                        Ask Questions
                      </h3>
                      <div className="-mx-2 md:items-center md:flex">
                        <div className="flex-1 px-2 mt-4 md:mt-0">
                          <label className="block mb-2 text-sm text-gray-600">
                            Product
                          </label>
                          <textarea
                            // type="text"
                            placeholder="Doe"
                            className="resize-none w-full h-[95px] md:h-[70px] px-3 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            defaultValue={`Product Id: ${product?._id} Product Name: ${product?.name}`}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block mb-2 text-sm text-gray-600 ">
                          Your Email
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your Email"
                          className="block w-full px-3 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          defaultValue="demo@gmail.com"
                          readOnly
                        />
                      </div>

                      <div className="w-full mt-4">
                        <label className="block mb-2 text-sm text-gray-600 ">
                          Your Question
                        </label>
                        <textarea
                          className=" w-full h-32 px-3 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-32  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Say about your question"
                        ></textarea>
                      </div>

                      <button
                        type="button"
                        className="w-full px-6 py-3 mt-9 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={dialog.setFalse}
                        className="w-full px-6 py-2 mt-4 text-sm font-medium tracking-wide text-gray-900 hover:text-white capitalize transition-colors duration-300 transform border-2 border-gray-800 rounded-lg hover:bg-gray-800  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                      >
                        Back
                      </button>
                    </form>
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

export default QuestionModal;
