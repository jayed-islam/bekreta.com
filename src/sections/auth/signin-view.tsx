"use client";

import { RHFTextField } from "@/components/react-hook-form";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { paths } from "@/layouts/paths";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/reducers/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthFormValues, authValidationSchema } from "./auth-validation";
import toast from "react-hot-toast";
import { Alert } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setToken } from "@/redux/reducers/auth/authSlice";

const SignInView = () => {
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
        const href = returnTo || "/";
        router.push(href);
      } else {
        toast.error(response.message);
        setErrorMessage(response.message);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.success(error.message);
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
  if (typeof window === "object") {
    if (localStorage?.getItem("accessToken")) {
      router.push(returnTo || "/");
      // router.replace(paths.root);
      // eslint-disable-next-line react/jsx-no-useless-fragment
      return <></>;
    }
  }

  return (
    <div className="bg-gray-100 py-16 md:py-20 lg:py-28 flex items-center justify-center w-full">
      <div className="w-full max-w-[25rem] rounded-xl bg-white shadow-xl p-7">
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
            <RHFTextField label="Password" type="password" name="password" />
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-600">
              Sign in
            </button>

            <div className="mt-6 text-center ">
              <Link
                href={paths.website.signup}
                className="text-sm text-green-500 hover:underline "
              >
                Don’t have an account yet? Sign up
              </Link>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default SignInView;
