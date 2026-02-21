// src/features/orders/columns.tsx
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';

export type Order = {
  id: string;
  customer: string;
  total: number;
  createdAt: number; // ms timestamp
  status: string;
};

export const orderColumns: ColumnDef<Order, unknown>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order ID" />,
    cell: ({ getValue }) => <span className="font-mono">{getValue<string>()}</span>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    enableSorting: true,
  },
  {
    accessorKey: 'total',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ getValue }) => {
      const v = getValue<number>();
      return <span>${v.toFixed(2)}</span>;
    },
    enableSorting: true,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ getValue }) => {
      const ts = getValue<number>();
      return <span>{new Date(ts).toLocaleDateString()}</span>;
    },
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ getValue }) => <span className="capitalize">{getValue<string>()}</span>,
    enableSorting: true,
  },
];