import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const bdPhoneRegex = /^01[3-9]\d{8}$/;

export const checkoutSchema = z.object({
  name: z
    .string({ required_error: "Full name is required" })
    .min(1, { message: "Name is required" }),
  address: z.string({ required_error: "Address is required" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(bdPhoneRegex, {
      message: "Invalid phone number",
    }),
  orderNote: z.string().optional(),
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
