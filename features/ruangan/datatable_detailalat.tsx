"use client"

import { useDataTable } from "@/hooks/use-data-table";
import { useSearchParams } from "next/navigation";
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { DataTableDateFilter } from '@/components/ui/table/data-table-date-filter';
import { alatdiruanganColumns } from "./components/alat-ruangan-columns";
import { Alat } from "@/lib/definitions/tipe-alat";

interface RuanganTableprops {
  data: Alat[];
  totalItems: number;
  ruanganId: number;
}

export function AlatdiRuangan({
  data,
  totalItems,
  ruanganId,
}: RuanganTableprops) {
  const searchParams = useSearchParams();

  const pageSize = Number(searchParams.get('perPage')) || 10;

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data,
    columns: alatdiruanganColumns(ruanganId),
    pageCount,
    shallow: false,
    debounceMs: 50,
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        {/* <DataTableDateFilter
          column={table.getColumn("createdAt")!}
          title="filter"
          multiple /> */}
      </DataTableToolbar>
    </DataTable>
  )
}