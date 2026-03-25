"use client"

import { useDataTable } from "@/hooks/use-data-table";
import { IpmWithRelations } from "@/lib/definitions/tipe-ipm";
import { useSearchParams } from "next/navigation";
import { ekinColumns } from "./columns-ekin";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { DataTableDateFilter } from "@/components/ui/table/data-table-date-filter";
import { DataTableFacetedFilter } from "@/components/ui/table/data-table-faceted-filter";
import { pns } from "@/lib/teknisi_constant";

interface EkinProps {
  data: IpmWithRelations[];
  totalItems: number;

}
export function EkinPns({
  data,
  totalItems,
}: EkinProps) {
  const searchParams = useSearchParams();

  const pageSize = Number(searchParams.get('perPage')) || 10;

  const pageCount = Math.ceil(totalItems / pageSize)

  const { table } = useDataTable({
    data,
    columns: ekinColumns,
    pageCount,
    shallow: false,
    debounceMs: 50,
  });

  const pnsOptions = pns.map((p) => ({ label: p.name, value: p.name }));

  return (
    <DataTable table={table}>
      <DataTableToolbar
        table={table}>
        <DataTableDateFilter
          column={table.getColumn("createdAt")!}
          title="filter"
          multiple />
        <DataTableFacetedFilter
          column={table.getColumn("teknisi")!}
          title="Teknisi"
          options={pnsOptions}
          multiple />
      </DataTableToolbar>
    </DataTable>
  )
}