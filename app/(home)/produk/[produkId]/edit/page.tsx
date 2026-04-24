import { editProduk } from "@/app/action/action";
import PageContainer from "@/components/layout/page-container";
import FormProduk from "@/features/produk/create";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/dist/client/components/navigation";

export default async function EditProduk({
  params,
}: {
  params: Promise<{ produkId: string }>;
}) {
  const { produkId } = await params
  const id = Number(produkId)

  const { orgId } = await auth()

  const produk = await prisma.produk.findFirst({
    where: { id, organizationId: orgId ?? "" },
  });

  if (!produk) return notFound();

  return (
    <PageContainer>
      <FormProduk initialData={produk} action={editProduk.bind(null, id)} />
    </PageContainer>
  );
}