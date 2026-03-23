"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pns } from "@/lib/teknisi_constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function TeknisiSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("teknisi") ?? "";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("teknisi");
    } else {
      params.set("teknisi", value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Select value={current || "all"} onValueChange={handleChange}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Semua Teknisi" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Semua Teknisi</SelectItem>
        {pns.map((p) => (
          <SelectItem key={p.id} value={p.name}>
            {p.namalengkap}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
