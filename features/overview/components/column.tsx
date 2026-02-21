"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Ipm } from "./type";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { CellAction } from "./cell-action";


const toTimestamp = (value: Date | number | string ) => {
  if (value instanceof Date) return value.getTime();
  const n = typeof value === 'string' ? Date.parse(value) : value;
  const d = new Date(n);
  return Number.isNaN(d.getTime()) ? undefined : d.getTime();

}
export const ipmColumns: ColumnDef<Ipm>[] = [
  {
      accessorKey: 'id_ipm',
      header: ({ column }) => <DataTableColumnHeader column={column} title="IPM ID"/>,
      cell: ({ getValue }) => <span className="font-mono">{getValue<string>()}</span>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'id_alat',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Alat ID" />,
      cell: ({ getValue }) => <span className="font-mono">{getValue<string>()}</span>,
      enableSorting: true,
      enableHiding: false,
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
      accessorKey: 'setting',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Setting" />,
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      enableSorting: true,
    },
    {
      accessorKey: 'terukur',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Terukur" />,
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      enableSorting: true,
    }, 
    {
      id: 'action',
      cell: ({ row }) => <CellAction data={row.original}/>,
      enableSorting: false,
      enableHiding: false,
    } 
]