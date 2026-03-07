import PageContainer from "@/components/layout/page-container";
import { Card, CardHeader } from "@/components/ui/card";
import type { Alat } from "@/lib/definitions/tipe-alat";

type PageProps = {
  params: Promise<{ ipmId: string }>;
};

export default async function IpmPage({ params }: PageProps) {

  const { ipmId } = await params;

  // const getAlatById = async (id: string): Promise<Alat> => {
  //   const alat = AlatData.find((alat) => alat.id === parseInt(id));
  //   if (!alat) {
  //     throw new Error(`Alat dengan id ${id} tidak ditemukan`);

  //   }
  //   return alat;
  // };

  // const alat = await getAlatById(ipmId);


  return (
    <PageContainer
      pageTitle={`Detail Alat`}>
      <Card>
        {/* <CardHeader>Detail Alat {alat.nama}</CardHeader> */}
      </Card>
    </PageContainer>
  );
}