import PageContainer from "@/components/layout/page-container"
import { Suspense } from "react"

export default async function DetailRuangan({ params,
}: {
  params: Promise<{ ruanganId: string }>
}) {
  const { ruanganId } = await params;
  const id = Number(ruanganId);
  if (isNaN(id)) {
    return <div>ID tidak valid</div>
  }
  return (
    <PageContainer
      pageTitle="Detail Ruangan">
      <Suspense></Suspense>

    </PageContainer>
  )

}