"use client"

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { BetsGetPayload } from "@/generated/prisma/models";
import { CellAction } from "./cell-action";
import Image from "next/image";

type BetsRow = BetsGetPayload<{ include: { produk: true } }>

const dateFilterFn = <TData,>(row: Row<TData>, columnId: string, value: unknown) => {
  const rowValue = row.getValue(columnId)
  if (!rowValue) return false
  const rowDate = new Date(rowValue as string | number | Date).getTime()
  if (Array.isArray(value)) {
    const [from, to] = value
    if (!from && !to) return true
    if (from && !to) return rowDate >= from
    if (!from && to) return rowDate <= to
    return rowDate >= from && rowDate <= to
  }
  return rowDate === value
}

export const betscol: ColumnDef<BetsRow>[] = [
  {
    accessorKey: 'nomor_bets',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nomor Bets" />,
    cell: ({ getValue }) => <span className="font-medium text-primary">{getValue<string>()}</span>,
    enableSorting: true,
  },
  {
    accessorFn: (row) => row.produk?.nama_produk,
    id: "nama_produk",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Produk" />,
    cell: ({ row }) => {
      const nama = row.original.produk?.nama_produk
      const foto = row.original.produk?.foto_produk?.[0]
      return (
        <div className="flex items-center gap-2">
          {foto ? (
            <Image
              src={foto}
              alt={nama ?? "produk"}
              width={32}
              height={32}
              className="rounded object-cover shrink-0"
            />
          ) : (
            <div className="h-8 w-8 rounded bg-muted shrink-0" />
          )}
          <span>{nama ?? "-"}</span>
        </div>
      )
    },
    enableSorting: true,
  },
  {
    accessorFn: (row) => row.produk?.kode_produk,
    id: "kode_produk",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kode Produk" />,
    cell: ({ getValue }) => <span>{getValue<string>() ?? "-"}</span>,
    enableSorting: true,
  },
  {
    id: 'ukuran_satuan',
    accessorFn: (row) => `${row.ukuran} ${row.satuan}`,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ukuran" />,
    cell: ({ row }) => <span>{row.original.ukuran} {row.original.satuan}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "expiredDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Expired Date" />,
    filterFn: dateFilterFn,
    cell: ({ row }) => {
      const value = row.original.expiredDate
      return (
        <span>
          {value ? new Date(value).toLocaleDateString("id-ID") : "-"}
        </span>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Dibuat" />,
    filterFn: dateFilterFn,
    cell: ({ row }) => {
      const value = row.original.createdAt
      return <span>{new Date(value).toLocaleDateString("id-ID")}</span>
    },
    enableSorting: true,
  },
  {
    id: 'action',
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
    enableSorting: false,
    enableHiding: false,
  }
]
