import { RHFTextField } from "@/components/react-hook-form";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { paths } from "@/layouts/paths";
import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const CheckoutInstantSignin = () => {
  const methods = useForm();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });

  return (
    <div className="px-3 xl:px-0">
      <Accordion
        sx={{
          padding: "5px",
        }}
      >
        <AccordionSummary>
          <Typography fontWeight={700}>
            Truck your order?{" "}
            <span className="text-green-500">Click here to login</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <h1 className="mt-3 text-2xl font-semibold capitalize sm:text-3xl">
              sign In
            </h1>

            <h3 className="text-sm pt-1">
              Enter your email and password to Sign In.
            </h3>

            <div className="w-full mt-8">
              <RHFTextField label="Email" name="email" size="small" />
            </div>

            <div className="w-full mt-4">
              <RHFTextField
                label="Password"
                type="password"
                name="password"
                size="small"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-600"
              >
                Sign in
              </button>

              <div className="mt-6 text-center ">
                <Link
                  href={paths.website.signup}
                  className="text-sm text-green-500 hover:underline dark:text-blue-400"
                >
                  Don’t have an account yet? Sign up
                </Link>
              </div>
            </div>
          </FormProvider>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CheckoutInstantSignin;
