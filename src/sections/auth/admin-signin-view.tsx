"use client";

import { RHFTextField } from "@/components/react-hook-form";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { paths } from "@/layouts/paths";
import { useAdminLoginMutation } from "@/redux/reducers/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthFormValues, authValidationSchema } from "./auth-validation";
import toast from "react-hot-toast";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setToken } from "@/redux/reducers/auth/authSlice";
import { LoadingButton } from "@mui/lab";

const AdminSignInView = () => {
  const methods = useForm<AuthFormValues>({
    resolver: zodResolver(authValidationSchema),
  });
  const dispatch = useAppDispatch();

  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [loginAdmin, { isLoading }] = useAdminLoginMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await loginAdmin(data).unwrap();
      if (response.success) {
        toast.success(response.message);
        dispatch(setToken(response?.data?.accessToken));
        router.push(paths.admin.root);
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

  return (
    <div className="bg-gray-100  flex items-center justify-center w-full px-3 h-screen">
      <div className="w-full max-w-[25rem] bg-white shadow-xl px-5 md:px-7 py-7">
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
            <LoadingButton
              type="submit"
              loading={isLoading}
              variant="contained"
              size="large"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-none hover:bg-green-600"
            >
              Sign in
            </LoadingButton>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default AdminSignInView;
