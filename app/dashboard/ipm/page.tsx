import PageContainer from "@/components/layout/page-container";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import ModalIpm from "@/features/ipm/modal";
import { IpmTable } from "@/features/ipm/ipm-table";
import { prisma } from "@/lib/prisma";
import { AlatDashboard } from "@/lib/definitions/tipe-ipm";

export default async function Page() {
  const user = await currentUser();

  const data: AlatDashboard[] = await prisma.alat.findMany({
    include: {
      ruangan: true,
      ipm: {
        include: {
          teknisi: true
        },
        orderBy: {
          createdAt: "desc"
        },
        take: 1
      }
    }
  });

  const dataipm = await prisma.ipm.findMany({
    include: {
      alat: {
        include: {
          ruangan: true,
        },
      },
      teknisi: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalItems = await prisma.ipm.count();

  return (
    <PageContainer
      scrollable={false}
      pageHeaderAction={

        <ModalIpm />
      }
    >
      <Suspense
        fallback={
          <DataTableSkeleton columnCount={5} rowCount={6} filterCount={2} />
        }
      >
      </Suspense>
      <IpmTable
        data={dataipm}
        totalItems={totalItems} />
    </PageContainer >
  );
}