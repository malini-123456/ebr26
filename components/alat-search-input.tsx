"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function AlatSearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    params.delete("page");
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <Input
      placeholder="Cari nama, merek, tipe, no. seri..."
      defaultValue={searchParams.get("q") ?? ""}
      onChange={handleChange}
      className="max-w-sm"
    />
  );
}
