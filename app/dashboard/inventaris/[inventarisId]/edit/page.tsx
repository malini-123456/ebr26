import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { editAlat } from "@/app/action/action";
import AlatForm from "@/features/alat/add-form";
import PageContainer from "@/components/layout/page-container";

export default async function EditAlatPage({
  params,
}: {
  params: Promise<{ inventarisId: string }>;
}) {
  const { inventarisId } = await params

  const id = Number(inventarisId)

  const alat = await prisma.alat.findUnique({
    where: { id },
    include: {
      ruangan: true,
    }
  });

  if (!alat) return notFound();

  const ruanganList = await prisma.ruangan.findMany({
    select: { id: true, namaRuangan: true },
  });

  return (
    <PageContainer>
      <form action={editAlat.bind(null, id)}>
        <AlatForm
          ruanganList={ruanganList}
          initialData={alat}
        />
      </form>
    </PageContainer>
  );
}