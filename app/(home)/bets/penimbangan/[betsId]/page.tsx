import PageContainer from "@/components/layout/page-container"
import PenimbanganForm from "@/features/bets/penimbangan/form"
import { savePenimbangan } from "@/app/action/action"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import { CardInfoProduk } from "@/features/bets/info-produk"

export default async function PenimbanganPage({
  params,
}: {
  params: Promise<{ betsId: string }>
}) {
  const { betsId } = await params
  const id = Number(betsId)

  const { orgId } = await auth()

  const betsData = await prisma.bets.findFirst({
    where: { id, organizationId: orgId ?? "" },
    include: { produk: { include: { bahan: true } } },
  })

  if (!betsData) notFound()

  const existingSession = await prisma.penimbanganSession.findUnique({
    where: { betsId: id },
    include: { items: true },
  })

  const action = savePenimbangan.bind(null, id)

  return (
    <PageContainer scrollable={false}>
      <CardInfoProduk betsInfo={betsData} />
      <div className="my-3 h-px" />
      <PenimbanganForm
        bahan={betsData.produk.bahan}
        action={action}
        existingItems={existingSession?.items ?? []}
      />
    </PageContainer>
  )
}
