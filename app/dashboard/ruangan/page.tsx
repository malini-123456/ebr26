import PageContainer from "@/components/layout/page-container";
import List2 from "@/components/list-2";
import { SkeletonCard } from "@/features/ruangan/components/skeleton";
import { Suspense } from "react";

export default function Ruangan() {

  return (
    <PageContainer
      pageTitle={'Ruangan'}
      pageDescription="Anda memiliki">
      <Suspense
        fallback={
          <SkeletonCard />
        }>
      </Suspense>
      <List2 />
    </PageContainer>
  )
}