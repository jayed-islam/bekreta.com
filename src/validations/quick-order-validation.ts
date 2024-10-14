// quickOrderValidationSchema.ts
import * as z from "zod";

const bdPhoneRegex = /^01[3-9]\d{8}$/;

export const quickOrderSchema = z.object({
  name: z
    .string({ required_error: "Your name is required" })
    .min(1, "নাম আবশ্যক"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .regex(bdPhoneRegex, {
      message: "Invalid phone number",
    })
    .min(11, { message: "Phone number cannot be empty or just 10 charecture" }),
  address: z
    .string({ required_error: "Shipping address is required" })
    .min(1, "ঠিকানা আবশ্যক"),
  couponCode: z.string().optional(),
  orderNote: z.string().optional(),
});

export type QuickOrderFormData = z.infer<typeof quickOrderSchema>;
