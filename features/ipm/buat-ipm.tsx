import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TagsSelector } from "@/components/ui/tags-selector";
import { prisma } from "@/lib/prisma";
import { pns } from "@/lib/teknisi_constant";
import { clerkClient } from "@clerk/nextjs/server";
import SubmitButton from "./components/loading-submit-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default async function BuatIPMForm() {

  const itemsLingkungan = [
    { id: 1, label: "Suhu (°C)", name: "suhu", type: "text" },
    { id: 2, label: "Kelembapan (%)", name: "kelembapan", type: "text" },
    { id: 3, label: "Kelistrikan (V)", name: "kelistrikan", type: "text" },
  ];

  const itemsAlat = [
    { id: 4, label: "Setting Alat", name: "settingAlat", type: "text" },
    { id: 5, label: "Terukur", name: "terukur", type: "text" },
    { id: 6, label: "Catatan", name: "catatan", type: "text" },
  ];

  // const teknisi = await prisma.user.findMany();
  // const teknisiList = teknisi.map((t) => ({
  //   id: t.id,
  //   name: t.firstName
  // }));

  return (
    <FieldGroup>
      <FieldSet>
        <FieldGroup>
          {itemsLingkungan.map((ipm) => (
            <Field key={ipm.id} className="flex flex-row w-full items-center">
              <FieldLabel htmlFor={ipm.name} className="basis-1/3">{ipm.label}</FieldLabel>
              <Input
                id={ipm.name}
                name={ipm.name}
                type={ipm.type}
                className="basis-2/3 rounded-xl"
              />
            </Field>
          ))}
          <Separator />
          {itemsAlat.map((ipm) => (
            <Field key={ipm.id} className="flex flex-row w-full items-center">
              <FieldLabel htmlFor={ipm.name} className="basis-1/3">{ipm.label}</FieldLabel>
              <Input
                id={ipm.name}
                name={ipm.name}
                type={ipm.type}
                className="basis-2/3 rounded-xl"
              />
            </Field>
          ))}
          <Field className="flex flex-row w-full items-center">
            <FieldLabel className="basis-1/3">Hasil</FieldLabel>
            <Select name="hasil">
              <SelectTrigger className="basis-2/3 rounded-xl">
                <SelectValue placeholder="Pilih hasil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alat Dapat Digunakan">
                  Alat Dapat Digunakan
                </SelectItem>
                <SelectItem value="Alat Tidak Dapat Digunakan">
                  Alat Tidak Dapat Digunakan
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </FieldSet>
      <TagsSelector tags={pns} />
      <SubmitButton />
    </FieldGroup>
  )
}