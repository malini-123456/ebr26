"use client"

import { 
  ColumnDef, 
  flexRender, 
  getCoreRowModel, 
  getFilteredRowModel, 
  useReactTable 
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import * as React from "react";
import { DataTablePagination } from "../ui/datatble-pagination";

interface DataTableProps<TData> {
  data : TData[]
  columns: ColumnDef<TData>[]
}

export function Datatable<TData> ({
  data,
  columns,
}: DataTableProps<TData>) {
  
  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  })


  return (

    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-muted top-0">
          {table.getHeaderGroups().map
          ((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="**:data-[slot=table-cell]:first:w-8">
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DataTablePagination table={table}/>
    </div>
  )
}