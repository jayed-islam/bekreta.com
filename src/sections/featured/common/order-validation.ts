import { z } from "zod";

const bdPhoneRegex = /^01[3-9]\d{8}$/;

export const orderSubmissionSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .regex(bdPhoneRegex, { message: "Invalid phone number" }),
  address: z.string({ required_error: "Address is required" }),
});
