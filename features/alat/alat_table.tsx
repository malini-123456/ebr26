"use client";

import { useSearchParams } from "next/navigation";
import { Alat } from "../../lib/definitions/tipe-alat";
import { useDataTable } from "@/hooks/use-data-table";
import { alatColumns } from "./components/column";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { DataTableDateFilter } from "@/components/ui/table/data-table-date-filter";

interface AlatTableProps {
  data: Alat[];
  totalItems: number;
}

export function AlatTable({
  data,
  totalItems,
}: AlatTableProps) {
  const searchParams = useSearchParams();

  const pageSize = Number(searchParams.get('perPage')) || 10;

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data, // product data
    columns: alatColumns, // product columns
    pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}></DataTableToolbar>
      <DataTableDateFilter
        column={table.getColumn("kalibrasi")!}
        title="filter"
        multiple />
    </DataTable>
  )
}