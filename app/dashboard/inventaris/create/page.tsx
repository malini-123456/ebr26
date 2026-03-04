import PageContainer from "@/components/layout/page-container";
import { Card, CardContent } from "@/components/ui/card";
import CreateAlat from "@/features/alat/add-form";
import { createAlat } from "@/app/action/action";
import { prisma } from "@/lib/prisma";

export default async function TambahAlat() {
  const ruanganList = await prisma.ruangan.findMany({
    select: {
      id: true,
      namaRuangan: true,
    },
  });
  return (
    <main>
      <PageContainer
        scrollable={true}
        pageTitle={<div>Tambah Inventaris Alat</div>}
        pageDescription="Form mengisi inventaris baru"
      >
        <Card className="mx-auto w-full">
          <CardContent>
            <form action={createAlat}>
              <CreateAlat ruanganList={ruanganList} />
            </form>
          </CardContent>
        </Card>
      </PageContainer>
    </main>
  )
}