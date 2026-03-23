"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface AlatPaginationProps {
  page: number;
  totalPages: number;
}

export function AlatPagination({ page, totalPages }: AlatPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function navigate(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <p className="text-muted-foreground text-sm">
        Halaman {page} dari {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(page - 1)}
          disabled={page <= 1}
        >
          Sebelumnya
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(page + 1)}
          disabled={page >= totalPages}
        >
          Berikutnya
        </Button>
      </div>
    </div>
  );
}
