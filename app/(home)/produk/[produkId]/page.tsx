import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit2Icon } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProdukDetail } from "@/features/produk/produk-detail";

export default async function InvPage({
  params,
}: {
  params: Promise<{ produkId: string }>;
}) {
  const { produkId } = await params;
  const id = Number(produkId);

  if (isNaN(id)) {
    return <div>ID tidak valid</div>;
  }

  const produk = await prisma.produk.findUnique({
    where: { id },
    include: {
      bahan: true,
      instruksi: true,
    },
  });

  if (!produk) {
    return <div>Produk tidak ditemukan</div>;
  }

  return (
    <PageContainer
    >
      <ProdukDetail produk={produk} />
    </PageContainer>
  );
}
