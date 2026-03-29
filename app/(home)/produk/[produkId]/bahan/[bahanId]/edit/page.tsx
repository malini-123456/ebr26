import PageContainer from "@/components/layout/page-container";
import { editBahan } from "@/app/action/action";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import FormBahan from "@/features/produk/form-bahan";

export default async function EditBahanPage({
  params,
}: {
  params: Promise<{ produkId: string; bahanId: string }>;
}) {
  const { produkId, bahanId } = await params;
  const produkIdNum = Number(produkId);
  const bahanIdNum = Number(bahanId);

  const bahan = await prisma.bahan.findUnique({ where: { id: bahanIdNum } });
  if (!bahan || bahan.produkId !== produkIdNum) return notFound();

  return (
    <PageContainer pageTitle="Edit Bahan">
      <FormBahan
        produkId={produkIdNum}
        initialData={bahan}
        action={editBahan.bind(null, bahanIdNum, produkIdNum)}
      />
    </PageContainer>
  );
}
