import PageContainer from "@/components/layout/page-container";
import { BetsDataTable } from "@/features/bets/datatable-bets";
import ModalBets from "@/features/home/modal-trigger";
import { prisma } from "@/lib/prisma";

export default async function ProdukPage() {
  const data = await prisma.bets.findMany({
    include: {
      produk: true,
    },
  });

  const totalItems = await prisma.bets.count();

  return (
    <PageContainer
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