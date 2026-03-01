"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { CellAction } from "./cell-action";
import { Alat } from "../../../lib/definitions/tipe-alat";
import Image from "next/image";
import Link from "next/link";


const toTimestamp = (value: Date | number | string ) => {
  if (value instanceof Date) return value.getTime();
  const n = typeof value === 'string' ? Date.parse(value) : value;
  const d = new Date(n);
  return Number.isNaN(d.getTime()) ? undefined : d.getTime();

}
export const alatColumns: ColumnDef<Alat>[] = [

    {
      accessorKey: 'id_alat',
      header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
      cell: ({ getValue }) => <span className="font-mono">{getValue<string>()}</span>,
      enableSorting: true,
    },
    // {
    //   accessorKey: 'foto_alat',
    //   header: 'image',
    //   cell: ({ row }) => {
    //     return (
    //       <div className='relative aspect-square'>
    //         <Image
    //           src={row.getValue('foto_alat')}
    //           alt={row.getValue('name')}
    //           fill
    //           className='rounded-lg'
    //         />
    //       </div>
    //     );
    //   }
    // },
    {
      accessorKey: 'nama_alat',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Alat" />,
      cell: ({ row }) => (<Link
        href={`./inventaris/${row.original.id_alat}`}>
        <span className="font-medium text-emerald-500">
          {row.original.nama_alat}
        </span>
      </Link>) 
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
    },
    {
      accessorKey: 'tahun',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tahun" />,
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      enableSorting: true,
    },
    {
      accessorKey: 'tgl_kalibrasi',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tgl. Kalibrasi" />,
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      enableSorting: true,
    },
    {
      accessorKey: 'keterangan',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Keterangan" />,
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