import SignUpView from "@/sections/auth/siginup-view";
import SignInView from "@/sections/auth/signin-view";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";

interface IAuthModalProps {
  dialog: {
    value: boolean;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const AuthModal = ({ dialog }: IAuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    if (activeTab === "signin") {
      try {
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    } else {
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <section className="bg-white max-w-md mx-auto py-11">
                    <div className="container flex items-center justify-center px-6">
                      <form
                        className="w-full max-w-md pt-24 pb-32 lg:pt-0 lg:pb-0"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        {/* <h3 className='text-2xl font-semibold'>Sign In</h3> */}
                        {/* Tab buttons */}
                        <div className="flex justify-center gap-5 mb-11">
                          <button
                            type="button"
                            className={`text-md font-semibold  px-5 py-1 border-2 border-orange-600 rounded-full ${
                              activeTab === "signin"
                                ? "text-white bg-orange-600"
                                : "text-gray-500"
                            }`}
                            onClick={() => handleTabChange("signin")}
                          >
                            Sign In
                          </button>
                          <button
                            type="button"
                            className={`text-md font-semibold  px-5 py-1 border-2 border-orange-600 rounded-full ${
                              activeTab === "signup"
                                ? "text-white bg-orange-600"
                                : "text-gray-500"
                            }`}
                            onClick={() => handleTabChange("signup")}
                          >
                            Sign Up
                          </button>
                        </div>

                        {/* tab items details */}
                        {activeTab === "signin" && (
                          <SignInView handleTabChange={handleTabChange} />
                        )}

                        {activeTab === "signup" && (
                          <SignUpView handleTabChange={handleTabChange} />
                        )}
                      </form>
                    </div>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AuthModal;
