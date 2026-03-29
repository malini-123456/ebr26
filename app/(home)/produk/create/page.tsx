import { CreateProduk } from "@/app/action/action";
import PageContainer from "@/components/layout/page-container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FormProduk from "@/features/produk/create";

export default function BuatProdukBaru() {
  return (
    <PageContainer
      scrollable={false}
      pageTitle="Tambah Produk Baru">
      <Card className="mx-auto w-full">
        <CardContent>
          <form action={CreateProduk}>
            <FormProduk />
          </form>
        </CardContent>
      </Card>
    </PageContainer>
  )
}