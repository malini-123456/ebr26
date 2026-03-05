import PageContainer from "@/components/layout/page-container";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import ModalIpm from "@/features/ipm/modal";
import { FloatingAdd } from "@/components/floating-ipmbutton";
import { UnauthorizedToast } from "@/features/overview/unauth";

export default async function Page() {
  const user = await currentUser();

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
    </PageContainer >
  );
}