import PageContainer from "@/components/layout/page-container";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import FormInstruksi from "@/features/produk/form-instruksi";

export default async function CreateInstruksiPage({
  params,
}: {
  params: Promise<{ produkId: string }>;
}) {
  const { produkId } = await params;
  const id = Number(produkId);

  const produk = await prisma.produk.findUnique({ where: { id } });
  if (!produk) return notFound();

  return (
    <PageContainer pageTitle={`Tambah Instruksi — ${produk.nama_produk}`}>
      <FormInstruksi produkId={id} />
    </PageContainer>
  );
}
