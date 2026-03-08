import PageContainer from "@/components/layout/page-container";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import ModalIpm from "@/features/ipm/modal";
import { UnauthorizedToast } from "@/features/overview/unauth";
import { SectionCards } from "@/features/overview/stats";
import { ChartBarHorizontal } from "@/features/overview/barcharts";
import UpcomingDataTable from "@/features/overview/upcoming-kalibrasi";
import { prisma } from "@/lib/prisma";
import { groupIpmByMonth } from "@/utils/groupipm";

export default async function Page() {
  const user = await currentUser();

  const year = new Date().getFullYear()

  const start = new Date(year, 0, 1) // Jan 1
  const end = new Date(year, 6, 1)   // Jul 1

  const ipmRecords = await prisma.ipm.findMany({
    where: {
      createdAt: {
        gte: start,
        lt: end
      }
    },
    select: {
      createdAt: true
    }
  })

  const chartData = groupIpmByMonth(ipmRecords)

  return (
    <PageContainer
      scrollable={false}
      pageTitle={<div>Hi {user?.firstName}, welcome back 👋🏻</div>}
      pageHeaderAction={
        <Link
          href="#"
          className={cn(buttonVariants(), 'text-xs md:text-sm')}
        >
          <ModalIpm />
        </Link >
      }
    >
      <Suspense
        fallback={
          <DataTableSkeleton columnCount={5} rowCount={6} filterCount={2} />
        }
      >
      </Suspense>
      <UnauthorizedToast />
      <SectionCards />
      <div className="grid grid-cols-1 md:grid-cols-2 my-3 md:gap-3">
        <ChartBarHorizontal
          data={chartData} />
        <UpcomingDataTable />
      </div>

    </PageContainer >
  );
}