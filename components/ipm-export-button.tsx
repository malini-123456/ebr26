"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface IpmRow {
  tanggal: string;
  namaAlat: string;
  merek: string;
  tipe: string;
  noSeri: string;
  ruangan: string;
  hasil: string;
  settingAlat: string;
  terukur: string;
  teknisi: string;
}

interface IpmExportButtonProps {
  data: IpmRow[];
  teknisi?: string;
}

export function IpmExportButton({ data, teknisi }: IpmExportButtonProps) {
  function handleExport() {
    const headers = [
      "Tanggal IPM",
      "Nama Alat",
      "Merek",
      "Tipe",
      "No. Seri",
      "Ruangan",
      "Hasil",
      "Setting Alat",
      "Terukur",
      "Teknisi",
    ];

    const rows = data.map((r) => [
      r.tanggal,
      r.namaAlat,
      r.merek,
      r.tipe,
      r.noSeri,
      r.ruangan,
      r.hasil,
      r.settingAlat,
      r.terukur,
      r.teknisi,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `laporan-ipm${teknisi ? `-${teknisi}` : ""}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button variant="outline" onClick={handleExport}>
      <Download className="h-4 w-4 mr-2" />
      Export Excel
    </Button>
  );
}
