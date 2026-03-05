"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { CellAction } from "./cell-action";
import { Alat } from "../../../lib/definitions/tipe-alat";
import Link from "next/link";


export const alatColumns: ColumnDef<Alat>[] = [
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
    accessorKey: 'nama',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Alat" />,
    cell: ({ row }) => (<Link
      href={`/dashboard/inventaris/${row.original.id}`}>
      <span className="font-medium text-emerald-500">
        {row.original.nama}
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
    accessorKey: 'noSeri',
    header: ({ column }) => <DataTableColumnHeader column={column} title="No. Seri" />,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    enableSorting: true,
  },
  {
    accessorFn: (row) => row.ruangan?.namaRuangan,
    id: "ruangan",
    header: "Ruangan",
  },
  {
    accessorKey: 'tahun',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tahun" />,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    enableSorting: true,
  }, {
    accessorKey: "kalibrasi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tgl. Kalibrasi" />
    ),
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
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />,
    enableSorting: false,
    enableHiding: false,
  }
]