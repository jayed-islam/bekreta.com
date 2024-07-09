import { z } from "zod";

const bdPhoneRegex = /^01[3-9]\d{8}$/;

export const orderSubmissionSchema = z.object({
  fullName: z.string({ required_error: "Name is required" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .regex(bdPhoneRegex, { message: "Invalid phone number" }),
  division: z.string({ required_error: "Division is required" }),
  district: z.string({ required_error: "District is required" }),
  subDistrict: z.string({ required_error: "Sub-District is required" }),
  detailAddress: z.string({ required_error: "Detail Address is required" }),
});
