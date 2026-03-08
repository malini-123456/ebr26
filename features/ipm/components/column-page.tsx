"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header"
import { CellAction } from "./cell-action"
import { AlatDashboard, IpmWithRelations } from "@/lib/definitions/tipe-ipm"
import { AlatWithIpm } from "@/lib/definitions/include-alat"

export const ipmColumns: ColumnDef<IpmWithRelations>[] = [
  {
    accessorFn: (row) => row.alat.nama,
    id: "nama",
    header: "Nama Alat",
  },

  {
    accessorFn: (row) => row.alat.merek,
    id: "merek",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Merek" />
    ),
  },

  {
    accessorFn: (row) => row.alat.tipe,
    id: "tipe",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipe" />
    ),
  },

  {
    accessorFn: (row) => row.alat.noSeri,
    id: "noSeri",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No Seri" />
    ),
  },

  {
    accessorFn: (row) => row.alat.ruangan.namaRuangan,
    id: "ruangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ruangan" />
    ),
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal IPM" />
    ),
    cell: ({ getValue }) => {
      const date = getValue<Date>()
      return date ? date.toLocaleDateString() : "—"
    },
  },

  {
    accessorKey: "hasil",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hasil" />
    ),
  },
  // {
  //   id: "action",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
]