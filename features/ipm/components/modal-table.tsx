"use client";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/table/data-table";
import { Alat } from "@/features/alat/components/type";
import { useDataTable } from "@/hooks/use-data-table";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { modalipmColumns } from "./column";

interface ModalTableProps {
  data: Alat[];
  totalItems: number;
}

export default function ModalTable({ data, totalItems }: ModalTableProps) {
  const searchParams = useSearchParams();

  const pageSize = Number(searchParams.get("perPage")) || 10;
  // If your table accepts 0 pageCount in server-mode, keep as-is; otherwise clamp to >= 1.
  const pageCount = Math.ceil(totalItems / pageSize); // or Math.max(1, Math.ceil(...))

  const { table } = useDataTable({
    data,
    columns: modalipmColumns,
    pageCount,
    shallow: false, // triggers a network request with updated querystring
    debounceMs: 500, // if your hook uses this for URL/filters/sort updates
  });

  // Mirror table global filter -> local input state
  const globalFilter = (table.getState().globalFilter as string | undefined) ?? "";
  const [search, setSearch] = React.useState(globalFilter);

  // Update input when table/globalFilter changes externally (e.g., URL change)
  React.useEffect(() => {
    setSearch(globalFilter);
  }, [globalFilter]);

  // Debounce applying search to table (option A: useDeferredValue)
  const deferredSearch = React.useDeferredValue(search);

  React.useEffect(() => {
    // Push the value to the table global filter
    table.setGlobalFilter(deferredSearch || undefined);
  }, [deferredSearch, table]);

  // Clear action
  const handleClear = () => {
    setSearch("");
    table.setGlobalFilter(undefined);
  };

  return (
    <DataTable table={table}>
      {/* Search row */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-48 md:w-72 border-2 pr-8"
            aria-label="Search table"
          />
          {search ? (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>
      </div>
    </DataTable>
  );
}
