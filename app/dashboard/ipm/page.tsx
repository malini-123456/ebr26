import PageContainer from "@/components/layout/page-container";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import ModalIpm from "@/features/ipm/modal";
import { IpmTable } from "@/features/ipm/ipm-table";
import { prisma } from "@/lib/prisma";
import { TeknisiSelect } from "@/components/teknisi-select";
import { IpmExportButton } from "@/components/ipm-export-button";
import { pns } from "@/lib/teknisi_constant";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ teknisi?: string }>;
}) {
  const { teknisi } = await searchParams;

  const where = teknisi
    ? { teknisi: { has: teknisi } }
    : undefined;

  const dataipm = await prisma.ipm.findMany({
    where,
    include: {
      alat: {
        include: {
          ruangan: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalItems = await prisma.ipm.count({ where });

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
      pageTitle="Pemeliharaan (IPM)"
      pageDescription={
        selectedPns
          ? `Menampilkan IPM oleh ${selectedPns.namalengkap} — ${totalItems} record`
          : `${totalItems} record`
      }
      pageHeaderAction={
        <div className="flex items-center gap-2 flex-wrap">
          {/* <Suspense>
            <TeknisiSelect />
          </Suspense>
          <IpmExportButton data={exportData} teknisi={teknisi} /> */}
          <ModalIpm />
        </div>
      }
    >
      <Suspense
        fallback={
          <DataTableSkeleton columnCount={5} rowCount={6} filterCount={2} />
        }
      >
      </Suspense>
      <IpmTable data={dataipm} totalItems={totalItems} />
    </PageContainer>
  );
}
