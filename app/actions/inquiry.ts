"use server";

import { prisma } from "@/lib/prisma";
import { inquirySchema } from "@/lib/validations/inquiry";
import { revalidatePath } from "next/cache";

export type InquiryActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitInquiry(
  _prevState: InquiryActionState,
  formData: FormData
): Promise<InquiryActionState> {
  const raw = {
    name: formData.get("name"),
    company: formData.get("company") || undefined,
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
    productInterest: formData.get("productInterest") || undefined,
  };

  const parsed = inquirySchema.safeParse(raw);

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await prisma.inquiry.create({
      data: parsed.data,
    });

    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch {
    return { error: "Failed to submit inquiry. Please try again." };
  }
}
