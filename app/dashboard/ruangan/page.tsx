import PageContainer from "@/components/layout/page-container";
import List2 from "@/components/list-2";
import { SkeletonCard } from "@/features/ruangan/components/skeleton";
import { AlatSearchInput } from "@/components/alat-search-input";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

export default async function Ruangan({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const hitung = await prisma.ruangan.count();

  return (
    <PageContainer
      pageTitle={'Ruangan'}
      pageDescription={`Anda memiliki ${hitung} ruangan`}>
      <Suspense>
        <AlatSearchInput placeholder="Cari ruangan..." />
      </Suspense>
      <Suspense fallback={<SkeletonCard />}>
        <List2 q={q} />
      </Suspense>
    </PageContainer>
  )
}
