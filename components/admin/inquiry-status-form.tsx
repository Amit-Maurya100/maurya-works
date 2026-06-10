"use client";

import { useTransition } from "react";
import { updateInquiryStatus } from "@/app/actions/admin";

export function InquiryStatusForm({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={currentStatus}
      disabled={pending}
      onChange={(e) => {
        startTransition(() =>
          updateInquiryStatus(id, e.target.value as "new" | "contacted" | "closed")
        );
      }}
      className="rounded-md border border-slate-300 px-2 py-1 text-sm"
    >
      <option value="new">New</option>
      <option value="contacted">Contacted</option>
      <option value="closed">Closed</option>
    </select>
  );
}
