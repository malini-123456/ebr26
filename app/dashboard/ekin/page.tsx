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
      pageTitle="Evaluasi Kinerja (EKIN)"
      pageDescription="Rekap pemeliharaan per teknisi"
    >
      {/* Summary cards */}
      {/* <div className="flex flex-wrap gap-3 mb-6">
        {teknisi && (
          <div className="w-full flex justify-end">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/ekin">Reset filter</Link>
            </Button>
          </div>
        )}
        {summaries.map((s) => (
          <Link key={s.id} href={`/dashboard/ekin?teknisi=${s.name}`} className="flex-1 min-w-40">
            <Card className={`h-full transition-colors hover:bg-muted/50 ${teknisi === s.name ? "ring-2 ring-primary" : ""}`}>
              <CardHeader className="pb-1">
                <CardDescription className="text-xs">{s.namalengkap}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums">{s.total}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">
                <span className="text-emerald-500">{s.baik} baik</span>
                {" · "}
                <span className="text-destructive">{s.gagal} gagal</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div> */}

      {/* Filtered table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
          <div>
            <CardTitle>
              {selectedPns ? selectedPns.namalengkap : "Semua Teknisi"}
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-0.5">{totalItems} record IPM</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Suspense>
              <TeknisiSelect />
            </Suspense>
            <IpmExportButton data={exportData} teknisi={teknisi} />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Nama Alat</TableHead>
                <TableHead>No. Seri</TableHead>
                <TableHead>Ruangan</TableHead>
                <TableHead>Setting Alat</TableHead>
                <TableHead>Terukur</TableHead>
                <TableHead>Hasil</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataipm.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                    Belum ada data IPM
                  </TableCell>
                </TableRow>
              )}
              {dataipm.map((ipm) => (
                <TableRow key={ipm.id}>
                  <TableCell className="whitespace-nowrap">
                    {ipm.createdAt.toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="font-medium">{ipm.alat.nama}</TableCell>
                  <TableCell>{ipm.alat.noSeri ?? "—"}</TableCell>
                  <TableCell>{ipm.alat.ruangan.namaRuangan}</TableCell>
                  <TableCell>{ipm.settingAlat ?? "—"}</TableCell>
                  <TableCell>{ipm.terukur ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant={ipm.hasil === "Alat Dapat Digunakan" ? "default" : "destructive"}>
                      {ipm.hasil}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
