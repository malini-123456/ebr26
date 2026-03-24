"use client"

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { Alat } from "../../../lib/definitions/tipe-alat";
import { Badge } from "@/components/ui/badge";

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

export function alatdiruanganColumns(ruanganId: number): ColumnDef<Alat>[] {
  return [
    {
      accessorKey: 'nama',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Alat" />,
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
      accessorKey: 'noSeri',
      header: ({ column }) => <DataTableColumnHeader column={column} title="No. Seri" />,
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      enableSorting: true,
    },
    {
      accessorKey: 'tahun',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tahun" />,
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "kalibrasi",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tgl. Kalibrasi" />
      ),
      filterFn: dateFilterFn,
      cell: ({ row }) => {
        const value = row.original.kalibrasi;

        return (
          <span>
            {value ? new Date(value).toLocaleDateString("id-ID") : "-"}
          </span>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'keterangan',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Keterangan" />,
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      enableSorting: true,
    },
    {
      id: "ipmTerakhir",
      header: ({ column }) => <DataTableColumnHeader column={column} title="IPM Terakhir" />,
      accessorFn: (row) => row.ipm?.[0]?.createdAt ?? null,
      cell: ({ row }) => {
        const latest = row.original.ipm?.[0];
        if (!latest) return <span className="text-muted-foreground text-xs">—</span>;
        return <span>{new Date(latest.createdAt).toLocaleDateString("id-ID")}</span>;
      },
      enableSorting: true,
    },
    {
      id: "hasilIpm",
      header: "Status IPM",
      cell: ({ row }) => {
        const hasil = row.original.ipm?.[0]?.hasil;
        if (!hasil) return <span className="text-muted-foreground text-xs">Belum IPM</span>;
        const ok = hasil === "Alat Dapat Digunakan";
        return <Badge variant={ok ? "default" : "destructive"}>{hasil}</Badge>;
      },
    },
  ]
}