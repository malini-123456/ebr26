import PageContainer from "@/components/layout/page-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { pns } from "@/lib/teknisi_constant";
import { Suspense } from "react";
import { TeknisiSelect } from "@/components/teknisi-select";
import { IpmExportButton } from "@/components/ipm-export-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EkinPns } from "@/features/ekin/datatable-pns";

export default async function EkinPage({
  searchParams,
}: {
  searchParams: Promise<{ teknisi?: string }>;
}) {
  const { teknisi } = await searchParams;

  // Summary per technician (all time)
  const summaries = await Promise.all(
    pns.map(async (p) => {
      const total = await prisma.ipm.count({ where: { teknisi: { has: p.name } } });
      const baik = await prisma.ipm.count({
        where: { teknisi: { has: p.name }, hasil: "Alat Dapat Digunakan" },
      });
      return { ...p, total, baik, gagal: total - baik };
    })
  );

  // Filtered IPM records for the table
  const where = teknisi ? { teknisi: { has: teknisi } } : undefined;

  const dataipm = await prisma.ipm.findMany({
    where,
    include: {
      alat: { include: { ruangan: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalItems = dataipm.length;
  const selectedPns = pns.find((p) => p.name === teknisi);

  const exportData = dataipm.map((ipm) => ({
    tanggal: ipm.createdAt.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    namaAlat: ipm.alat.nama,
    merek: ipm.alat.merek ?? "",
    tipe: ipm.alat.tipe ?? "",
    noSeri: ipm.alat.noSeri ?? "",
    ruangan: ipm.alat.ruangan.namaRuangan,
    hasil: ipm.hasil,
    settingAlat: ipm.settingAlat ?? "",
    terukur: ipm.terukur ?? "",
    teknisi: ipm.teknisi.join(", "),
  }));

  return (
    <PageContainer
      scrollable={false}
      pageTitle="Evaluasi Kinerja (EKIN)"
      pageDescription="Rekap pemeliharaan per teknisi"
    >
      <EkinPns
        data={dataipm}
        totalItems={totalItems} />
    </PageContainer>
  );
}
