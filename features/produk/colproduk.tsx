"use client"

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { ProdukGetPayload } from "@/generated/prisma/models";
import { CellAction } from "./cell-action";
import Link from "next/link";

export type ProdukRow = ProdukGetPayload<object>

export const produkCol: ColumnDef<ProdukRow>[] = [
  {
    accessorKey: 'nama_produk',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Produk" />,
    cell: ({ row }) => {
      const urls = row.original.foto_produk as string[];
      const first = urls?.[0];
      return (
        <div className="flex items-center gap-2">
          {first
            ? <Image src={first} alt="foto produk" width={40} height={40} className="rounded object-cover shrink-0" />
            : <span className="w-10 h-10 rounded bg-muted shrink-0" />}
          <Link
            href={`/produk/${row.original.id}`}>
            <span className="font-medium text-primary">{row.original.nama_produk}</span>
          </Link>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'kode_produk',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kode Produk" />,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    enableSorting: true,
  },
  {
    accessorKey: 'hasil_produk',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Hasil Produk" />,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    enableSorting: true,
  },
  {
    accessorKey: 'satuan_produk',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Satuan" />,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    enableSorting: true,
  },
  {
    accessorKey: 'createdAtProduk',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Dibuat" />,
    cell: ({ row }) => {
      const value = row.original.createdAtProduk
      return <span>{new Date(value).toLocaleDateString("id-ID")}</span>
    },
    enableSorting: true,
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
