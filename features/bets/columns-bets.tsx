"use client"

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { BetsGetPayload } from "@/generated/prisma/models";
import { CellAction } from "./cell-action";
import Image from "next/image";

type BetsRow = BetsGetPayload<{ include: { produk: true; inspectionSession: true; penimbanganSession: true } }>

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
    id: 'progress',
    header: 'Progress',
    cell: ({ row }) => {
      const steps = [
        { label: 'Proses 1', done: !!row.original.inspectionSession },
        { label: 'Penimbangan', done: !!row.original.penimbanganSession },
      ]
      const completed = steps.filter((s) => s.done).length
      return (
        <div className="flex flex-col gap-1.5 min-w-[140px]">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{completed}/{steps.length} selesai</span>
          </div>
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${(completed / steps.length) * 100}%` }}
            />
          </div>
          <div className="flex gap-1">
            {steps.map((step) => (
              <span
                key={step.label}
                className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                  step.done
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            ))}
          </div>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    id: 'action',
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
    enableSorting: false,
    enableHiding: false,
  }
]
