import PageContainer from "@/components/layout/page-container";
import { BetsDataTable } from "@/features/bets/datatable-bets";
import ModalBets from "@/features/home/modal-trigger";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function ProdukPage() {
  const { orgId } = await auth();

  const data = await prisma.bets.findMany({
    where: { organizationId: orgId ?? "" },
    include: {
      produk: true,
      inspectionSession: true,
      penimbanganSession: true,
    },
  });

  const totalItems = await prisma.bets.count({ where: { organizationId: orgId ?? "" } });

  return (
    <PageContainer
      scrollable={false}
      pageTitle="Batch Record"
      pageDescription=""
      pageHeaderAction={
        <ModalBets />
      }>
      <BetsDataTable
        data={data}
        totalItems={totalItems} />
    </PageContainer>
  )
}