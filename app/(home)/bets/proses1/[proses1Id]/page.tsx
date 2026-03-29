import PageContainer from "@/components/layout/page-container";
import FormProses1 from "@/features/bets/proses1/form";
import { saveProses1 } from "@/app/action/action";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CardInfoProduk } from "@/features/bets/info-produk";

export default async function Proses1({
  params,
}: {
  params: Promise<{ proses1Id: string }>;
}) {
  const { proses1Id } = await params;
  const id = Number(proses1Id);

  const betsData = await prisma.bets.findUnique({
    where: { id },
    include: { produk: true },
  });

  if (!betsData) notFound();

  const existingSession = await prisma.inspectionSession.findUnique({
    where: { betsId: id },
    include: {
      items: {
        include: { template: true },
        orderBy: { template: { order: 'asc' } },
      },
    },
  });

  const action = saveProses1.bind(null, id);

  return (
    <PageContainer
      scrollable={false}>
      <CardInfoProduk betsInfo={betsData} />
      <div className="my-3 h-px" />
      <FormProses1
        betsInfo={betsData}
        action={action}
        existingItems={existingSession?.items ?? []}
      />
    </PageContainer>
  );
}
