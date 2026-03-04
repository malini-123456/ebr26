"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { CellAction } from "./cell-action";
import { AlatWithIpm } from "@/lib/definitions/tipe-ipm";

export const ipmColumns: ColumnDef<AlatWithIpm>[] = [
  {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title="No"/>,
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'nama',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Alat" />,
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      enableSorting: true,
    },

    {
      accessorKey: 'merek',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Merek" />,
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      enableSorting: true,
    },

  {
    accessorKey: "tipe",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipe" />
    ),
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "no_seri",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No. Seri" />
    ),
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "ruangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ruangan" />
    ),
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    enableSorting: true,
  },
  {
    accessorFn: (row) => row.ipm?.[0]?.createdAt,
    id: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ getValue }) => {
      const date = getValue<Date | undefined>();
      return date ? date.toLocaleDateString() : "—";
    },
  },
  {
    accessorKey: 'hasil',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Hasil" />,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    enableSorting: true,
  },
  {
    accessorKey: 'teknisi',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Teknisi" />,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    enableSorting: true,
  },
  {
    id: 'action',
    header: () => <span className="sr-only">Action</span>,
    cell: ({ row }) => {
      const alat = row.original
      return <CellAction data={alat} />
    },
    enableSorting: false,
    enableHiding: false,

  } 
]