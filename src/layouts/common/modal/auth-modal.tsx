import { RHFTextField } from "@/components/react-hook-form";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/reducers/auth/authApi";
import { setToken } from "@/redux/reducers/auth/authSlice";
import {
  AuthFormValues,
  authValidationSchema,
} from "@/sections/auth/auth-validation";
import { BooleanState } from "@/types/utils";
import { Dialog, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, LoadingButton } from "@mui/lab";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IAuthModalProps {
  dialog: BooleanState;
}

const AuthModal = ({ dialog }: IAuthModalProps) => {
  const methods = useForm<AuthFormValues>({
    resolver: zodResolver(authValidationSchema),
  });
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");

  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [loginUser, { isLoading }] = useLoginMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      if (response.success) {
        toast.success(response.message);
        dispatch(setToken(response?.data?.accessToken));
        dialog.setFalse();
      } else {
        toast.error(response.message);
        setErrorMessage(response.message);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.data.message);
      setErrorMessage(error.data.message);
    }
  });

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // if (isAuthenticated) {
  //   router.replace(paths.root);
  // }
  // if (typeof window === "object") {
  //   if (localStorage?.getItem("accessToken")) {
  //     router.push(returnTo || "/");
  //     // router.replace(paths.root);
  //     // eslint-disable-next-line react/jsx-no-useless-fragment
  //     return <></>;
  //   }
  // }

  const handleSignUpRedirect = () => {
    const currentPath = window.location.href;
    dialog.setFalse();
    router.push(`/auth/signup?redirect=${encodeURIComponent(currentPath)}`);
  };

  return (
    <>
      <Transition appear show={dialog.value} as={Fragment}>
        <Dialog
          className="relative z-50 rounded-none"
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
            <div className="flex items-center justify-center text-center min-h-full mx-3">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[25rem] transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all p-7 mx-auto rounded-none">
                  <FormProvider methods={methods} onSubmit={onSubmit}>
                    <h1 className="mt-3 text-2xl font-semibold capitalize sm:text-3xl">
                      sign In
                    </h1>

                    <h3 className="text-sm pt-1">
                      Enter your email and password to Sign In.
                    </h3>

                    {errorMessage && (
                      <Alert severity="error" sx={{ mt: 3 }}>
                        {errorMessage}
                      </Alert>
                    )}

                    <div className="w-full mt-8">
                      <RHFTextField label="Email" name="email" />
                    </div>

                    <div className="w-full mt-4">
                      <RHFTextField
                        label="Password"
                        type="password"
                        name="password"
                      />
                    </div>

                    <div className="mt-6">
                      <LoadingButton
                        type="submit"
                        loading={isLoading}
                        disabled={isLoading}
                        className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-none hover:bg-green-600 disabled:bg-gray-300 `}
                      >
                        Sign in
                      </LoadingButton>

                      <div className="mt-6 text-center ">
                        <div
                          onClick={handleSignUpRedirect}
                          className="text-sm text-green-500 hover:underline cursor-pointer"
                        >
                          Don’t have an account yet? Sign up
                        </div>
                      </div>
                    </div>
                  </FormProvider>
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
