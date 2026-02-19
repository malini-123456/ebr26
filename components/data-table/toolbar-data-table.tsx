"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Columns } from "lucide-react"
import React from "react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  placeholder?: string
}

export function DataTableToolbar<TData>({
  table,
  placeholder = "Search...",
}: DataTableToolbarProps<TData>) {
  return (

    <div className="flex items-center justify-between py-4">
      <Input
        placeholder={placeholder}
        value={(table.getState().globalFilter as string) ?? ""}
        onChange={(e) =>
          table.setGlobalFilter(e.target.value)
        }
        className="max-w-sm"
      />

      {/* 👁 Column Visibility Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto">
            <Columns className="mr-2 h-4 w-4" />
            Columns
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {table
            .getAllLeafColumns()
            .filter((column) => column.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) =>
                  column.toggleVisibility(!!value)
                }
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
