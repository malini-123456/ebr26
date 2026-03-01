'use client';

import * as React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type RowSelectionState,
} from '@tanstack/react-table';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableDateFilter } from '@/components/ui/table/data-table-date-filter';
import { Button } from '@/components/ui/button';
import { createDateFilterFn } from '@/utils/createDateFIlterFn';
import { Input } from '../input';

type DateFilterConfig<TData> = {
  /** The accessorKey or id for the date column (must exist in `columns`) */
  columnId: string;
  /** UI label for the chip */
  title?: string;
  /** Allow selecting a range (true) or a single date (false/undefined) */
  multiple?: boolean;
  /**
   * If the date column's TValue is known, specify 'number' or 'string'
   * to help TypeScript narrow the value type. Defaults to 'number | string'.
   */
  valueType?: 'number' | 'string';
};

type GenericDataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  dateFilter?: DateFilterConfig<TData>;
  renderActionBar?: (args: {
    table: ReturnType<typeof useReactTable<TData>>;
  }) => React.ReactNode;
};

export function GenericDataTable<TData>({
  data,
  columns,
  dateFilter,
  renderActionBar,
}: GenericDataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState<string>("")

  // Attach the date filter function to the specified column (id or accessorKey)
  const enhancedColumns = React.useMemo(() => {
    if (!dateFilter?.columnId) return columns;

    const dateFilterFn =
      dateFilter.valueType === 'number'
        ? createDateFilterFn<TData, number>()
        : dateFilter.valueType === 'string'
          ? createDateFilterFn<TData, string>()
          : createDateFilterFn<TData, number | string>();

    return columns.map((col) => {
      const matches =
        ((col as { id?: string }).id === dateFilter.columnId);

      if (!matches) return col;

      return {
        ...col,
        filterFn: dateFilterFn,
      } as ColumnDef<TData, unknown>;
    });
  }, [columns, dateFilter?.columnId, dateFilter?.valueType]);

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    state: { sorting, columnFilters, rowSelection, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter
  });


  const defaultActionBar = (
    <div className="sticky bottom-2 left-0 right-0 mx-2 rounded-md border bg-background p-2 shadow">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span>{table.getFilteredSelectedRowModel().rows.length} selected</span>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => ('selected')}
            disabled={table.getFilteredSelectedRowModel().rows.length === 0}
            title="Export selected rows to PDF"
          >
            Export PDF (Selected)
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => ('filtered')}
            title="Export filtered rows to PDF"
          >
            Export PDF (Filtered)
          </Button>
          <Button
            size="sm"
            variant="default"
            onClick={() => ('all')}
            title="Export all rows to PDF"
          >
            Export PDF (All)
          </Button>

          <Button size="sm" variant="destructive" onClick={() => alert('Bulk action')}>
            Bulk Action
          </Button>
        </div>
      </div>
    </div>
  );


  return (
    <DataTable
      table={table}
      actionBar={renderActionBar ? renderActionBar({ table }) : defaultActionBar}
    >
      <Input
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />

      <div className="mb-2 flex flex-wrap items-center gap-2">
        {dateFilter?.columnId ? (
          <DataTableDateFilter
            column={table.getColumn(dateFilter.columnId)!}
            title={dateFilter.title ?? 'Date'}
            multiple={dateFilter.multiple}
          />
        ) : null}
      </div>
    </DataTable>
  );
}
``