import PageContainer from "@/components/layout/page-container";
import { editInstruksi } from "@/app/action/action";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import FormInstruksi from "@/features/produk/form-instruksi";

export default async function EditInstruksiPage({
  params,
}: {
  params: Promise<{ produkId: string; instruksiId: string }>;
}) {
  const { produkId, instruksiId } = await params;
  const produkIdNum = Number(produkId);
  const instruksiIdNum = Number(instruksiId);

  const { orgId } = await auth();

  const instruksi = await prisma.instruksi.findFirst({
    where: { id: instruksiIdNum, produkId: produkIdNum, produk: { organizationId: orgId ?? "" } },
  });
  if (!instruksi) return notFound();

  return (
    <PageContainer pageTitle="Edit Instruksi">
      <FormInstruksi
        produkId={produkIdNum}
        initialData={instruksi}
        action={editInstruksi.bind(null, instruksiIdNum, produkIdNum)}
      />
    </PageContainer>
  );
}
