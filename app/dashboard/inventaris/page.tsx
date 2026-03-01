import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { AlatData } from "@/features/alat/alat";
import { AlatTable } from "@/features/alat/alat_table";
import { OrdersTable } from "@/features/orders/orderstable";
import { cn } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export default function Page () {
  return (
    <PageContainer 
    scrollable={false}
    pageTitle="Inventaris"
    pageHeaderAction={
      <Link
      href='./inventaris/create'
      className={cn(buttonVariants(), 'text-xs md:text-sm')}
      >
        <IconPlus className="mr-0.5 h-4 w-4" /> Tambah Alat
      </Link>
    }>
      <AlatTable
      data={AlatData}
      totalItems={AlatData.length}
      />
    </PageContainer>
  )
}