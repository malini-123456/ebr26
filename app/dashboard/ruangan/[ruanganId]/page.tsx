import PageContainer from "@/components/layout/page-container"
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react"

export default async function DetailRuangan({ params,
}: {
  params: Promise<{ ruanganId: string }>
}) {
  const { ruanganId } = await params;
  const id = Number(ruanganId);
  const values = await prisma.ruangan.findUnique(
    {
      where: { id },
      include: {
        alat: true,
        ipm: true,
      }
    })
  // if (isNaN(id)) {
  //   return <div>ID tidak valid</div>
  // }
  return (
    <PageContainer
      pageTitle="Detail Ruangan">
      <Suspense></Suspense>
      <Card>
        <CardContent>
          {values?.namaRuangan}
        </CardContent>
      </Card>
    </PageContainer>
  )

}