// quickOrderValidationSchema.ts
import * as z from "zod";

export const quickOrderSchema = z.object({
  name: z.string().min(1, "নাম আবশ্যক"),
  phone: z.string().min(1, "মোবাইল নম্বর আবশ্যক"),
  address: z.string().min(1, "ঠিকানা আবশ্যক"),
  couponCode: z.string().optional(),
  orderNote: z.string().optional(),
});

export type QuickOrderFormData = z.infer<typeof quickOrderSchema>;
