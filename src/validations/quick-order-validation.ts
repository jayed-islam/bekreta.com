// quickOrderValidationSchema.ts
import * as z from "zod";

export const quickOrderSchema = z.object({
  name: z
    .string({ required_error: "Your name is required" })
    .min(1, "নাম আবশ্যক"),
  phone: z
    .string({ required_error: "Mobile number is required" })
    .min(1, "মোবাইল নম্বর আবশ্যক"),
  address: z
    .string({ required_error: "Shipping address is required" })
    .min(1, "ঠিকানা আবশ্যক"),
  couponCode: z.string().optional(),
  orderNote: z.string().optional(),
});

export type QuickOrderFormData = z.infer<typeof quickOrderSchema>;
