"use client";

import { RHFTextField } from "@/components/react-hook-form";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { paths } from "@/layouts/paths";
import { useRegisterMutation } from "@/redux/reducers/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthFormValues, authValidationSchema } from "./auth-validation";
import { Alert, AlertTitle } from "@mui/material";
import { useAppSelector } from "@/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingButton } from "@mui/lab";

const SignUpView = () => {
  const methods = useForm<AuthFormValues>({
    resolver: zodResolver(authValidationSchema),
  });

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  const [createUser, { isLoading }] = useRegisterMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createUser(data).unwrap();
      if (response.success) {
        toast.success(response.message);
        setErrorMessage(null);
        const returnPath = `${paths.website.signin}?${returnTo}`;
        router.push(returnPath || "/");
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
      }, 11000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // if (isAuthenticated) {
  //   router.replace(paths.root);
  // }
  const redirect = searchParams.get("redirect");

  return (
    <div className="bg-gray-100 flex items-center justify-center w-full py-16 md:py-20 lg:py-28 px-3">
      <div className="w-full max-w-[25rem] bg-white shadow-xl px-5 py-7 md:px-7">
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <h1 className="mt-3 text-2xl font-semibold capitalize sm:text-3xl">
            sign Up
          </h1>

          <h3 className="text-sm pt-1">
            Enter your email and password to Sign Up.
          </h3>

          {errorMessage && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {errorMessage}
            </Alert>
          )}

          <div className="w-full mt-8">
            {/* <h2 className="text-md font-bold">Your Email</h2> */}
            <RHFTextField label="Email" name="email" />
          </div>

          <div className="w-full mt-4">
            {/* <h2 className="text-md font-bold">Your Password</h2> */}
            <RHFTextField label="Password" type="password" name="password" />
          </div>

          <div className="mt-6">
            {/* <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-600">
              Sign up
            </button> */}
            <LoadingButton
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              variant="contained"
              color="success"
              sx={{
                textTransform: "capitalize",
              }}
              fullWidth
            >
              Sign up
            </LoadingButton>

            {/* <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              or sign up with
            </p>

            <a
              href="#"
              className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>

              <span className="mx-2">Sign up with Google</span>
            </a> */}

            <div className="mt-6 text-center ">
              <Link
                href={`${paths.website.signin}${
                  redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""
                }`}
                className="text-sm text-green-500 hover:underline cursor-pointer"
              >
                Already have an account yet? Sign in
              </Link>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default SignUpView;
