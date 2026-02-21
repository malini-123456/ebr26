import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { ProductTable } from "@/features/inv";
import { OrdersTable } from "@/features/orders/orderstable";
import { orders } from "@/features/overview/ipm.schema";
import { cn } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export default function Page () {

  return (
    <PageContainer 
    scrollable={false}
    pageTitle="MMEL"
    pageHeaderAction={
      <Link
      href='#'
      className={cn(buttonVariants(), 'text-xs md:text-sm')}
      >
        <IconPlus className="mr-0.5 h-4 w-4" /> Tambah Alat
      </Link>
    }>egdeg
    </PageContainer>
  )
}