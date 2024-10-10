import { RHFTextField } from "@/components/react-hook-form";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { paths } from "@/layouts/paths";
import {
  ArrowDownwardSharp,
  ArrowDropDownCircleOutlined,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthFormValues, authValidationSchema } from "../auth/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/reducers/auth/authApi";
import { setToken } from "@/redux/reducers/auth/authSlice";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

const CheckoutInstantSignin = () => {
  const methods = useForm<AuthFormValues>({
    resolver: zodResolver(authValidationSchema),
  });
  const dispatch = useAppDispatch();

  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  // const redirectPath =
  //   new URLSearchParams(window.location.search).get("redirect") || "/";

  const [loginUser, { isLoading }] = useLoginMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      if (response.success) {
        toast.success(response.message);
        dispatch(setToken(response?.data?.accessToken));
        let redirectPath;
        if (typeof window !== "undefined") {
          const redirectPath =
            new URLSearchParams(window?.location.search).get("redirect") || "/";
          router.push(redirectPath);
        }
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
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="px-3 xl:px-0 max-w-sm">
        <Accordion
          sx={{
            padding: "5px",
            borderRadius: "2rem",
          }}
        >
          <AccordionSummary
            sx={{
              borderRadius: 50,
            }}
          >
            <Typography fontWeight={700} color="green">
              <span className="text-black pr-2">ওর্ডার স্টাটাস দেখতে</span>
              লগইন করুন
            </Typography>

            <ArrowDownwardSharp />
          </AccordionSummary>
          <AccordionDetails>
            {errorMessage && (
              <Alert severity="error" sx={{ my: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <h1 className="text-2xl font-semibold capitalize sm:text-3xl">
              sign In
            </h1>

            <h3 className="text-sm pt-1">
              Enter your email and password to Sign In.
            </h3>

            <div className="w-full mt-8">
              <RHFTextField label="Email" name="email" />
            </div>

            <div className="w-full mt-4">
              <RHFTextField label="Password" type="password" name="password" />
            </div>

            <div className="mt-6">
              <LoadingButton
                fullWidth
                size="large"
                variant="contained"
                type="submit"
                color="success"
                loading={isLoading}
                disabled={isLoading}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Log in
              </LoadingButton>
              <div className="mt-6 text-center ">
                <Link
                  href={paths.website.signup}
                  className="text-sm text-green-500 hover:underline dark:text-blue-400"
                >
                  Don’t have an account yet? Sign up
                </Link>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </FormProvider>
  );
};

export default CheckoutInstantSignin;
