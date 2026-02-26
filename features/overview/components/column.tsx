"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { CellAction } from "./cell-action";
import { IpmRow } from "./sequence";


const toTimestamp = (value: Date | number | string ) => {
  if (value instanceof Date) return value.getTime();
  const n = typeof value === 'string' ? Date.parse(value) : value;
  const d = new Date(n);
  return Number.isNaN(d.getTime()) ? undefined : d.getTime();

}
export const ipmColumns: ColumnDef<IpmRow>[] = [
  {
      accessorKey: 'id_ipm',
      header: ({ column }) => <DataTableColumnHeader column={column} title="No"/>,
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'nama_alat',
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
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="created At" />,
    accessorFn: (row) => toTimestamp(row.createdAt),
    cell: ({ getValue }) => {

      const ts = getValue<number | undefined>();
      return ts ? new Date(ts).toLocaleDateString() : '—';
    },
    enableColumnFilter: true,
    meta: {
      variant: 'date',      // will render single-date picker
    },
    filterFn: (row, _columnId, filterValue) => {
      const rowTs = row.getValue<number | undefined>('createdAt');
      const pickTs = typeof filterValue === 'number' ? filterValue : undefined;
      if (!rowTs || !pickTs) return false;

      // Compare by day (00:00..23:59) in local time
      const start = new Date(pickTs);
      start.setHours(0, 0, 0, 0);
      const end = new Date(pickTs);
      end.setHours(23, 59, 59, 999);
      return rowTs >= start.getTime() && rowTs <= end.getTime();
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
    cell: ({ row }) => <CellAction data={row.original} />,
    enableSorting: false,
    enableHiding: false,

  } 
]