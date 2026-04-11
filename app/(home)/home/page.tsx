import PageContainer from "@/components/layout/page-container";
import { BetsDataTable } from "@/features/bets/datatable-bets";
import { SectionCards } from "@/features/bets/stats";
import ModalBets from "@/features/home/modal-trigger";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

export default async function Home() {
  const data = await prisma.bets.findMany({
    include: {
      produk: true,
      inspectionSession: true,
      penimbanganSession: true,
    },
  });

  const totalItems = await prisma.bets.count();

  return (
    <PageContainer
      scrollable={false}
      pageTitle="Welcome back user"
      pageDescription="Selamat datang kembali. Ini adalah ringkasan data EBR Anda."
      pageHeaderAction={
        <ModalBets />
      }
    >
      <Suspense></Suspense>
      <SectionCards />
      <div className="mt-6" />
      <BetsDataTable
        data={data}
        totalItems={totalItems} />
    </PageContainer>
  )
}