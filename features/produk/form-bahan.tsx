"use client";

import SubmitButton from "@/components/loading-submitbutton";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createBahan } from "@/app/action/action";

type InitialData = {
  nama_bahan?: string;
  jumlah_bahan?: number;
  satuan_bahan?: string;
};

export default function FormBahan({
  produkId,
  initialData,
  action,
}: {
  produkId: number;
  initialData?: InitialData;
  action?: (formData: FormData) => Promise<void>;
}) {
  const handleSubmit = action ?? createBahan.bind(null, produkId);

  return (
    <form action={handleSubmit}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field className="flex flex-row w-full items-center">
              <FieldLabel htmlFor="nama_bahan" className="basis-1/3">
                Nama Bahan
              </FieldLabel>
              <Input
                id="nama_bahan"
                name="nama_bahan"
                type="text"
                required
                placeholder="Nama Bahan"
                defaultValue={initialData?.nama_bahan}
                className="basis-2/3"
              />
            </Field>
            <Field className="flex flex-row w-full items-center">
              <FieldLabel htmlFor="jumlah_bahan" className="basis-1/3">
                Jumlah
              </FieldLabel>
              <Input
                id="jumlah_bahan"
                name="jumlah_bahan"
                type="number"
                step="any"
                required
                placeholder="Jumlah"
                defaultValue={initialData?.jumlah_bahan}
                className="basis-2/3"
              />
            </Field>
            <Field className="flex flex-row w-full items-center">
              <FieldLabel htmlFor="satuan_bahan" className="basis-1/3">
                Satuan
              </FieldLabel>
              <Input
                id="satuan_bahan"
                name="satuan_bahan"
                type="text"
                required
                placeholder="misal: gram, ml, pcs"
                defaultValue={initialData?.satuan_bahan}
                className="basis-2/3"
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <SubmitButton />
      </FieldGroup>
    </form>
  );
}
