import PageContainer from "@/components/layout/page-container";
import { currentUser } from "@clerk/nextjs/server";
import { IpmTable } from "@/features/overview/ipm-table";
import { IpmData } from "@/features/overview/ipm";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function Page() {
  const user = await currentUser()
  return (
    <PageContainer
      scrollable={false}
      pageTitle={
        <div>Hi {user?.firstName}, welcome back 👋🏻</div>}
      pageHeaderAction={
        <Link
          href='#'
          className={cn(buttonVariants(), 'text-xs md:text-sm')}
        >
          <IconPlus className="mr-0.5 h-4 w-4" /> 
          <span className="sm sm:none"> Add Item</span>
        </Link>
      }>

      <IpmTable
        data={IpmData}
        totalItems={IpmData.length} />
    </PageContainer>
  )
}