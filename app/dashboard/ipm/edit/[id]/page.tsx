import PageContainer from "@/components/layout/page-container";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { editIpm } from "@/app/action/action";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TagsSelector } from "@/components/ui/tags-selector";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditIpmPage({ params }: PageProps) {
  const { id } = await params;

  const ipmId = Number(id);
  const ipm = await prisma.ipm.findUnique({
    where: { id: ipmId },
    include: {
      alat: {
        include: {
          ruangan: true,
        },
      },
      user: true,
    },
  });

  if (!ipm) {
    return <div>IPM not found</div>;
  }

  const teknisi = await prisma.user.findMany();

  const teknisiList = teknisi.map((t) => ({
    id: t.id,
    name: t.firstName,
  }));

  return (
    <PageContainer
      scrollable
      pageTitle="Edit IPM"
      pageDescription={`Edit IPM ${ipm.alat.nama} SN: ${ipm.alat.noSeri}`}
    >
      <Card className="mx-auto w-full">
        <form action={editIpm.bind(null, ipmId)}>
          <CardContent>

            {/* Alat Info */}
            <FieldGroup>
              <Field className="flex flex-row w-full items-center py-2">
                <FieldLabel className="basis-1/3">Nama Alat</FieldLabel>
                <Input
                  value={ipm.alat.nama}
                  disabled
                  className="basis-2/3"
                />
              </Field>

              <Field className="flex flex-row w-full items-center py-2">
                <FieldLabel className="basis-1/3">Ruangan</FieldLabel>
                <Input
                  value={ipm.alat.ruangan.namaRuangan}
                  disabled
                  className="basis-2/3"
                />
              </Field>
            </FieldGroup>

          </CardContent>

          <Separator />

          <CardContent>

            {/* IPM Fields */}

            <FieldGroup>

              <Field className="flex flex-row w-full items-center py-2">
                <FieldLabel className="basis-1/3">Setting Alat</FieldLabel>
                <Input
                  name="settingAlat"
                  defaultValue={ipm.settingAlat ?? ""}
                  className="basis-2/3"
                />
              </Field>

              <Field className="flex flex-row w-full items-center py-2">
                <FieldLabel className="basis-1/3">Terukur</FieldLabel>
                <Input
                  name="terukur"
                  defaultValue={ipm.terukur ?? ""}
                  className="basis-2/3"
                />
              </Field>

              <Field className="flex flex-row w-full items-center py-2">
                <FieldLabel className="basis-1/3">Hasil</FieldLabel>
                <Input
                  name="hasil"
                  defaultValue={ipm.hasil}
                  required
                  className="basis-2/3"
                />
              </Field>

            </FieldGroup>

            {/* Teknisi selector */}
            <TagsSelector tags={teknisiList} />

          </CardContent>

          <CardContent>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white"
            >
              Update IPM
            </button>
          </CardContent>

        </form>
      </Card>
    </PageContainer>
  );
}