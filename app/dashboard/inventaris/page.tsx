import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { AlatTable } from "@/features/alat/alat_table";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import ContributorsOverviewTable from "@/components/contributors-overview-table";

export default async function Page() {

  const getAlat = await prisma.alat.findMany({
    include: {
      ruangan: true,
    },
  });
  const totalItems = await prisma.alat.count();
  return (
    <div className="">
      <PageContainer
        scrollable={false}
        pageHeaderAction={
          <Link
            href="./inventaris/create"
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <IconPlus />Alat
          </Link >
        }>
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={6} filterCount={2} />
          }
        >
        </Suspense>
        <AlatTable data={getAlat} totalItems={totalItems} />
      </PageContainer>
    </div>
  );
}