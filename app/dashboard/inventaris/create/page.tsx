import PageContainer from "@/components/layout/page-container";
import { Card, CardContent } from "@/components/ui/card";
import CreateAlat from "@/features/alat/add-form";
import { createAlat } from "@/app/action/action";
import { prisma } from "@/lib/prisma";
import { checkRole } from "@/utils/roles";

export default async function TambahAlat() {

  const isAdmin = await checkRole('admin')
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
        access={isAdmin}
        accessFallback={
          <div>Only admin can access</div>
        }
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