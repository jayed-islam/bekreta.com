import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const checkoutSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .regex(emailRegex, { message: "Invalid email address" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(11, { message: "Phone number must be at least 11 digits" }),
  division: z
    .string({ required_error: "Division is required" })
    .min(1, { message: "Division is required" }),
  district: z
    .string({ required_error: "District is required" })
    .min(1, { message: "District is required" }),
  subDistrict: z
    .string({ required_error: "Sub District is required" })
    .min(1, { message: "SubDistrict is required" }),
  detailAddress: z
    .string({ required_error: "Details address is required" })
    .min(1, { message: "Details Address is required" }),
});

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number().positive(),
  price: z.number().positive(),
});

export const orderSummarySchema = z.object({
  products: z.array(productSchema),
  totalAmount: z.number().positive(),
});

export const completeCheckoutSchema = z.object({
  ...checkoutSchema.shape,
  orderSummary: orderSummarySchema,
});
