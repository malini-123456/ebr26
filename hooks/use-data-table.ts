'use client';

import * as React from 'react';
import {
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  type TableState,
  type VisibilityState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

interface UseDataTableProps<TData>
  extends Omit<
      TableOptions<TData>,
      | 'state'
      | 'pageCount'
      | 'getCoreRowModel'
      | 'manualFiltering'
      | 'manualPagination'
      | 'manualSorting'
    >,
    Required<Pick<TableOptions<TData>, 'pageCount'>> {
  initialState?: Partial<TableState>;

  // Keep these for compatibility / future use
  history?: 'push' | 'replace';
  debounceMs?: number;
  throttleMs?: number;
  clearOnDefault?: boolean;
  enableAdvancedFilter?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  startTransition?: React.TransitionStartFunction;
}

export function useDataTable<TData>({
  columns,
  pageCount,
  initialState,
  shallow = true, // kept but not used
  debounceMs = 300,
  throttleMs = 50,
  ...tableProps
}: UseDataTableProps<TData>) {
  // ---------------------------
  // Local Controlled States
  // ---------------------------

  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>(
      initialState?.rowSelection ?? {}
    );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(
      initialState?.columnVisibility ?? {}
    );

  const [sorting, setSorting] =
    React.useState<SortingState>(
      initialState?.sorting ?? []
    );

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(
      initialState?.columnFilters ?? []
    );

  const [pagination, setPagination] =
    React.useState<PaginationState>({
      pageIndex: initialState?.pagination?.pageIndex ?? 0,
      pageSize: initialState?.pagination?.pageSize ?? 10
    });

  // ---------------------------
  // React Table Instance
  // ---------------------------

  const table = useReactTable({
    ...tableProps,
    columns,
    pageCount,

    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    },

    enableRowSelection: true,

    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),

    // Server-side mode
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true
  });

  return {
    table,
    pagination,
    sorting,
    columnFilters,
    shallow,      // returned for compatibility
    debounceMs,   // returned for compatibility
    throttleMs
  };
}
