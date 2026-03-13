'use client';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';

import { useDataTable } from '@/hooks/use-data-table';

import { useSearchParams } from 'next/navigation';
import { ipmColumns } from './components/column-page';
import { IpmWithRelations } from '@/lib/definitions/tipe-ipm';
import { DataTableDateFilter } from '@/components/ui/table/data-table-date-filter';

interface IpmTableProps {
  data: IpmWithRelations[];
  totalItems: number;
}
export function IpmTable({
  data,
  totalItems,
}: IpmTableProps) {

  const searchParams = useSearchParams();

  const pageSize = Number(searchParams.get('perPage')) || 10;

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data, // product data
    columns: ipmColumns, // product columns
    pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <DataTableDateFilter
          column={table.getColumn("createdAt")!}
          title="filter"
          multiple />
      </DataTableToolbar>
    </DataTable>
  );
}

