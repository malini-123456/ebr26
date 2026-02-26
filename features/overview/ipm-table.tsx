'use client';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';

import { useDataTable } from '@/hooks/use-data-table';

import { useSearchParams } from 'next/navigation';
import { ipmColumns } from './components/column';
import { IpmRow } from './components/sequence';

interface IpmTableProps {
  data: IpmRow[];
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
      <div className='grid grid-cols-4 justify-center gap-2'>
        <DataTableToolbar table={table}></DataTableToolbar>
      </div>
    </DataTable>
  );
}

