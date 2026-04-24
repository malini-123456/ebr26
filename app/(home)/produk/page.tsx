import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { ProdukDataTable } from "@/features/produk/tableproduk";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function ProdukPage() {
  const { orgId } = await auth();

  const data = await prisma.produk.findMany({ where: { organizationId: orgId ?? "" } });

  const totalItems = await prisma.produk.count({ where: { organizationId: orgId ?? "" } });
  return (
    <PageContainer
      scrollable={false}
      pageTitle="Produk"
      pageDescription={`Anda memiliki ${totalItems} produk`}
      pageHeaderAction={
        <Link
          href="/produk/create"
          className={cn(buttonVariants(), 'text-xs md:text-sm')}>
          <Plus /> Produk
        </Link>
      }>
      <Suspense></Suspense>
      <ProdukDataTable
        data={data}
        totalItems={totalItems} />
    </PageContainer>
  )
}