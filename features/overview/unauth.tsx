"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function UnauthorizedToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("unauthorized") === "true") {
      toast.error("Unauthorized access", {
        position: "bottom-left",
        description: "You do not have permission to access that page.",
      });
    }
  }, [searchParams]);

  return null;
}