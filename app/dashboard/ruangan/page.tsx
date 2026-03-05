import PageContainer from "@/components/layout/page-container";
import List2 from "@/components/list-2";
import { SkeletonCard } from "@/features/ruangan/components/skeleton";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

export default async function Ruangan() {

  const hitung = await prisma.ruangan.count();
  return (
    <PageContainer
      pageTitle={'Ruangan'}
      pageDescription={`Anda memiliki ${hitung} ruangan`}>
      <Suspense
        fallback={
          <SkeletonCard />
        }>
      </Suspense>
      <List2 />
    </PageContainer>
  )
}