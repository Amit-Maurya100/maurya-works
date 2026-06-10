import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  productInterest: z.string().optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
