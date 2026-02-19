import { Inventory } from "@/lib/schema/inv.schema";
import { ColumnDef } from "@tanstack/react-table";

export const invColumns: ColumnDef<Inventory> [] = [
  {
    accessorKey: "nama_alat",
    header: "Nama Alat",
  },
  {
    accessorKey: "merek",
    header: "Merek",
  },
  {
    accessorKey: "tipe",
    header : "Tipe",
  },
  {
    accessorKey: "no_seri",
    header: "No. Seri",
  },
  {
    accessorKey: "ruangan",
    header: "Ruangan",
  },
  {
    accessorKey: "tahun",
    header: "Tahun",
  },
  {
    accessorKey: "tanggal_kalibrasi",
    header: "Tgl. Kalibrasi",
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan"
  }
]