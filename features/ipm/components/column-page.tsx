"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header"
import { CellAction } from "./cell-action"
import { IpmWithRelations } from "@/lib/definitions/tipe-ipm"
import Link from "next/link"

export const ipmColumns: ColumnDef<IpmWithRelations>[] = [
  {
    accessorFn: (row) => row.alat.nama,
    id: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Alat" />
    ),
    cell: ({ row }) => (<Link
      href={`/dashboard/ipm/edit/${row.original.id}`}>
      <span className="font-medium text-emerald-500">
        {row.original.alat.nama}
      </span>
    </Link>)
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
  {
    accessorKey: "user",
    header: "Teknisi",
    cell: ({ row }) => {
      const users = row.original.user;

      return (
        <div className="flex gap-1 flex-wrap">
          {users.map((u) => (
            <span
              key={u.id}
              className="px-2 py-0.5 text-xs bg-gray-100 rounded"
            >
              {u.firstName}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]