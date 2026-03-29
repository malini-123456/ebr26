"use client"

import { DataTable } from "@/components/ui/table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { useSearchParams } from "next/navigation";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { DataTableDateFilter } from "@/components/ui/table/data-table-date-filter";
import { Prisma } from "@/generated/prisma/client";
import { produkCol } from "./colproduk";


interface ProdukDataTableProps {
  data: Prisma.ProdukGetPayload<object>[]
  totalItems: number
}
export function ProdukDataTable({
  data,
  totalItems,
}: ProdukDataTableProps) {

  const searchParams = useSearchParams();

  const pageSize = Number(searchParams.get('perPage')) || 10;

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data,
    columns: produkCol,
    pageCount,
    shallow: false,
    debounceMs: 500
  })

  return (
    <DataTable
      table={table}>
      <DataTableToolbar
        table={table}>
        <DataTableDateFilter
          column={table.getColumn("createdAtProduk")!}
          title="filter"
          multiple />
      </DataTableToolbar>
    </DataTable>
  )
}