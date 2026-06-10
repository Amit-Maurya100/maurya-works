"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryActionState } from "@/app/actions/inquiry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: InquiryActionState = {};

export function InquiryForm({
  productInterest,
}: {
  productInterest?: string;
}) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);

  if (state.success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800">Thank you!</h3>
        <p className="mt-2 text-green-700">
          Your inquiry has been submitted. We will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{state.error}</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" required placeholder="Your name" />
          {state.fieldErrors?.name && (
            <p className="text-sm text-red-600">{state.fieldErrors.name[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" placeholder="Company name" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" name="phone" required placeholder="+91 XXXXX XXXXX" />
          {state.fieldErrors?.phone && (
            <p className="text-sm text-red-600">{state.fieldErrors.phone[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" required placeholder="you@company.com" />
          {state.fieldErrors?.email && (
            <p className="text-sm text-red-600">{state.fieldErrors.email[0]}</p>
          )}
        </div>
      </div>

      {productInterest && (
        <input type="hidden" name="productInterest" value={productInterest} />
      )}

      {!productInterest && (
        <div className="space-y-2">
          <Label htmlFor="productInterest">Product / Service Interest</Label>
          <Input
            id="productInterest"
            name="productInterest"
            placeholder="e.g. Ring spinning frame, machine repair"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your requirements..."
        />
        {state.fieldErrors?.message && (
          <p className="text-sm text-red-600">{state.fieldErrors.message[0]}</p>
        )}
      </div>

      <Button type="submit" variant="accent" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Submitting..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
