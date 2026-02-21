'use client';

import type { Column, Table } from '@tanstack/react-table';
import * as React from 'react';

import { DataTableDateFilter } from '@/components/ui/table/data-table-date-filter';
import { DataTableFacetedFilter } from '@/components/ui/table/data-table-faceted-filter';
import { DataTableSliderFilter } from '@/components/ui/table/data-table-slider-filter';
import { DataTableViewOptions } from '@/components/ui/table/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CrossIcon } from 'lucide-react';

interface DataTableToolbarProps<TData> extends React.ComponentProps<'div'> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const globalFilter = table.getState().globalFilter as string | undefined;
  const [search, setSearch] = React.useState(globalFilter ?? '');

  // Sync local state if table state changes
  React.useEffect(() => {
    setSearch(globalFilter ?? '');
  }, [globalFilter]);

  // Debounce global filter updates
  React.useEffect(() => {
    const id = setTimeout(() => {
      table.setGlobalFilter(search || undefined);
    }, 300);
    return () => clearTimeout(id);
  }, [search, table]);

  const columns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  );

  const onReset = React.useCallback(() => {
    table.resetColumnFilters();
    table.setGlobalFilter(undefined);
    setSearch('');
  }, [table]);

  return (
    <div
      role='toolbar'
      aria-orientation='horizontal'
      className={cn(
        'flex w-full items-start justify-between gap-2 p-1',
        className
      )}
      {...props}
    >
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        <div className="relative">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-48 md:w-72 border-2"
          />
          {search && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setSearch('')}
            >
              <CrossIcon size={14} />
            </button>
          )}
        </div>

        {columns.map((column) => (
          <DataTableToolbarFilter key={column.id} column={column} />
        ))}
        {isFiltered && (
          <Button
            aria-label='Reset filters'
            variant='outline'
            size='sm'
            className='border-dashed'
            onClick={onReset}
          >
            <CrossIcon />
            Reset
          </Button>
        )}
      </div>
      <div className='flex items-center gap-2'>
        {children}
        <DataTableViewOptions table={table} />
      </div>
      {/* <DataTableFacetedFilter
        column={table.getColumn("kondisi")}
        title='Kondisi'
        options={[
          {
            label: "Baik", value: "baik"
          },
          {
            label: "Rusak", value: "rusak"
          },
        ]}
        multiple
      /> */}
    </div>
  );
}
interface DataTableToolbarFilterProps<TData> {
  column: Column<TData>;
}

function DataTableToolbarFilter<TData>({
  column
}: DataTableToolbarFilterProps<TData>) {
  {
    const columnMeta = column.columnDef.meta;

    const onFilterRender = React.useCallback(() => {
      if (!columnMeta?.variant) return null;

      switch (columnMeta.variant) {
        case 'text':
          return (
            <Input
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(event) => column.setFilterValue(event.target.value)}
              className='h-8 w-40 lg:w-56'
            />
          );

        case 'number':
          return (
            <div className='relative'>
              <Input
                type='number'
                inputMode='numeric'
                placeholder={columnMeta.placeholder ?? columnMeta.label}
                value={(column.getFilterValue() as string) ?? ''}
                onChange={(event) => column.setFilterValue(event.target.value)}
                className={cn('h-8 w-[120px]', columnMeta.unit && 'pr-8')}
              />
              {columnMeta.unit && (
                <span className='bg-accent text-muted-foreground absolute top-0 right-0 bottom-0 flex items-center rounded-r-md px-2 text-sm'>
                  {columnMeta.unit}
                </span>
              )}
            </div>
          );

        case 'range':
          return (
            <DataTableSliderFilter
              column={column}
              title={columnMeta.label ?? column.id}
            />
          );

        case 'date':

          // return (
          //   <DataTableDateFilter
          //     column={column}
          //     title={columnMeta.label ?? column.id}
          //     multiple={false}
          //   />
          // );

        case 'dateRange':

          return (
            <DataTableDateFilter
              column={column}
              title={columnMeta.label ?? column.id}
              multiple
            />
          );


        case 'select':
        case 'multiSelect':
          return (
            <DataTableFacetedFilter
              column={column}
              title={columnMeta.label ?? column.id}
              options={columnMeta.options ?? []}
              multiple={columnMeta.variant === 'multiSelect'}
            />
          );

        default:
          return null;
      }
    }, [column, columnMeta]);

    return onFilterRender();
  }
}
