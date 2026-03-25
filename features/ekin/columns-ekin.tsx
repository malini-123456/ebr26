"use client"

import { ColumnDef, Row } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header"
import { IpmWithRelations } from "@/lib/definitions/tipe-ipm"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"


const dateFilterFn = <TData,>(row: Row<TData>, columnId: string, value: unknown) => {

  const rowValue = row.getValue(columnId)

  if (!rowValue) return false

  const rowDate = new Date(rowValue as string | number | Date).getTime()

  // range filter
  if (Array.isArray(value)) {
    const [from, to] = value

    if (!from && !to) return true
    if (from && !to) return rowDate >= from
    if (!from && to) return rowDate <= to

    return rowDate >= from && rowDate <= to
  }

  // single date
  return rowDate === value
}

export const ekinColumns: ColumnDef<IpmWithRelations>[] = [
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
      return date
        ? date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        : "—"
    },
    filterFn: dateFilterFn,
  },

  {
    accessorKey: "hasil",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hasil" />
    ),
    cell: ({ row }) => {
      const hasil = row.getValue("hasil") as string;

      return (
        <Badge
          variant={hasil === "Alat Dapat Digunakan" ? "default" : "destructive"}
        >
          {hasil}
        </Badge>
      );
    },
  },
  {
    accessorKey: "teknisi",
    header: "Teknisi",
    filterFn: (row, columnId, filterValue: string[]) => {
      const teknisi = (row.getValue(columnId) as string[]) ?? [];
      return filterValue.some((v) => teknisi.includes(v));
    },
    cell: ({ row }) => {
      const teknisi = row.original.teknisi ?? [];

      return (
        <div className="flex flex-wrap gap-1">
          {teknisi.map((t: string) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs rounded"
            >
              {t}
            </span>
          ))}
        </div>
      );
    },
  }
]