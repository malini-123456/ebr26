import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { ChartBarHorizontal } from "@/features/overview/barcharts";
import FilledCalendar from "@/features/overview/filled-calendar";
import { SectionCards } from "@/features/overview/stats";
import UpcomingDataTable from "@/features/overview/upcoming-kalibrasi";
import { prisma } from "@/lib/prisma";
import { groupIpmByMonth } from "@/utils/groupipm";
import { Suspense } from "react";


export default async function AdminDashboard() {

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

  const ipmPerDay = await prisma.ipm.groupBy({
    by: ["createdAt"],
    _count: {
      _all: true,
    },
  });

  function formatDate(date: Date) {
    return date.toLocaleDateString("id-ID");
  }

  const ipmCountByDate = ipmPerDay.reduce((acc, item) => {
    const key = formatDate(item.createdAt);
    acc[key] = (acc[key] || 0) + item._count._all;
    return acc;
  }, {} as Record<string, number>);

  const chartData = groupIpmByMonth(ipmRecords)

  return (
    <PageContainer
      scrollable={false}
    // pageTitle={<div>Hi {user?.firstName}, welcome back 👋🏻</div>}
    >
      <SectionCards />
      <div className="grid grid-cols-1 md:grid-cols-2 my-3 md:gap-3">
        <ChartBarHorizontal
          data={chartData} />
        <FilledCalendar ipmCountByDate={ipmCountByDate} />
      </div>

      <UpcomingDataTable />
    </PageContainer >
  );
}