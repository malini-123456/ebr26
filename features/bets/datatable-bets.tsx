"use client"

import { DataTable } from "@/components/ui/table/data-table";
import { Prisma } from "@/generated/prisma/client";
import { useDataTable } from "@/hooks/use-data-table";
import { useSearchParams } from "next/navigation";
import { betscol } from "./columns-bets";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { DataTableDateFilter } from "@/components/ui/table/data-table-date-filter";
import { DataTableFacetedFilter } from "@/components/ui/table/data-table-faceted-filter";


interface BetsDataTableProps {
  data: Prisma.BetsGetPayload<{ include: { produk: true } }>[]
  totalItems: number
}
export function BetsDataTable({
  data,
  totalItems,
}: BetsDataTableProps) {

  const searchParams = useSearchParams();

  const pageSize = Number(searchParams.get('perPage')) || 10;

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data,
    columns: betscol,
    pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500

  })

  return (
    <DataTable
      table={table}>
      <DataTableToolbar
        table={table}>
        <DataTableDateFilter
          column={table.getColumn("createdAt")!}
          title="filter"
          multiple />
      </DataTableToolbar>
    </DataTable>
  )
}