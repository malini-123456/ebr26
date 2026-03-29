import PageContainer from "@/components/layout/page-container";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import FormBahan from "@/features/produk/form-bahan";

export default async function CreateBahanPage({
  params,
}: {
  params: Promise<{ produkId: string }>;
}) {
  const { produkId } = await params;
  const id = Number(produkId);

  const produk = await prisma.produk.findUnique({ where: { id } });
  if (!produk) return notFound();

  return (
    <PageContainer pageTitle={`Tambah Bahan — ${produk.nama_produk}`}>
      <FormBahan produkId={id} />
    </PageContainer>
  );
}
