import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const bdPhoneRegex = /^01[3-9]\d{8}$/;

export const checkoutSchema = z.object({
  name: z
    .string({ required_error: "Full name is required" })
    .trim()
    .min(3, { message: "Name cannot be empty or just 2 charecture" }),
  address: z
    .string({ required_error: "Address is required" })
    .trim()
    .min(5, { message: "Address cannot be empty or just 4 charecture" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .regex(bdPhoneRegex, {
      message: "Invalid phone number",
    })
    .min(11, { message: "Phone number cannot be empty or just 10 charecture" }),
  orderNote: z.string().trim().optional(),
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

export type TCheckoutFormData = z.infer<typeof checkoutSchema>;
