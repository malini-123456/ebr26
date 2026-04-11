import PageContainer from "@/components/layout/page-container";
import { Card, CardContent } from "@/components/ui/card";
import FormProduk from "@/features/produk/create";

export default function BuatProdukBaru() {
  return (
    <PageContainer
      scrollable={false}
      pageTitle="Tambah Produk Baru">
      <Card className="mx-auto w-full">
        <CardContent>
          <FormProduk />
        </CardContent>
      </Card>
    </PageContainer>
  )
}