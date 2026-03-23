import PageContainer from "@/components/layout/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react"
import { AlatTable } from "@/features/alat/alat_table";
import { IpmTable } from "@/features/ipm/ipm-table";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";

export default async function DetailRuangan({ params,
}: {
  params: Promise<{ ruanganId: string }>
}) {
  const { ruanganId } = await params;
  const id = Number(ruanganId);

  const values = await prisma.ruangan.findUnique({
    where: { id },
    include: {
      alat: {
        include: {
          ruangan: true,
        },
      },
      ipm: {
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
      },
    },
  });

  const totalAlat = values?.alat.length ?? 0;
  const totalIpm = values?.ipm.length ?? 0;

  return (
    <PageContainer pageTitle={`Detail Ruangan - ${values?.namaRuangan ?? ""}`}>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventaris Alat</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<DataTableSkeleton columnCount={5} rowCount={6} />}>
              <AlatTable data={values?.alat ?? []} totalItems={totalAlat} />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Riwayat IPM</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<DataTableSkeleton columnCount={5} rowCount={6} />}>
              <IpmTable data={values?.ipm ?? []} totalItems={totalIpm} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
