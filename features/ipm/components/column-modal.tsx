"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { Alat } from "@/lib/definitions/tipe-alat";
import Link from "next/link";

export const modalipmColumns: ColumnDef<Alat>[] = [

    {
      accessorKey: 'nama_alat',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Alat" />,
      cell: ({ row }) =>  (
        <Link
        href={`./ipm/${row.original.id_alat}`}>
          <span className="text-pink-500">
            {row.original.nama_alat}
          </span>
        </Link>
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'merek',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Merek" />,
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      enableSorting: true,
    },
    {
      accessorKey: 'tipe',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tipe" />,
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      enableSorting: true,
    },
    {
      accessorKey: 'no_seri',
      header: ({ column }) => <DataTableColumnHeader column={column} title="No. Seri" />,
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      enableSorting: true,
    },
    {
      accessorKey: 'ruangan',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ruangan" />,
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      enableSorting: true,
    }
]