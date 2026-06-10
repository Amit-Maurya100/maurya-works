"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  action,
  label = "Delete",
}: {
  action: () => Promise<void>;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (confirm("Are you sure you want to delete this item?")) {
          startTransition(() => action());
        }
      }}
    >
      {pending ? "Deleting..." : label}
    </Button>
  );
}
