import PageContainer from "@/components/layout/page-container";
import { Card, CardContent } from "@/components/ui/card";
import { createipm } from "@/app/action/action";
import { prisma } from "@/lib/prisma";
import BuatIPMForm from "@/features/ipm/buat-ipm";
import { Separator } from "@/components/ui/separator";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";


type PageProps = {
  alatId?: string;
};

export default async function CreateIpm({
  searchParams,
}: {
  searchParams: Promise<PageProps>
}) {

  const props = await searchParams;

  const alat = await prisma.alat.findUnique({
    where: { id: Number(props.alatId) },
    include: { ruangan: true },
  });

  const form_alat = [
    { id: 1, label: "Nama Alat", name: "nama", type: "text", required: true },
    { id: 2, label: "Merek", name: "merek", type: "text" },
    { id: 3, label: "Tipe", name: "tipe", type: "text" },
    { id: 4, label: "No. Seri", name: "noSeri", type: "text" },
    { id: 6, label: "Tahun", name: "tahun", type: "number" },
    { id: 7, label: "Tgl. Kalibrasi", name: "kalibrasi", type: "date" },
    { id: 8, label: "Keterangan", name: "keterangan", type: "text" },
    { id: 9, label: "Ruangan", name: "ruangan", type: "text" }
  ];

  return (
    <PageContainer
      scrollable={true}
      pageTitle={<div>Tambah IPM</div>}
      pageDescription={`Form IPM ${alat?.nama} SN: ${alat?.noSeri} terakhir dipelihara:`}
    >
      <Card className="mx-auto w-full">
        <form action={createipm}>

          <input type="hidden" name="inventaris" value={props.alatId} />
          <CardContent>
            {form_alat.map((item) => {

              let defaultVal =
                item.name === "ruangan"
                  ? alat?.ruangan?.namaRuangan
                  : alat?.[item.name as keyof typeof alat];

              if (item.type === "date" && defaultVal) {
                defaultVal = new Date(defaultVal as Date)
                  .toISOString()
                  .split("T")[0];
              }

              return (
                <Field key={item.id} className="flex flex-row w-full items-center py-2">
                  <FieldLabel htmlFor={item.name} className="basis-1/3">
                    {item.label}
                  </FieldLabel>

                  <Input
                    id={item.name}
                    type={item.type}
                    defaultValue={defaultVal as string}
                    disabled
                    className="basis-2/3 rounded-xl"
                  />
                </Field>
              );
            })}
          </CardContent>
          <Separator />
          <CardContent className="my-3">
            <BuatIPMForm />
          </CardContent>
        </form>
      </Card>
    </PageContainer>
  )
}