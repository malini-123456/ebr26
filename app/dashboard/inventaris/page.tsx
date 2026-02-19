import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { ProductTable } from "@/features/inv";
import { invColumns } from "@/lib/columns/inv.columns";
import { cn } from "@/lib/utils";
import { invData } from "@/prisma/inv.data";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export default function Page () {
  return (
    <PageContainer 
    scrollable={false}
    pageTitle="Inventaris"
    pageHeaderAction={
      <Link
      href='#'
      className={cn(buttonVariants(), 'text-xs md:text-sm')}
      >
        <IconPlus className="mr-0.5 h-4 w-4" /> Tambah Alat
      </Link>
    }>
      <ProductTable
      data={invData}
      totalItems={invData.length}
      columns={invColumns}/>
    </PageContainer>
  )
}